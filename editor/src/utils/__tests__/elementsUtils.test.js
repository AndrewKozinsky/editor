const { hasElemParentWithSelector } = require('../elementsUtils')

describe('hasElemParentWithSelector function', () => {
    let $targetElem

    beforeAll(() => {
        const $elem = document.createElement('section')
        $elem.id = 'my-section'
        $elem.innerHTML = `
            <div>
                <p>text</p>
            </div>
            <div>
                <p>text <strong>bold</strong></p>
            </div>
        `
        $targetElem = $elem.querySelector('strong')
    })

    test('Передан правильный выборщик', () => {
        expect(hasElemParentWithSelector($targetElem, '#my-section')).toBe(true)
    })

    test('Передан не правильный выборщик', () => {
        expect(hasElemParentWithSelector($targetElem, '.wrong-class')).toBe(false)
    })
})