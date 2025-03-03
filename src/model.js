// Абстрактный класс для расширения под конкретные модели
class AbstractModel{
    tables = [{
        title: '',
        reqFields: [''],
        filters: {},
        fields: [''],
        insertTypes: ['']
    }]
    selectRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}}
    deleteRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}}
    insertRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}}
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
    getSelectRequestSchema(title){
        throw new Error('Dont implement')
    }
    getDeleteRequestSchema(title){
        throw new Error('Dont implement')
    }
    getInsertRequestSchema(title){
        throw new Error('Dont implement')
    }
}

module.exports = AbstractModel