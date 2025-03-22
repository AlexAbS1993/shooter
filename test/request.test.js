const RequestWide = require("../src/requests")
const TestModel = require('../src/testModel')

const MOCK_END_POINT = 'http://mock.com'
const PRODUCTS = 'products'
const USERS = 'users'
const DEFAULT = 'DEFAULT'
const STRING = 'string'
const NUMBER = 'number'
const BOOLEAN = 'boolean'
const TITLE = 'title'
const NAME = 'name'

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
    describe('Сущность Request способна собирать, обновлять и выдавать статистику совершенной работы', () => {
        test('Дефолтная статистика записывается после каждого исполнения', () => {
            let {title} = request.getTableData()
            request.statisticUpdate(request.INSERT)
            expect(request.getStatistic()[title]).toEqual({[request.SELECT]: 0, [request.INSERT]: 1, [request.DELETE]:0})
        })
    })
    test('Метод generate_value_by_type умеет создавать случайные значения для параметров в url', () => {
        expect(typeof request.generate_value_by_type(STRING)).toBe(STRING)
        expect(typeof request.generate_value_by_type(NUMBER)).toBe(NUMBER)
        expect(typeof request.generate_value_by_type(BOOLEAN)).toBe(BOOLEAN)
    })
    test('Метод construct_params создает строку-параметр по переданному имени и типу', () => {
        let param = request.construct_params(USERS, STRING)
        expect(typeof param).toBe(STRING)
        expect(param.includes(USERS)).toBe(true)
    })
    describe('При отправке post-запроса срабатывает автогенерация тела в зависимости от модели', () => {
        test('Генерируется строка при передаче соответствующих параметров', () => {
            let proceed = true
            while (proceed){
                let {title} = request.getTableData()
                if(title === PRODUCTS){
                    proceed = false
                }
                else {
                    request.changeTableIndex()
                }
            }
            let {insertTypes, fields} = request.getTableData()
            let body = request.construct_body(insertTypes, fields)
            expect(body.id).toBe(DEFAULT)
            expect(typeof body.title).toBe('string')
            expect(typeof body.price).toBe('number')
            console.log(JSON.stringify(body))
        })
        test('Строка генерируется в зависимости от переданного названия поля', () => {
            let title = request.stringConstructor(TITLE)
            let name = request.stringConstructor(NAME)
            expect(typeof title).toBe('string')
            expect(typeof name).toBe('string')
            console.log(title + ' - сгенерированный title') 
            console.log(name + ' - сгенерированный name') 
        })
    })
})