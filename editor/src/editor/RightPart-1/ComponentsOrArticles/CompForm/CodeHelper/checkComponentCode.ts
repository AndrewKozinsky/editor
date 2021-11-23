const JSON5 = require('json5')
import { checkElemAttrs } from './checkElemAttrs'
import { checkElemTags } from './checkElemTags'
import { checkElemText } from './checkElemText'
import { checkForDifferentObjAttrValuesInArr } from './checkForDifferentObjAttrValuesInArr'

/**
 * Код проверяющий правильность кода шаблона. Возвращает массив ошибок. Если ошибок нет, то массив будет пустым.
 * @param {String} code — код шаблона сайта введённый пользователем в поле ввода
 */
export default function checkComponentCode(code: string) {
    const errorsArr: string[] = []

    try {
        const codeObj = JSON5.parse(code)

        // НУЖНО ДОПОЛНИТЕЛЬНО НАПИСАТЬ ПРОВЕРКУ СООТВЕТСТВИЯ АТРИБУТОВ data-em-id С АТРИБУТАМИ В МАССИВЕ attrs.
        // И В ЦЕЛОМ КАЧЕСТВО КОДА МЕНЯ НЕ УСТРАИВАЕТ
        if (!codeObj.html) {
            errorsArr.push('В объекте должно быть свойство html с разметкой компонента')
            return errorsArr
        }
        else if (codeObj.html === '' || typeof codeObj.html !== 'string') {
            errorsArr.push('В свойстве html должна быть строка с разметкой компонента')
            return errorsArr
        }
        else if (!isCorrectMarkup(codeObj.html)) {
            errorsArr.push('В свойстве html должна быть разметка компонента. Допускается только 1 корневой тег.')
            return errorsArr
        }

        if (codeObj.elems) {
            const checkElemsResult = checkElems(codeObj.elems)
            errorsArr.push(...checkElemsResult)
        }

        Object.keys(codeObj).forEach(propName => {
            if (['html', 'elems', 'name'].indexOf(propName) < 0) {
                errorsArr.push(`В компоненте свойство ${propName} лишнее`)
            }
        })

        return errorsArr
    }
    catch(err) {
        return [ 'Шаблон должен быть в формате JSON.' ]
    }
}

function isCorrectMarkup(htmlStr?: string) {
    if (!htmlStr) return false

    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlStr, 'text/html')
        const elemsArr = doc.body.childNodes

        // Если в elemsArr есть 1 элемент, то разметка правильная потому что должен быть 1 корневой элемент.
        return elemsArr.length === 1
    }
    catch (err) {
        console.log(err)
        return false
    }
}

function checkElems(elems: unknown): string[] {
    const errorsArr: string[] = []

    if (!Array.isArray(elems)) {
        errorsArr.push('Свойство elems должно быть массивом.')
        return errorsArr
    }

    for (let i = 0; i < elems.length; i++) {
        if ( !(elems[i] instanceof Object) ) {
            errorsArr.push('В массиве elems должны быть объекты')
            return errorsArr
        }
    }

    elems.forEach(elem => {
        if (!elem.elemId) {
            errorsArr.push('В объекте массива elems должно быть свойство elemId. Например banner.')
        }
        else if (typeof elem.elemId !== 'string' || elem.elemId === '') {
            errorsArr.push('Свойство elemId должно быть строкой. Например banner.')
        }
        else if (!elem.elemId.length) {
            errorsArr.push('Свойство elemId должно содержать значение. Например banner.')
        }

        if (!elem.elemName) {
            errorsArr.push('В объекте массива elems должно быть свойство elemName. Например Баннер.')
        }
        else if (typeof elem.elemName !== 'string' || elem.elemName === '') {
            errorsArr.push('Свойство elemName должно быть строкой. Например Баннер.')
        }
        else if (!elem.elemName.length) {
            errorsArr.push('Свойство elemName должно содержать значение. Например Баннер.')
        }

        if (elem.elemHidden === '' || elem.elemHidden === null || elem.elemHidden && typeof elem.elemHidden !== 'boolean') {
            errorsArr.push('Свойство elemHidden должно быть булевым значением. По умолчанию имеет значение true.')
        }

        if (elem.elemCanDuplicate === '' || elem.elemCanDuplicate === null || elem.elemCanDuplicate && typeof elem.elemCanDuplicate !== 'boolean') {
            errorsArr.push('Свойство elemCanDuplicate должно быть булевым значением. По умолчанию имеет значение false.')
        }

        if (elem.elemTextInside === '' || elem.elemTextInside === null || elem.elemTextInside && typeof elem.elemTextInside !== 'boolean') {
            errorsArr.push('Свойство elemTextInside должно быть булевым значением. По умолчанию имеет значение true.')
        }

        if (elem.elemAttrs) {
            const checkElemAttrsResult = checkElemAttrs(elem.elemAttrs)
            errorsArr.push(...checkElemAttrsResult)
        }
        if (elem.elemTags) {
            const checkElemTagsResult = checkElemTags(elem.elemTags)
            errorsArr.push(...checkElemTagsResult)
        }

        if (elem.elemText instanceof Object) {
            const checkElemTextResult = checkElemText(elem.elemText)
            errorsArr.push(...checkElemTextResult)
        }
        else {
            errorsArr.push('Свойство elemText должно быть объектом.')
        }

        Object.keys(elem).forEach(propName => {
            if (['elemId', 'elemName', 'elemAttrs', 'elemTags', 'elemHidden', 'elemCanDuplicate', 'elemTextInside', 'elemText'].indexOf(propName) < 0) {
                errorsArr.push(`В компоненте свойство ${propName} лишнее`)
            }
        })
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elems, 'elemId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elems свойства elemId должны иметь разные значения.`)
    }

    return errorsArr
}

export const inputView = ['text', 'radio', 'checkbox', 'select']

// Пример кода шаблона сайта (используется в примере шаблона)
export const componentCodeExample = `{
    name: 'Banner',
    html: '<div class="banner banner--pattern-1" data-em-id="banner" data-em-group="banner-1">
               <div class="banner__container">
                   <div data-em-id="cell" data-em-group="cell-1"></div>
               </div>
           </div>',
    elems: [
        {
            elemId: 'banner',
            elemName: 'Ячейка',
            elemAttrs: [
                {
                    elemAttrId: 1,
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrView: 'text',

                    elemAttrLockedValue: 'banner ',
                    elemAttrValues: [
                        {
                            elemAttrValueId: 1,
                            elemAttrValueValue: 'pattern-1',
                            elemAttrValueAlt: 'Восточный узор',
                            elemAttrValueChecked: true
                        }
                    ]
                }
            ],
            elemTags: {
                elemTagsValues: [
                    { elemTagValueId: 1, elemTagValueName: 'h1' },
                    { elemTagValueId: 2, elemTagValueName: 'h2' },
                    { elemTagValueId: 3, elemTagValueName: 'h3' },
                ],
                elemTagsView: 'radio'
            },
            elemHidden: true,
            elemCanDuplicate: false,
            elemTextInside: true,
            elemText: {
                elemTextTags: [
                    { elemTextTagId: 1, elemTextTagName: 'p' },
                    { elemTextTagId: 2, elemTextTagName: 'i' },
                    { elemTextTagId: 3, elemTextTagName: 'blockuote' },
                ],
                elemTextAttrs: [
                    {
                        elemTextAttrId: 1,
                        elemTextAttrName: 'class',
                        elemTextAttrAlt: 'Класс',
                        elemTextAttrView: 'checkbox',
                        elemTextAttrLockedValue: 'banner ',
                        elemTextAttrValues: [
                            {
                                elemTextAttrValueId: 1,
                                elemTextAttrValueValue: 'pattern-1',
                                elemTextAttrValueAlt: 'Узор 1',
                                elemTextAttrValueChecked: true
                            }
                        ]
                    }
                ]
            }
        }
    ]
}`
