/**
 * Функция по уровню конфигурации, установленном в глобальном файле .env (чаще всего так, но можно откуда угодно взять), определяет, какой будет подгружен конфигурационный файл с константами
 * @param {string} lvl строка-значение уровня конфигурации
 */
const MIN_VALUE = 'min'
const MIDDLE_VALUE = 'middle'
const HIGH_VALUE = 'high'
const CUSTOM_VALUE = 'custom'
let values_lvls = [MIN_VALUE, MIDDLE_VALUE, HIGH_VALUE, CUSTOM_VALUE]

function configDefinition(lvl){
    if (!values_lvls.includes(lvl)){
        throw new Error(`Установленное значение уровня конфигурации ${lvl} не соответствует требуемому. Список допустимых уровней:
${values_lvls.map((value, index) => `${index+1}) ${value}`).join(', \n')}`)
    }
    switch(lvl){
        case MIN_VALUE: {
            return `.env.${MIN_VALUE}`
        }
        case MIDDLE_VALUE: {
            return `.env.${MIDDLE_VALUE}`
        }
        case HIGH_VALUE: {
            return `.env.${HIGH_VALUE}`
        }
        case CUSTOM_VALUE: {
            return `.env.${CUSTOM_VALUE}`
        }
        default: {
            throw new Error('Для данного значения ещё не реализован обработчик. Обратитесь к разработчику программы')
        }
    }
}

module.exports = configDefinition