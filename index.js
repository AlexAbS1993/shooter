const POINT = process.env.SHOOTING_POINT
const LEVEL = process.env.LEVEL

let express = require('express')
let configDefinition = require('./src/config_definition')
let configFileName = configDefinition(process.env.LEVEL) 
let Request = require('./src/request_entitie')
const TestModel = require('./src/testModel')
require(`dotenv`).config({path:`./${configFileName}`})

const PORT = process.env.PORT || 8000
const SELECT_ACT = process.env.SELECT_ACT
const INSERT_ACT = process.env.INSERT_ACT
let model = new TestModel()
let request = new Request(model, POINT)
let app = express()

let selectInterval
try{
    selectInterval = setInterval(async () => {
    request.toSelect()
}, SELECT_ACT * 1000)
}
catch(e){
    console.log(e.message)
    clearInterval(selectInterval)
}

let insertInterval = setInterval(() => {
        request.toInsert()
}, INSERT_ACT * 1000)

process.on('uncaughtException', (error) => {
    console.log('Произошла непредвиденная ошибка. Все вызовы удалённой базы данных отключены')
    clearInterval(selectInterval)
    clearInterval(insertInterval)
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}. Установлен уровень нагрузки ${LEVEL} на сервер ${POINT}`)
})