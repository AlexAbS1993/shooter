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

// setInterval(() => {
//     request.toSelect()
// }, SELECT_ACT * 1000)
request.toInsert()

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}. Установлен уровень нагрузки ${LEVEL} на сервер ${POINT}`)
})