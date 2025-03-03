// Абстрактный класс для расширения под конкретные модели
class AbstractModel{
    tables = [{
        title: '',
        reqFields: [''],
        filters: {},
        fields: [''],
        insertTypes: ['']
    }]
    selectRequestSchema
    deleteRequestSchema
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
    getSelectRequestSchema(){
        throw new Error('Dont implement')
    }
    getDeleteRequestSchema(){
        throw new Error('Dont implement')
    }
}

module.exports = AbstractModel