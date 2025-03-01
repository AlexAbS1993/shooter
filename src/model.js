// Абстрактный класс для расширения под конкретные модели
class AbstractModel{
    tables = [{
        title: '',
        reqFields: [''],
        filters: {},
        fields: [''],
        insertTypes: ['']
    }]
    constructor(){
        throw new Error('Abstract')
    }
    getCountOfTables(){
        throw new Error('Dont implement')
    }
    getTables(){
        throw new Error('Dont implement')
    }
    createTableModel(){
        throw new Error('Dont implement')
    }
}

module.exports = AbstractModel