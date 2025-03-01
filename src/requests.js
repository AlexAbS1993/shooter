let {fetch} = require('undici')
let {generate, count} = require('random-words')
const AbstractModel = require('./model')

// Класс запроса, который реализует команды через undici для нагрузки сервера с базой данных
// Класс принимает модель, которая должна реализовать общее представление о таблицах на удалённом сервере
class Request{
    #model
    #count_of_tables
    #current_table_index = 0
    #tables
    GET = "GET"
    POST = "POST"
    SELECT = "SELECT"
    INSERT = "INSERT"
    DELETE = "DELETE"
    MIN_LENGTH_RANDOM_WORLD = 5
    MAX_LENGTH_RANDOM_WORLD = 10
    /**
     * 
     * @param {AbstractModel} model 
     * @param {string} point 
     * @param {string[]} tables
     */
    constructor(model, point){
        this.#model = model
        // Работа с количеством таблиц в модели
        this.#count_of_tables = this.#model.getCountOfTables()
        this.#tables = this.#model.getTables()
        this.point = point
    }
    async toSelect(){
        let destination_point = this.#calculate_dest_point(this.SELECT)
        let response = fetch(destination_point, {
            method: this.GET
        })
        this.#changeTableIndex()
        return await (await response).json()
    }
    async toInsert(){
        let destination_point = this.#calculate_dest_point(this.INSERT)
        let body = this.#construct_body(insertTypes, fields)
        let response = fetch(destination_point, {
            method: this.POST,
            body
        })
        this.#changeTableIndex()
        return await (await response).json()
    }
    toDelete(){
        

        this.#changeTableIndex()
    }
    #changeTableIndex(){
        this.#current_table_index = Math.floor(Math.random() * this.#count_of_tables)
        return
    }
    #getTableData(){
        let {title, reqFields, filters, insertTypes, fields} = this.#tables[this.#current_table_index]
        return {
            title, reqFields, filters, insertTypes, fields
        }
    }
    #calculate_dest_point(operation){
        switch(operation){
            case this.GET: {
            let {title, reqFields} = this.#getTableData()
            return `${this.point}/${title}?REQ=${reqFields.join('-')}`
            }
            default: {
            let {title} = this.#getTableData()
            return `${this.point}/${title}`
            }
        }
        
    }
    #construct_body(insertTypes, fields){
        let body = {}
        for(let index in fields){
            let type = insertTypes[index]
            switch(type){
                case 'string': {
                    body[fields[index]] = generate({ minLength: this.MIN_LENGTH_RANDOM_WORLD, maxLength: this.MAX_LENGTH_RANDOM_WORLD })
                    break
                }
                case 'number': {
                    body[fields[index]] = count()
                    break
                }
                case 'boolean': {
                    body[fields[index]] = Math.random() > 0.5 ? true : false
                    break
                }
                default: {
                    body[fields[index]] = null
                }
            }
        }
        return body
    }
}

module.exports = Request