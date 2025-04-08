const { wrap$elemWithDiv } = require('../domUtils')

describe('wrap$elemWithDiv function', () => {
    let wrappedElem

    beforeAll(() => {
        const innerElem = document.createElement('span')
        wrappedElem = wrap$elemWithDiv(innerElem)
    })

    test('Внутри обёртки элемента находится 1 потомок', () => {
        const childrenElems = wrappedElem.children
        expect(childrenElems.length === 1).toBe(true)
    })

    test('Внутри обёртки элемента находится span', () => {
        const childrenElems = wrappedElem.children
        expect(childrenElems[0].tagName.toLowerCase())
            .toBe('span')
    })
})