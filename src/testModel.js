const AbstractModel = require("./model");
const {productsModel, usersModel} = require('./test_tables')

// Дефолтная модель для частного использования
class TestModel extends AbstractModel{
    tables =[
        productsModel, usersModel
    ]
    selectRequestSchema = {}
    deleteRequestSchema = {}
    insertRequestSchema = {}
    constructor(){
        super()

    }
    getCountOfTables() {
        return this.tables.length
      }
    getTables() {
        return this.tables
    }
    getSelectRequestSchema(title) {
        return this.insertRequestSchema[title]?.get
      }
      getDeleteRequestSchema(title) {
        return this.insertRequestSchema[title]?.delete
      }
      getInsertRequestSchema(title) {
        return this.insertRequestSchema[title]?.insert
      }
}

module.exports = TestModel