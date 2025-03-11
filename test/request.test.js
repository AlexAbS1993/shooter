const RequestWide = require("../src/requests")
const TestModel = require('../src/testModel')
const [productsTable, usersTable] = require('../src/test_tables')

const MOCK_END_POINT = 'http://mock.com'
const PRODUCTS = 'products'
const USERS = 'users'
describe('Сущность Request организует работу запросов на удалённый сервер, нагружая тем самым базу данных', () => {
    const test_model = new TestModel()
    let request = new RequestWide(test_model, MOCK_END_POINT)
    beforeEach(() => {
        request = new RequestWide(test_model, MOCK_END_POINT)
    })
    test('Класс создаётся без ошибок и ожидает в качестве аргументов модель бд и корневой url для запросов', () => {
        expect(request).toBeDefined()
    })
    describe('Во время отправки запроса класс Request формирует destination_point. Сам метод формировки calculate_dest_point сложен и состоит из частей, чей функционал должен собрать' +
        ' правильный url с опциями и параметрами', () => {
            test('Первым шагом в получении destionation_point становится получение данных из действующей таблицы', () => {
                let tableData = request.getTableData()
                for (let key in tableData){
                    expect(tableData[key]).toBeDefined()
                }
            })
            test('Метод получения схемы возвращает схему или undefined, если ее нет', () => {
                let schema = request.getRequestSchema(PRODUCTS, request.SELECT_REQUEST_SCHEMA)
                expect(schema).toBeUndefined()
            })
            test('calculate_dest_point возвращает верный url запроса',() => {
                let dest_point = request.calculate_dest_point(request.SELECT)
                let {title} = request.getTableData()
                expect(dest_point).toBe(`${request.point}/${title}`)
            }) 
        }  
    )
    test('После выполнения запроса может измениться index действующей таблицы', () => {
        let counter = 0
        for (let i = 0; i < 1000; i++){
            request.changeTableIndex()
            let currentIndex = request.getTableIndex()
            counter += currentIndex
        }
        expect(counter != 0).toBe(true)
        expect(counter < 999).toBe(true)
        console.log('counter is', counter)
    })
})