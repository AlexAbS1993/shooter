let {fetch} = require('undici')
let {generate, count} = require('random-words')
const AbstractModel = require('./model')

// Класс запроса, который реализует команды через undici для нагрузки сервера с базой данных
// Класс принимает модель, которая должна реализовать общее представление о таблицах на основе интерфейса AbstractModel на удалённом сервере 
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
    SELECT_REQUEST_SCHEMA = "SELECT_REQUEST_SCHEMA"
    DELETE_REQUEST_SCHEMA = 'DELETE_REQUEST_SCHEMA'
    INSERT_REQUEST_SCHEMA = 'INSERT_REQUEST_SCHEMA'
    #operation_matching_schema = {
        [this.DELETE]:this.DELETE_REQUEST_SCHEMA,
        [this.SELECT]: this.SELECT_REQUEST_SCHEMA,
        [this.INSERT]: this.INSERT_REQUEST_SCHEMA
    }
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
    async toDelete(){
        let destination_point = this.#calculate_dest_point(this.DELETE)
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
        let {title} = this.#getTableData()
        let schema 
        // Здесь ведется работа с интерфейсом модели, поэтому результат может быть как undefined, так и ошибка. В обоих случаях возвращаем url + title таблицы
        try {
            schema = this.#getRequestSchema(title, this.#operation_matching_schema[operation])
        }
        catch(e){
            return `${this.point}/${title}`
        }
        if (!schema){
            return `${this.point}/${title}`
        }
        return this.#add_schema_options(schema, operation, `${this.point}/${title}`)
    }
    #getRequestSchema(title, type){
            switch(type){
                case this.DELETE_REQUEST_SCHEMA: {
                    return this.#model.getDeleteRequestSchema(title)
                }
                case this.SELECT_REQUEST_SCHEMA: {
                    return this.#model.getSelectRequestSchema(title)
                }
                case this.INSERT_REQUEST_SCHEMA: {
                    return this.#model.getInsertRequestSchema(title)
                }
                default: {
                    throw new Error('Такой схемы не существует')
                }
            } 
}
    #add_schema_options(schema, operation, start_with){
        let result = start_with
        let {parametres, parametres_types} =  schema[operation]
        for (let index in parametres){
            if (index === parametres.length - 1){
                result += `${this.#construct_params(parametres[index], parametres_types[index])}`
            }
            else {
                result += `${this.#construct_params(parametres[index], parametres_types[index])}&`
            }
        }
        return result
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

    #construct_params(title, type){
        return `${title}=${this.#generate_value_by_type(type)}`
    }
    #generate_value_by_type(type){
        switch(type){
            case 'string': {
               return generate({ minLength: this.MIN_LENGTH_RANDOM_WORLD, maxLength: this.MAX_LENGTH_RANDOM_WORLD })
            }
            case 'number': {
                return body[fields[index]] = count()
            }
            case 'boolean': {
                return Math.random() > 0.5 ? true : false
            }
        }
    }
}

module.exports = Request