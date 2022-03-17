const { setInLocalStorage } = require('./miscUtils')

describe('Функция setInLocalStorage', function () {
    beforeAll(() => {
        localStorage.removeItem('someProp')
    })

    test('Установка значения в localStorage', () => {
        setInLocalStorage(
            'someProp',
            {testProp: 'testValue'}, true
        )
    })

    afterAll(() => {
        localStorage.removeItem('someProp')
    })
})