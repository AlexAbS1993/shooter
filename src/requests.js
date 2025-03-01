let {fetch} = require('undici')

// Класс принимает модель, которая должна реализовать общее представление о таблицах на удалённом сервере
class Request{
    constructor(model, point){
        this.model = model
        this.point = point
    }
    toSelect(){

    }
    toInsert(){

    }
    toDelete(){

    }
}

module.exports = Request