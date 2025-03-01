let {fetch} = require('undici')

// Класс запроса, который реализует команды через undici для нагрузки сервера с базой данных
// Класс принимает модель, которая должна реализовать общее представление о таблицах на удалённом сервере
class Request{
    #model
    #count_of_tables
    #current_table_index = 0
    #tables
    GET = "GET"
    /**
     * 
     * @param {*} model 
     * @param {*} point 
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
        let destination_point = this.#calculate_dest_point()
        let response = fetch(destination_point, {
            method: this.GET
        })
        this.#changeTableIndex()
        return await (await response).json()
    }
    toInsert(){
        let {title, reqFields, filters} = this.#getTableData()

        this.#changeTableIndex()
    }
    toDelete(){
        let {title, reqFields, filters} = this.#getTableData()

        this.#changeTableIndex()
    }
    #changeTableIndex(){
        this.#current_table_index = Math.floor(Math.random() * this.#count_of_tables)
        return
    }
    #getTableData(){
        let {title, reqFields, filters} = this.#tables[this.#current_table_index]
        return {
            title, reqFields, filters
        }
    }
    #calculate_dest_point(){
        let {title, reqFields, filters} = this.#getTableData()
        return `${this.point}/${title}?REQ=${reqFields.join('-')}`
    }
}

module.exports = Request