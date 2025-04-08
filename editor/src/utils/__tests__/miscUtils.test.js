const { setInLocalStorage } = require('../miscUtils')
const {
    getFromLocalStorage,
    removeFromLocalStorage,
    createDeepCopy
} = require('utils/miscUtils')

describe('Функция setInLocalStorage', () => {
    afterEach(() => {
        localStorage.removeItem('testProp')
    })

    test('Установка строкового значения в localStorage', () => {
        setInLocalStorage('testProp', 'hello')
        const propValueFromLS = localStorage.getItem('testProp')
        expect(propValueFromLS).toBe('hello')
    })

    test('Установка объекта в localStorage', () => {
        setInLocalStorage('testProp', {test: 'hello'}, true)
        const propValueFromLS = localStorage.getItem('testProp')

        expect(propValueFromLS).toBe('{\"test\":\"hello\"}')
    })
})

describe('Функция getFromLocalStorage', () => {
    afterEach(() => {
        localStorage.removeItem('testProp')
    })

    test('Удаление значения в localStorage', () => {
        localStorage.setItem('testProp', 'hello')

        const propValueFromLS = getFromLocalStorage('testProp', 'hello')
        expect(propValueFromLS).toBe('hello')
    })
})

describe('Функция removeFromLocalStorage', () => {
    afterEach(() => {
        localStorage.removeItem('testProp')
    })

    test('Установка строкового значения в localStorage', () => {
        localStorage.setItem('testProp', 'hello')

        removeFromLocalStorage('testProp', 'hello')
        expect(localStorage.getItem('testProp')).toBe(null)
    })
})

describe('Функция createDeepCopy', () => {
    test('Создание глубокой копии объекта', () => {
        const testObj = {
            prop1: {
                arr: [
                    'item1',
                    'item2'
                ]
            },
            prop2: 'string',
            prop3: 5
        }

        expect(createDeepCopy(testObj)).toEqual(testObj)
    })
})
