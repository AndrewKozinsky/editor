import { inputView } from './checkComponentCode'
import { checkForDifferentObjAttrValuesInArr } from './checkForDifferentObjAttrValuesInArr'

export function checkElemText(elemText: any): string[] {
    const errorsArr: string[] = []

    const { elemTextTags, elemTextAttrs } = elemText

    if (elemTextTags === '' || elemTextTags && !Array.isArray(elemTextTags)) {
        errorsArr.push('Свойство elemTextTags должно быть массивом.')
        return errorsArr
    }
    else {
        const checkElemTextTagsResult = checkElemTextTags(elemTextTags)
        errorsArr.push(...checkElemTextTagsResult)
    }

    if (elemTextAttrs === '' || elemTextAttrs && !Array.isArray(elemTextAttrs)) {
        errorsArr.push('Свойство elemTextAttrs должно быть массивом.')
    }
    else {
        const checkElemTextAttrsResult = checkElemTextAttrs(elemTextAttrs)
        errorsArr.push(...checkElemTextAttrsResult)
    }

    return errorsArr
}


export function checkElemTextTags(elemTextTags: any[]): string[] {
    const errorsArr: string[] = []

    for (let i = 0; i < elemTextTags.length; i++) {
        if ( !(elemTextTags[i] instanceof Object) ) {
            errorsArr.push('В массиве elemTextTags должны быть объекты')
            return errorsArr
        }
    }

    elemTextTags.forEach(elemTextTag => {
        const { elemTextTagId, elemTextTagName } = elemTextTag

        if (!elemTextTagId) {
            errorsArr.push('В объекте массива elemTextTags должно быть свойство elemTextTagId. Например 1.')
        }
        else if (typeof elemTextTagId !== 'number') {
            errorsArr.push('В объекте массива elemTextTags свойство elemTextTagId должно быть числом. Например 1.')
        }

        if (!elemTextTagName) {
            errorsArr.push(`В объекте массива elemTextTags должно быть свойство elemTextTagName. Например 'p'.`)
        }
        else if (typeof elemTextTagName !== 'string') {
            errorsArr.push(`В объекте массива elemTextTags свойство elemTagValueId должно быть строкой. Например 'p'.`)
        }
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemTextTags, 'elemTextTagId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemTextTags свойства elemTextTagId должны иметь разные значения.`)
    }

    return errorsArr
}


export function checkElemTextAttrs(elemTextAttrs: any[]): string[] {
    const errorsArr: string[] = []

    for (let i = 0; i < elemTextAttrs.length; i++) {
        if ( !(elemTextAttrs[i] instanceof Object) ) {
            errorsArr.push('В массиве elemTextTags должны быть объекты')
            return errorsArr
        }
    }

    elemTextAttrs.forEach(elemTextAttr => {
        const { elemTextAttrId, elemTextAttrName, elemTextAttrAlt, elemTextAttrView, elemTextAttrLockedValue, elemTextAttrValues } = elemTextAttr

        if (!elemTextAttrId) {
            errorsArr.push('В объекте массива elemTextAttrs должно быть свойство elemTextAttrId. Например 1.')
        }
        else if (typeof elemTextAttrId !== 'number') {
            errorsArr.push('В объекте массива elemTextAttrs свойство elemTextAttrId должно быть числом. Например 1.')
        }

        if (!elemTextAttrName) {
            errorsArr.push(`В объекте массива elemTextAttrs должно быть свойство elemTextAttrName. Например 'class'.`)
        }
        else if (typeof elemTextAttrName !== 'string') {
            errorsArr.push(`В объекте массива elemTextAttrs свойство elemTextAttrName должно быть строкой. Например 'class'.`)
        }

        if (elemTextAttrAlt === '' || (elemTextAttrAlt && typeof elemTextAttrAlt !== 'string')) {
            errorsArr.push(`В объекте массива elemTextAttrs свойство elemTextAttrAlt должно быть строкой. Например 'Класс'.`)
        }

        if (elemTextAttrView === '' || (elemTextAttrView && typeof elemTextAttrView !== 'string')) {
            errorsArr.push(`В объекте массива elemTextAttrs свойство elemTextAttrView должно быть одно из значений: 'text', 'radio', 'checkbox' или 'select'. По умолчанию 'text'`)
        }
        else if (typeof elemTextAttrView === 'string' && inputView.indexOf(elemTextAttrView) === -1) {
            errorsArr.push(`В объекте массива elemTextAttrs свойство elemTextAttrView должно быть одно из значений: 'text', 'radio', 'checkbox' или 'select'. По умолчанию 'text'`)
        }

        if ((elemTextAttrLockedValue && typeof elemTextAttrLockedValue) !== 'string' || elemTextAttrLockedValue === '') {
            errorsArr.push(`В объекте массива elemTextAttrs свойство elemTextAttrLockedValue должно быть строкой. Например 'banner '.`)
        }

        if (!elemTextAttrValues || !Array.isArray(elemTextAttrValues)) {
            errorsArr.push('Свойство elemTextAttrValues должно быть массивом.')
        }
        else {
            const checkElemTextAttrValuesResult = checkElemTextAttrValues(elemTextAttrValues)
            errorsArr.push(...checkElemTextAttrValuesResult)
        }

        Object.keys(elemTextAttr).forEach(propName => {
            if (['elemTextAttrId', 'elemTextAttrName', 'elemTextAttrAlt', 'elemTextAttrView', 'elemTextAttrLockedValue', 'elemTextAttrValues'].indexOf(propName) < 0) {
                errorsArr.push(`В компоненте свойство ${propName} лишнее`)
            }
        })
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemTextAttrs, 'elemTextAttrId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemTextAttrs свойства elemTextAttrId должны иметь разные значения.`)
    }

    return errorsArr
}

export function checkElemTextAttrValues(elemTextAttrValues: any[]): string[] {
    const errorsArr: string[] = []

    for (let i = 0; i < elemTextAttrValues.length; i++) {
        if ( !(elemTextAttrValues[i] instanceof Object) ) {
            errorsArr.push('В массиве elemTextAttrValues должны быть объекты')
            return errorsArr
        }
    }

    elemTextAttrValues.forEach(elemTextAttrValue => {
        const { elemTextAttrValueId, elemTextAttrValueValue, elemTextAttrValueAlt, elemTextAttrValueChecked } = elemTextAttrValue

        if (!elemTextAttrValueId) {
            errorsArr.push('В объекте массива elemTextAttrValues должно быть свойство elemTextAttrValueId. Например 1.')
        }
        else if (typeof elemTextAttrValueId !== 'number') {
            errorsArr.push('В объекте массива elemTextAttrValues свойство elemTextAttrValueId должно быть числом. Например 1.')
        }

        if (!elemTextAttrValueValue) {
            errorsArr.push(`В объекте массива elemTextAttrValues должно быть свойство elemTextAttrValueValue. Например 'class'.`)
        }
        else if (typeof elemTextAttrValueValue !== 'string' || elemTextAttrValueValue === '') {
            errorsArr.push(`В объекте массива elemTextAttrValues свойство elemTextAttrValueValue должно быть строкой. Например 'pattern-1'.`)
        }

        if (elemTextAttrValueAlt && typeof elemTextAttrValueAlt !== 'string' || elemTextAttrValueAlt === '' || elemTextAttrValueAlt === null) {
            errorsArr.push(`В объекте массива elemTextAttrValues свойство elemTextAttrValueAlt должно быть строкой. Например 'Узор 1'.`)
        }

        if (elemTextAttrValueChecked === '' || elemTextAttrValueChecked === null || elemTextAttrValueChecked && typeof elemTextAttrValueChecked !== 'boolean') {
            errorsArr.push(`В объекте массива elemTextAttrValues свойство elemTextAttrValueChecked должно быть булевом значением. По умолчанию true.`)
        }

        Object.keys(elemTextAttrValue).forEach(propName => {
            if (['elemTextAttrValueId', 'elemTextAttrValueValue', 'elemTextAttrValueAlt', 'elemTextAttrValueChecked'].indexOf(propName) < 0) {
                errorsArr.push(`В компоненте свойство ${propName} лишнее`)
            }
        })
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemTextAttrValues, 'elemTextAttrValueId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemTextAttrValues свойства elemTextAttrValueId должны иметь разные значения.`)
    }

    return errorsArr
}
