const configDefinition = require("../src/config_definition")

describe('Функция определения конфигурационного уровня работает со строкой, определяющей этот уровень и возвращает имя .env-файла, который необходимо импортировать', () => {
    test('При передаче строки-уровня, не включенного в перечень допустимых, выдаётся ошибка', () => {
        const WRONG_VALUE = 'hello'
        const EXPECTED_MESSAGE_PART = 'не соответствует требуемому. Список допустимых уровней'
        try{
            configDefinition(WRONG_VALUE)
        }
        catch(e){
            expect(e).toBeDefined()
            expect(e.message).toMatch(EXPECTED_MESSAGE_PART)
            console.log(e.message)
        }
    })
    test('Передача уровня min возвращает соответсвующее ожиданию название файла', () => {
        const MIN_VALUE = 'min'
        const EXPECTED_FILENAME = '.min-env'
        expect(configDefinition(MIN_VALUE)).toBe(EXPECTED_FILENAME)
    })
    test('Передача уровня middle возвращает соответсвующее ожиданию название файла', () => {
        const MIDDLE_VALUE = 'middle'
        const EXPECTED_FILENAME = '.middle-env'
        expect(configDefinition(MIDDLE_VALUE)).toBe(EXPECTED_FILENAME)
    })
    test('Передача уровня high возвращает соответсвующее ожиданию название файла', () => {
        const HIGH_VALUE = 'high'
        const EXPECTED_FILENAME = '.high-env'
        expect(configDefinition(HIGH_VALUE)).toBe(EXPECTED_FILENAME)
    })
})