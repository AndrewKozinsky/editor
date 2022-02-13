const JSON5 = require('json5')
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import {
    checkElemTagsValues,
    checkElemAttrView,
    checkElemTagsView,
//     checkForDifferentObjAttrValuesInArr,
    checkForExtraProps,
    checkProp
} from './checkFns'
import { isMarkupCorrect } from './checkHtmlMarkup'

/**
 * Код проверяющий правильность кода шаблона компонента.
 * Возвращает массив ошибок.Если ошибок нет, то массив будет пустым.
 * @param {String} code — код шаблона сайта введённый пользователем в поле ввода
 */
export default function checkComponentCode(code: string) {
    const errorsArr: string[] = []

    try {
        const codeObj: TempCompTypes.Content = JSON5.parse(code)

        // Проверки полей
        errorsArr.push(...checkProp(codeObj.templateId, 'templateId', 'string', false))
        errorsArr.push(...checkProp(codeObj.html, 'html', 'string', true))
        errorsArr.push(...isMarkupCorrect(codeObj))
        errorsArr.push(...checkProp(codeObj.elems, 'elems', 'arrayOfObjects', true, checkElems.bind(this, codeObj.elems)))

        // Проверка, что в объекте codeObj нет лишних полей
        errorsArr.push(...checkForExtraProps(codeObj, ['html', 'elems']))

        return errorsArr
    }
    catch(err) {
        return [ 'Шаблон должен быть в формате JSON.' ]
    }
}


/**
 * Проверка массива code.elems.
 * @param {Array} elems — массив code.elems.
 */
function checkElems(elems: TempCompTypes.Elems): string[] {
    const errorsArr: string[] = []

    elems.forEach(elem => {
        // Проверка полей объекта elem...
        errorsArr.push(...checkProp(elem.elemId, 'elemId', 'string', true))
        errorsArr.push(...checkProp(elem.elemName, 'elemName', 'string', true))
        errorsArr.push(...checkProp(elem.elemAttrs, 'elemAttrs', 'arrayOfObjects', false, checkElemAttrs.bind(this, elem.elemAttrs)))
        errorsArr.push(...checkProp(elem.elemTags, 'elemTags', 'object', false, checkElemTags.bind(this, elem.elemTags)))
        errorsArr.push(...checkProp(elem.elemHidden, 'elemHidden', 'boolean', false))
        errorsArr.push(...checkProp(elem.elemCanDuplicate, 'elemCanDuplicate', 'boolean', false))
        errorsArr.push(...checkProp(elem.addTextComponent, 'addTextComponent', 'boolean', false))

        // Проверка, что в объекте elem нет лишних полей
        errorsArr.push(
            ...checkForExtraProps(
                elem,
                ['elemId', 'elemName', 'elemAttrs', 'elemTags', 'elemHidden', 'elemCanDuplicate', 'addTextComponent']
            )
        )
    })

    // errorsArr.push(...checkForDifferentObjAttrValuesInArr(elems, 'elemId'))

    return errorsArr
}

/**
 * Проверка массива code.elems[0].elemAttrs.
 * @param {Array} elemAttrs — массив code.elems[0].elemAttrs
 */
export function checkElemAttrs(elemAttrs: TempCompTypes.ElemAttrs): string[] {
    const errorsArr: string[] = []

    elemAttrs.forEach(elemAttr => {
        // Проверка полей объекта elemAttr...
        errorsArr.push(...checkProp(elemAttr.elemAttrId, 'elemAttrId', 'string', true))
        errorsArr.push(...checkProp(elemAttr.elemAttrName, 'elemAttrName', 'string', true))
        errorsArr.push(...checkProp(elemAttr.elemAttrAlt, 'elemAttrAlt', 'string', false))
        errorsArr.push(...checkElemAttrView(elemAttr))
        errorsArr.push(...checkProp(elemAttr.elemAttrLockedValue, 'elemAttrLockedValue', 'string', false))
        errorsArr.push(...checkProp(elemAttr.elemAttrValues, 'elemAttrValues', 'arrayOfObjects', false, checkElemAttrValues.bind(this, elemAttr.elemAttrValues)))

        // Проверка, что в объекте elemAttr нет лишних полей
        errorsArr.push(
            ...checkForExtraProps(
                elemAttr,
                ['elemAttrId', 'elemAttrName', 'elemAttrAlt', 'elemAttrView', 'elemAttrLockedValue', 'elemAttrValues']
            )
        )
    })

    // errorsArr.push(...checkForDifferentObjAttrValuesInArr(elemAttrs, 'elemAttrId'))

    return errorsArr
}

/**
 * Проверка массива code.elems[0].elemAttrs[0].elemAttrValues
 * @param {Array} elemAttrValues — массив code.elems[0].elemAttrs[0].elemAttrValues
 */
export function checkElemAttrValues(elemAttrValues: TempCompTypes.ElemAttrValues): string[] {
    const errorsArr: string[] = []

    elemAttrValues.forEach(elemAttrValue => {
        // Проверка полей объекта elemAttrValue...
        errorsArr.push(...checkProp(elemAttrValue.elemAttrValueId, 'elemAttrValueId', 'string', true))
        errorsArr.push(...checkProp(elemAttrValue.elemAttrValueValue, 'elemAttrValueValue', 'string', true))
        errorsArr.push(...checkProp(elemAttrValue.elemAttrValueAlt, 'elemAttrValueAlt', 'string', false))
        errorsArr.push(...checkProp(elemAttrValue.elemAttrValueChecked, 'elemAttrValueChecked', 'boolean', false))

        // Проверка, что в объекте elemAttrValue нет лишних полей
        errorsArr.push(
            ...checkForExtraProps(
                elemAttrValue,
                ['elemAttrValueId', 'elemAttrValueValue', 'elemAttrValueAlt', 'elemAttrValueChecked']
            )
        )
    })

    // errorsArr.push(...checkForDifferentObjAttrValuesInArr(elemAttrValues, 'elemAttrValueId'))

    return errorsArr
}


/**
 * Проверка массива code.elems[0].elemTags.
 * @param {Array} elemTagsObj — массив code.elems[0].elemTags.
 */
export function checkElemTags(elemTagsObj: TempCompTypes.ElemTags): string[] {
    const errorsArr: string[] = []

    // Проверка полей объекта elemTagsObj...
    errorsArr.push(...checkProp(elemTagsObj.elemTagsView, 'elemTagsView', 'inputTag', false))
    errorsArr.push(...checkElemTagsView(elemTagsObj))
    errorsArr.push(...checkProp(elemTagsObj.elemTagsValues, 'elemTagsValues', 'arrayOfObjects', false, checkElemTagsValues.bind(this, elemTagsObj.elemTagsValues)))

    // Проверка, что в объекте elemTagsObj нет лишних полей
    errorsArr.push(
        ...checkForExtraProps( elemTagsObj, ['elemTagsValues', 'elemTagsView'] )
    )

    return errorsArr
}



// Пример кода шаблона сайта (используется в примере шаблона)
export const componentCodeExample = `{
    html: '<div class="banner banner--pattern-1" data-em-id="banner">
               <div class="banner__container">
                   <div data-em-id="cell"></div>
               </div>
           </div>',
    elems: [
        {
            elemId: 'banner',
            elemName: 'Ячейка',
            elemAttrs: [
                {
                    elemAttrId: '1',
                    elemAttrName: 'class',
                    elemAttrAlt: 'Класс',
                    elemAttrView: 'radio',
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
                    { elemTagValueId: '1', elemTagValueName: 'h1' },
                    { elemTagValueId: '2', elemTagValueName: 'h2' },
                    { elemTagValueId: '3', elemTagValueName: 'h3' },
                ],
                elemTagsView: 'radio'
            },
            elemHidden: true,
            elemCanDuplicate: false,
            addTextComponent: true
        }
    ]
}`
