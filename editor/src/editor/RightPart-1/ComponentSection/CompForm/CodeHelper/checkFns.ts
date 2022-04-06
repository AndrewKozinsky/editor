import TempCompTypes from 'store/article/codeType/tempCompCodeType'

// Значения для типа input
const inputView = ['text', 'radio', 'checkbox', 'select']
const inputTagView = ['text', 'radio', 'select']

/**
 * Функция проверяет значение на соответствие указанному типу. Возвращает массив ошибок.
 * @param {*} propValue — проверяемое значение.
 * @param {String} propName — имя проверяемого значения (используется для формирования текста ошибки).
 * @param {String} propType — какого типа должно быть значение.
 * @param {Boolean} required — требуется ли указывать значение.
 * @param {Function} checkChildrenFn — дополнительная функция, запускаемая для проверки дочерних элементов в проверяемом значении.
 */
export function checkProp(
    propValue: any,
    propName: string,
    propType: 'string' | 'number' | 'boolean' | 'object' | 'arrayOfObjects' | 'input' | 'inputTag',
    required: boolean,
    checkChildrenFn?: () => string[]
): string[] {

    // Завершить функцию если значение не передано.
    if (propValue === undefined) {
        return required
            ? [`Свойство ${propName} должно присутствовать.`]
            : []
    }

    // Проверки на правильность типа
    if (propType === 'string' && typeof propValue !== 'string' || propValue === null) {
        return [`Свойство ${propName} должно быть строкой.`]
    }
    else if (propType === 'string' && propValue === '') {
        return [`В значении свойства ${propName} должна быть заполненная строки.`]
    }

    else if (propType === 'number' && typeof propValue !== 'number' || propValue === null) {
        return [`Свойство ${propName} должно быть числом.`]
    }

    else if (propType === 'boolean' && typeof propValue !== 'boolean') {
        return [`Свойство ${propName} должно быть булевым значением.`]
    }

    else if (propType === 'object' && typeof propValue !== 'object' || propValue === null) {
        return [`Свойство ${propName} должно быть объектом.`]
    }

    else if (propType === 'arrayOfObjects' && !Array.isArray(propValue)) {
        return [`Свойство ${propName} должно быть массивом объектов.`]
    }
    else if (propType === 'arrayOfObjects' && Array.isArray(propValue)) {
        for (let i = 0; i < propValue.length; i++) {
            if ( !(propValue[i] instanceof Object) ) {
                return [`В массиве ${propName} должны быть объекты`]
            }
        }
    }

    else if (propType === 'input' && (typeof propValue !== 'string')) {
        return [`Свойство ${propName} должно быть одним из следующих значений: 'text', 'radio', 'checkbox' или 'select'.`]
    }
    else if (propType === 'input' && typeof propValue === 'string' && inputView.indexOf(propValue) === -1) {
        return [`Свойство ${propName} должно быть одним из следующих значений: 'text', 'radio', 'checkbox' или 'select'.`]
    }

    else if (propType === 'inputTag' && (typeof propValue !== 'string')) {
        return [`Свойство ${propName} должно быть одним из следующих значений: 'text', 'radio' или 'select'.`]
    }
    else if (propType === 'inputTag' && typeof propValue === 'string' && inputTagView.indexOf(propValue) === -1) {
        return [`Свойство ${propName} должно быть одним из следующих значений: 'text', 'radio' или 'select'.`]
    }

    if (checkChildrenFn) {
        return checkChildrenFn()
    }

    return []
}

/**
 * Функция проверяет, что в объекте parentObj нет полей не соответствующие полям из массива validProps.
 * @param {Object} parentObj — объект с полями, которые нужно проверить.
 * @param {Array} validProps — массив с названиями полей, которые должны быть в переданном объекте.
 */
export function checkForExtraProps(parentObj: object, validProps: string[]) {
    const errorsArr: string[] = []

    Object.keys(parentObj).forEach(propName => {
        if (validProps.indexOf(propName) < 0) {
            errorsArr.push(`Свойство ${propName} лишнее`)
        }
    })

    return errorsArr
}

/**
 * Функция проверяет что свойство propName в объектах массива arr имеют различающиеся значения.
 * В случае ошибки возвращается массив с текстом ошибки. Если ошибок нет, то пустой массив.
 * @param {Array} arr — массив объектов
 * @param {String} propName — название проверяемого свойства
 */
export function checkForDifferentObjAttrValuesInArr(arr: unknown[], propName: string) {
    const result: any = {}

    arr.forEach((arrItem: any) => {
        result[arrItem[propName]] = 1
    })

    return arr.length !== Object.keys(result).length
        ? [`Свойства ${propName} должны иметь разные значения.`]
        : []
}

/**
 * Функция проверяет свойство elemAttrView чтобы оно соответствовало значениям написанным в elemAttrValues.
 * Другими словами если свойства elemAttrValues нет, то elemAttrView или тоже не должно быть указано (по умолчанию равно text) или прямо должно быть указано text.
 * Если в elemAttrValues дан массив значений атрибута, то elemAttrView должно иметь значение checkbox, radio или select. Если его нет, то по умолчанию будет radio.
 * @param {Object} elemAttr — шаблон атрибута элемента
 */
export function checkElemAttrView(elemAttr: TempCompTypes.ElemAttr) {
    const errorsArr: string[] = []

    // Если в elemAttrValues находится массив, то elemAttrView не может быть в значении text.
    if (Array.isArray(elemAttr.elemAttrValues)) {
        if (elemAttr.elemAttrView === 'text') {
            errorsArr.push(`Так как в качестве значений атрибута указан массив идентификаторов, то в свойстве elemAttrView требуется указать тип поля ввода одним из трёх значений: checkbox, radio или select.`)
        }
    }
    // Если в elemAttrValues не массив, то elemAttrView не может быть в значении checkbox, radio или select.
    else {
        if (['checkbox', 'radio', 'select'].includes(elemAttr.elemAttrView)) {
            errorsArr.push(`Если вы указали в свойстве elemAttrView значение checkbox, radio или select, то вам следует или задать свойство elemAttrValues с массивом значений атрибута или поменять значение elemAttrView на text. Так же это свойство можно убрать, тогда по умолчанию оно будет иметь значение text.`)
        }
    }

    return errorsArr
}

/**
 * Функция проверяет свойство elemAttrView чтобы оно соответствовало значениям написанным в elemAttrValues.
 * Другими словами если свойства elemAttrValues нет, то elemAttrView или тоже не должно быть указано (по умолчанию равно text) или прямо должно быть указано text.
 * Если в elemAttrValues дан массив значений атрибута, то elemAttrView должно иметь значение checkbox, radio или select. Если его нет, то по умолчанию будет radio.
 * @param {Object} elemTag — шаблон тега элемента
 */
export function checkElemTagsView(elemTag: TempCompTypes.ElemTags) {
    const errorsArr: string[] = []

    // Если в elemAttrValues находится массив, то elemAttrView не может быть в значении text.
    if (Array.isArray(elemTag.elemTagsValues)) {
        if (elemTag.elemTagsView === 'text') {
            errorsArr.push(`Так как в качестве значений тега указан массив идентификаторов, то в свойстве elemTagsView требуется указать тип поля ввода radio или select.`)
        }
    }
    // Если в elemTagsValues не массив, то elemTagsView не может быть в значении radio или select.
    else if  (!Array.isArray(elemTag.elemTagsValues)) {
        if (['radio', 'select'].includes(elemTag.elemTagsView)) {
            errorsArr.push(`Если вы указали в свойстве elemTagsView значение radio или select, то вам следует или задать свойство elemTagsValues с массивом значений тега или поменять значение elemTagsView на text. Так же это свойство можно убрать, тогда по умолчанию оно будет иметь значение text.`)
        }
    }

    return errorsArr
}

/**
 * Проверка массива code.elems[0].elemTags[0].elemTagsValues.
 * @param {Array} elemTagsValues — массив code.elems[0].elemTags[0].elemTagsValues.
 */
export function checkElemTagsValues(elemTagsValues: TempCompTypes.ElemTagsValues) {
    const errorsArr: string[] = []

    elemTagsValues.forEach(elemTagsValue => {
        // Проверка полей объекта elemTagsValue...
        errorsArr.push(...checkProp(elemTagsValue.elemTagValueId, 'elemTagValueId', 'string', true))
        errorsArr.push(...checkProp(elemTagsValue.elemTagValueName, 'elemTagValueName', 'string', true))

        // Проверка, что в объекте elemTagsValue нет лишних полей
        errorsArr.push(
            ...checkForExtraProps( elemTagsValue, ['elemTagValueId', 'elemTagValueName'] )
        )
    })

    errorsArr.push(...checkForDifferentObjAttrValuesInArr(elemTagsValues, 'elemTagValueId'))

    return errorsArr
}