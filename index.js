const POINT = process.env.SHOOTING_POINT
const LEVEL = process.env.LEVEL

let express = require('express')
let configDefinition = require('./src/config_definition')
let configFileName = configDefinition(process.env.LEVEL) 
require(`dotenv`).config({path:`./${configFileName}`})

const PORT = process.env.PORT || 3000
const SELECT_ACT = process.env.SELECT_ACT

let app = express()

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}. Установлен уровень нагрузки ${LEVEL} на сервер ${POINT}`)
})