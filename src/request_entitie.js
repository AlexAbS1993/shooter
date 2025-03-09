const RequestWide = require("./requests")

// Фасад для оригинальной сущности Request
class Request{
    #request_wide
    constructor(model, point){
            this.#request_wide = new RequestWide(model, point)
        }
        async toSelect(){
            return await this.#request_wide.toSelect()
        }
        async toInsert(){
            return await this.#request_wide.toInsert()
        }
        async toDelete(){
            return await this.#request_wide.toDelete()
        }
    getStatisctic(){
        
    }
}


module.exports = Request