let express = require('express')
let app = express()

let configFileName = configDefinition(process.env.LEVEL) 
let configuration = require(`./${configFileName}`)

app.listen()