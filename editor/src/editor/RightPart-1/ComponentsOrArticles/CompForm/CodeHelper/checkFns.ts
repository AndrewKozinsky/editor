
// Значения для типа input
const inputView = ['text', 'radio', 'checkbox', 'select']

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
    propType: 'string' | 'number' | 'boolean' | 'object' | 'arrayOfObjects' | 'input',
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
