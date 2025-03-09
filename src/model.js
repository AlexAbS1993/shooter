/**
 * AbstractModel класс предоставляет абстрактные методы и свойства для работы с моделями таблиц.
 * Все методы выбрасывают ошибки, если не реализованы в дочерних классах.
 */
class AbstractModel {
    /**
     * Массив таблиц, каждая из которых содержит информацию о названии, обязательных полях,
     * фильтрах, полях для вывода и типах для вставки.
     * @type {Array<{title: string, reqFields: string[], filters: object, fields: string[], insertTypes: string[]}>}
     */
    tables = [{
      title: '',
      reqFields: [''],
      filters: {},
      fields: [''],
      insertTypes: ['']
    }];
  
    /**
     * Схема для выборки данных из таблиц.
     * @type {Object}
     */
    selectRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}};
  
    /**
     * Схема для удаления данных из таблиц.
     * @type {Object}
     */
    deleteRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}};
  
    /**
     * Схема для вставки данных в таблицы.
     * @type {Object}
     */
    insertRequestSchema = {table1: {get: {parametres: [], parametres_types: []}}};
  
    constructor() {

    }
  
    /**
     * Метод для получения количества таблиц.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    getCountOfTables() {
      throw new Error('Dont implement');
    }
  
    /**
     * Метод для получения всех таблиц.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    getTables() {
      throw new Error('Dont implement');
    }
  
    /**
     * Метод для создания модели таблицы.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    createTableModel() {
      throw new Error('Dont implement');
    }
    createRequestSchema(tableName, method, schema){
      throw new Error('Dont implement');
    }
    /**
     * Метод для получения схемы выборки данных для указанной таблицы.
     * @param {string} title Название таблицы.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    getSelectRequestSchema(title) {
      throw new Error('Dont implement');
    }
  
    /**
     * Метод для получения схемы удаления данных для указанной таблицы.
     * @param {string} title Название таблицы.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    getDeleteRequestSchema(title) {
      throw new Error('Dont implement');
    }
  
    /**
     * Метод для получения схемы вставки данных для указанной таблицы.
     * @param {string} title Название таблицы.
     * @throws {Error} Выбрасывает ошибку, если метод не реализован.
     */
    getInsertRequestSchema(title) {
      throw new Error('Dont implement');
    }
  }
  
  module.exports = AbstractModel