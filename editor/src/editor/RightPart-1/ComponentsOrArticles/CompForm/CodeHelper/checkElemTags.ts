import { inputView } from './checkComponentCode'
import { checkForDifferentObjAttrValuesInArr } from './checkForDifferentObjAttrValuesInArr'


export function checkElemTags(elemTags: any): string[] {
    const errorsArr: string[] = []

    const { elemTagsView, elemTagsValues } = elemTags

    if (!(elemTags instanceof Object)) {
        errorsArr.push('Свойство elemTags должно быть объектом.')
        return errorsArr
    }

    if (
        elemTagsView === '' ||
        typeof elemTagsView === 'string' && inputView.indexOf(elemTagsView) < 0
    ) {
        errorsArr.push(`В объекте elemTags свойство elemTagsView должно быть одно из значений: 'text', 'radio', 'checkbox' или 'select'. По умолчанию 'text'`)
    }

    if (!elemTagsValues) return errorsArr

    if (!Array.isArray(elemTagsValues)) {
        errorsArr.push('Свойство elemTagsValues должно быть массивом.')
        return errorsArr
    }

    for (let i = 0; i < elemTagsValues.length; i++) {
        if ( !(elemTagsValues[i] instanceof Object) ) {
            errorsArr.push('В массиве elemTagsValues должны быть объекты')
            return errorsArr
        }
    }

    elemTagsValues.forEach((elemTagsValue: any) => {
        const { elemTagValueId, elemTagValueName } = elemTagsValue

        if (!elemTagValueId) {
            errorsArr.push('В объекте массива elemTagsValues должно быть свойство elemTagValueId. Например 1.')
        }
        else if (typeof elemTagValueId !== 'number') {
            errorsArr.push('В объекте массива elemTagsValues свойство elemTagValueId должно быть числом. Например 1.')
        }

        if (!elemTagValueName) {
            errorsArr.push(`В объекте массива elemTagsValues должно быть свойство elemTagValueName. Например 'h1'.`)
        }
        else if (typeof elemTagValueId !== 'string' || elemTagValueId === '') {
            errorsArr.push(`В объекте массива elemTagsValues свойство elemTagValueId должно быть строкой. Например 'h1'.`)
        }
    })

    const areThereDifferentIds = checkForDifferentObjAttrValuesInArr(elemTagsValues, 'elemTagValueId')
    if (!areThereDifferentIds) {
        errorsArr.push(`В объекте массива elemTagsValues свойства elemTagValueId должны иметь разные значения.`)
    }

    return errorsArr
}
