const { genNum } = require("../lib/random")

describe('Библиотека random была взята из открытых источников и доработана', () => {
    describe('Функция getNum может генерировать случайные числа, а также делать это в диапазоне', () => {
        test('Функция генерирует рандомное число без переданных аргументов', () => {
            expect(typeof genNum()).toBe('number')
        })
        test('Если в функцию переданы оба значения аргументов, то она отрабатывает правильно', () => {
            const FROM = 1
            const TO = 10
            for (let i = 0; i < 1000; i++){
                let n = genNum(FROM, TO)
                expect(n >= FROM).toBe(true)
                expect(n <= TO).toBe(true)
            }
        })
        test('Если не передан один из аргументов, то будет учтен лишь тот, что передан', () => {
            const FROM = 1
            const TO = 10
            for (let i = 0; i < 1000; i++){
                let n = genNum(FROM)
                expect(n >= FROM).toBe(true)
            }
            for (let i = 0; i < 1000; i++){
                let n = genNum(undefined, TO)
                expect(n <= TO).toBe(true)
            }
        })
    })
})