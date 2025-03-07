const AbstractModel = require("./model");

// Дефолтная модель для частного использования
class TestModel extends AbstractModel{
    tables =[
        
    ]
    constructor(){
        super()
    }
    getCountOfTables() {
        return this.tables.length
      }
    getTables() {
        return this.tables
    }
    
}

module.exports = TestModel