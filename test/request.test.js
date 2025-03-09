const RequestWide = require("../src/requests")
const TestModel = require('../src/testModel')
const [productsTable, usersTable] = require('../src/test_tables')

const MOCK_END_POINT = 'http://mock.com'

describe('Сущность Request организует работу запросов на удалённый сервер, нагружая тем самым базу данных', () => {
    const test_model = new TestModel()
    test('Класс создаётся без ошибок и ожидает в качестве аргументов модель бд и корневой url для запросов', () => {
        let request = new RequestWide(test_model, MOCK_END_POINT)
        expect(request).toBeDefined()
    })
    
})