const AbstractModel = require("./model");

// Дефолтная модель для частного использования
class DefaultModel extends AbstractModel{
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

module.exports = DefaultModel