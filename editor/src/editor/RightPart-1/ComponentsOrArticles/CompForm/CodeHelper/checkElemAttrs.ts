import { inputView } from './checkComponentCode'
import { checkForDifferentObjAttrValuesInArr } from './checkForDifferentObjAttrValuesInArr'


export function checkElemAttrs(elemAttrs: unknown): string[] {
    const errorsArr: string[] = []

    if (!Array.isArray(elemAttrs)) {
        errorsArr.push('Свойство elems должно быть массивом.')
        return errorsArr
    }

    for (let i = 0; i < elemAttrs.length; i++) {
        if ( !(elemAttrs[i] instanceof Object) ) {
            errorsArr.push('В массиве elemAttrs должны быть объекты')
            return errorsArr
        }
    }

    elemAttrs.forEach(elemAttr => {
        const { elemAttrId, elemAttrName, elemAttrAlt, elemAttrView, elemAttrLockedValue, elemAttrValues } = elemAttr

        if (!elemAttrId || typeof elemAttrId !== 'number') {
            errorsArr.push('В объекте массива elemAttrs должно быть свойство elemAttrId с числовым значением. Например 1.')
        }

        if (!elemAttrName || typeof elemAttrName !== 'string' || elemAttrName === '') {
            errorsArr.push(`В объекте массива elemAttrs должно быть свойство elemAttrName с именем атрибута тега. Например 'class'.`)
        }

        if (elemAttrAlt && (typeof elemAttrAlt !== 'string' || elemAttrAlt === '')) {
            errorsArr.push(`В объекте массива elemAttrs свойство elemAttrAlt должно быть строкой. Например 'Класс'.`)
        }

        if (
            elemAttrView && typeof elemAttrView !== 'string' ||
            typeof elemAttrView === 'string' && inputView.indexOf(elemAttrView) === -1
        ) {
            errorsArr.push(`В объекте массива elemAttrs свойство elemAttrView должно быть одно из значений: 'text', 'radio', 'checkbox' или 'select'. По умолчанию 'text'`)
        }

        if (elemAttrLockedValue && (typeof elemAttrLockedValue !== 'string' || elemAttrLockedValue === '')) {
            errorsArr.push(`В объекте массива elemAttrs свойство elemAttrLockedValue должно быть строкой. Например 'banner'.`)
        }

        if (elemAttrValues) {
            const checkElemAttrValuesResult = checkElemAttrValues(elemAttrValues)
            errorsArr.push(...checkElemAttrValuesResult)
        }

        Object.keys(elemAttr).forEach(propName => {
            if (['elemAttrId', 'elemAttrName', 'elemAttrAlt', 'elemAttrView', 'elemAttrLockedValue', 'elemAttrValues'].indexOf(propName) < 0) {
                errorsArr.push(`В компоненте свойство ${propName} лишнее`)
            }
        })
    })


    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemAttrs, 'elemAttrId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemAttrs свойства elemAttrId должны иметь разные значения.`)
    }

    return errorsArr
}

export function checkElemAttrValues(elemAttrValues: unknown): string[] {
    const errorsArr: string[] = []

    if (!Array.isArray(elemAttrValues)) {
        errorsArr.push('Свойство elemAttrValues должно быть массивом.')
        return errorsArr
    }

    for (let i = 0; i < elemAttrValues.length; i++) {
        if ( !(elemAttrValues[i] instanceof Object) ) {
            errorsArr.push('В массиве elemAttrValue должны быть объекты')
            return errorsArr
        }
    }

    elemAttrValues.forEach(elemAttrValue => {
        const { elemAttrValueId, elemAttrValueValue, elemAttrValueAlt, elemAttrValueChecked } = elemAttrValue

        if (!elemAttrValueId || typeof elemAttrValueId !== 'number') {
            errorsArr.push('В объекте массива elemAttrValues должно быть свойство elemAttrValueId с числовым значением. Например 1.')
        }

        if (!elemAttrValueValue || typeof elemAttrValueValue !== 'string' || elemAttrValueValue === '') {
            errorsArr.push(`В объекте массива elemAttrValues свойство elemAttrValueValue должно быть строкой. Например 'pattern-1'.`)
        }

        if (elemAttrValueAlt && typeof elemAttrValueAlt !== 'string' || elemAttrValueAlt === '') {
            errorsArr.push(`В объекте массива elemAttrValues свойство elemAttrValueAlt должно быть строкой. Например 'Восточный узор'.`)
        }

        if (elemAttrValueChecked && typeof elemAttrValueChecked !== 'boolean' || elemAttrValueChecked === '') {
            errorsArr.push(`В объекте массива elemAttrValues свойство elemAttrValueChecked должно быть булевым значением. По умолчанию true.`)
        }
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemAttrValues, 'elemAttrValueId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemAttrValues свойства elemAttrValueId должны иметь разные значения.`)
    }

    return errorsArr
}