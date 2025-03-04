const Request = require("../src/requests")

const MOCK_END_POINT = 'http://mock.com'

describe('Сущность Request организует работу запросов на удалённый сервер, нагружая тем самым базу данных', () => {
    test('Класс создаётся без ошибок и ожидает в качестве аргументов модель бд и корневой url для запросов', () => {
        let request = new Request({}, MOCK_END_POINT)
        expect(request).toBeDefined()
    })
})