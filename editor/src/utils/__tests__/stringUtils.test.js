const {
    makeCN,
    convertToCamelCase,
    convertToSnakeCase,
    setUpperCaseForFirstLetter,
    getRandomId
} = require('../stringUtils')

describe('Функция makeCN', () => {
    test('Массив ["class1", "class2"] должен преобразоваться в строку "class1 class2"', () => {
        expect(makeCN(['class1', 'class2'])).toBe('class1 class2')
    })
    test('Массив ["class1", ""] должен преобразоваться в строку "class1"', () => {
        expect(makeCN(['class1', ''])).toBe('class1')
    })
    test('Пустой массив должен преобразоваться в пустую строку ""', () => {
        expect(makeCN([])).toBe('')
    })
})

describe('Функция convertToCamelCase', () => {
    test('Передача пустой строки', () => {
        expect(convertToCamelCase('')).toBe('')
    })
    test('Передача строки без дефиса', () => {
        expect(convertToCamelCase('box')).toBe('box')
    })
    test('Передача строки с дефисом', () => {
        expect(convertToCamelCase('box-shadow')).toBe('boxShadow')
    })
    test('Передача строки с дефисами', () => {
        expect(convertToCamelCase('box-shadow-gray')).toBe('boxShadowGray')
    })
})

describe('Функция convertToSnakeCase', () => {
    test('Передача пустой строки', () => {
        expect(convertToSnakeCase('')).toBe(null)
    })
    test('Передача строки без заглавных букв', () => {
        expect(convertToSnakeCase('box')).toBe('box')
    })
    test('Передача строки с заглавной буквой', () => {
        expect(convertToSnakeCase('boxShadow')).toBe('box-shadow')
    })
    test('Передача строки с заглавными буквами', () => {
        expect(convertToSnakeCase('boxShadowGray')).toBe('box-shadow-gray')
    })
})

describe('Функция setUpperCaseForFirstLetter', () => {
    test('Передача пустой строки', () => {
        expect(setUpperCaseForFirstLetter('')).toBe(null)
    })
    test('Передача одной буквы', () => {
        expect(setUpperCaseForFirstLetter('b')).toBe('B')
    })
    test('Передача строки', () => {
        expect(setUpperCaseForFirstLetter('box')).toBe('Box')
    })
})

describe('Функция getRandomId', () => {
    test('Получение правильного значения', () => {
        expect(getRandomId()).toMatch(/id[0-9]{2,5}/)
    })
})