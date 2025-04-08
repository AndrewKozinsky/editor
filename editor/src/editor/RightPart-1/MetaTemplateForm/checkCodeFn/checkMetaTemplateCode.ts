const JSON5 = require('json5')
import MetaType from '../../ArticleSection/ArtForm/Meta/MetaType'
import { checkForExtraProps, checkProp } from '../../ComponentSection/CompForm/CodeHelper/checkFns'


/**
 * Код проверяющий правильность кода шаблона. Возвращает массив ошибок. Если ошибок нет, то массив будет пустым.
 * @param {String} code — код шаблона сайта введённый пользователем в поле ввода
 */
export default function checkMetaTemplateCode(code: string) {
    const errorsArr: string[] = []

    try {
        const codeObj: MetaType.MetaTemplate = JSON5.parse(code)

        // @ts-ignore
        if (Array.isArray(codeObj) || codeObj === null || !isNaN(codeObj)) {
            errorsArr.push('Шаблон должен быть объектом')
            return errorsArr
        }

        // Проверки полей
        errorsArr.push(...checkProp(codeObj.name, 'name', 'string', true))
        errorsArr.push(...checkProp(codeObj.items, 'items', 'arrayOfObjects', true, checkItems.bind(this, codeObj.items)))

        // Проверка, что в объекте codeObj нет лишних полей
        errorsArr.push(...checkForExtraProps(codeObj, ['name', 'items']))

        return errorsArr
    }
    catch(err) {
        return [
            'Шаблон должен быть в формате JSON.'
        ]
    }
}


/**
 * Проверка массива code.items.
 * @param {Array} items — массив code.items.
 */
function checkItems(items: MetaType.Items): string[] {
    const errorsArr: string[] = []

    items.forEach(item => {
        errorsArr.push(...checkProp(item.type, 'type', 'string', true))

        // Проверка, что все id уникальные
        errorsArr.push(...checkIdPropForUniques(items, item.id))

        if (item.type === 'header') {
            errorsArr.push(...checkProp(item.id, 'id', 'number', true))
            errorsArr.push(...checkProp(item.text, 'text', 'string', true))

            // Проверка, что в объекте item нет лишних полей
            errorsArr.push(
                ...checkForExtraProps(
                    item,
                    ['id', 'type', 'text']
                )
            )
        }
        else if (item.type === 'input') {
            errorsArr.push(...checkProp(item.id, 'id', 'number', true))
            errorsArr.push(...checkProp(item.label, 'label', 'string', true))
            errorsArr.push(...checkProp(item.name, 'name', 'string', true))
            errorsArr.push(...checkInputView(item))
            errorsArr.push(...checkProp(item.values, 'values', 'arrayOfObjects', false, checkInputValues.bind(this, item.values)))

            // Проверка, что в объекте item нет лишних полей
            errorsArr.push(
                ...checkForExtraProps(
                    item, ['id', 'type', 'label', 'name', 'view', 'values']
                )
            )
        }
    })

    return errorsArr
}

/**
 * Функция проверяющая, что значение свойства id в объектах массива не повторяется
 * @param {Array} items — массив объектов
 * @param {String} verifiableId — значение проверяемого идентификатора
 */
function checkIdPropForUniques(
    items: MetaType.Items | MetaType.InputValues,
    verifiableId: number | string
): string[] {
    // Поиск элемента с таким же идентификатором
    let thisIdCount = 0

    items.forEach(iterItem => {
        if (iterItem.id === verifiableId) thisIdCount++
    })

    if (thisIdCount > 1) {
        return [`Свойство id должно быть уникальным. Замените значение ${verifiableId} на другое.`]
    }

    return []
}

/**
 * Функция проверяет чтобы свойство view в данных поля ввода было согласовано с данными в свойстве values.
 * В values может быть как строка (точное значение) (тогда view может быть только в значении text или ничего не указано),
 * так и массив строк (выбранный идентификатор) (тогда view может быть во всех оставшихся значениях или ничего не указано).
 * @param {MetaType.Input} metaInput — данные поля ввода из шаблона метаданных
 */
function checkInputView(metaInput: MetaType.Input) {
    const errorsArr: string[] = []

    if (!metaInput.view) return []

    // Если в metaInput.values находится массив, то вид не может быть в значении text.
    if (Array.isArray(metaInput.values)) {
        if (metaInput.view === 'text') {
            errorsArr.push(`Так как в свойстве values задан массив значений, то свойство view требуется указать тип поля ввода одним из трёх значений: checkbox, radio или select. Либо уберите это свойство. Тогда оно будет в значение radio.`)
        }
    }
    // Если в metaInput.values не массив, то вид не может быть в значении checkbox, radio или select.
    else {
        if (['checkbox', 'radio', 'select'].includes(metaInput.view)) {
            errorsArr.push(`Если вы указали в свойстве view значение checkbox, radio или select, то вам следует или задать свойство view с массивом значений или поменять значение view на text. Так же это свойство можно убрать, тогда по умолчанию оно будет иметь значение text.`)
        }
    }

    return errorsArr
}

/** Функция проверяет правильность объектов из массива values */
export function checkInputValues(inputValues: MetaType.InputValues): string[] {
    const errorsArr: string[] = []

    inputValues.forEach(inputValue => {
        // Поиск элемента с таким же идентификатором
        // errorsArr.push(...checkIdPropForUniquesInValues(inputValues, inputValue.id))
        errorsArr.push(...checkIdPropForUniques(inputValues, inputValue.id))

        errorsArr.push(...checkProp(inputValue.id, 'id', 'string', true))
        errorsArr.push(...checkProp(inputValue.label, 'label', 'string', true))
        errorsArr.push(...checkProp(inputValue.value, 'value', 'string', true))

        // Проверка, что в объекте elemAttr нет лишних полей
        errorsArr.push(
            ...checkForExtraProps(
                inputValue, ['id', 'label', 'value']
            )
        )
    })

    return errorsArr
}

/**
 * Функция проверяющая, что значение свойства id в объектах массива не повторяется
 * @param {Array} items — массив объектов
 * @param {String} verifiableId — значение проверяемого идентификатора
 */
/*function checkIdPropForUniquesInValues(items: MetaType.InputValues, verifiableId: string): string[] {
    // Поиск элемента с таким же идентификатором
    let thisIdCount = 0

    items.forEach(iterItem => {
        if (iterItem.id === verifiableId) thisIdCount++
    })

    if (thisIdCount > 1) {
        return [`Свойство id должно быть уникальным. Замените значение ${verifiableId} на другое.`]
    }

    return []
}*/



// Пример кода шаблона метаданных (используется в примере шаблона)
// const metaTemplateCodeExample: MetaType.MetaTemplate = {
export const metaTemplateCodeExample = `{
    name: 'Standard article',
    items: [
        {
            id: 1,
            type: 'header',
            text: 'General'
        },
        {
            id: 2,
            type: 'input',
            label: 'Article name',
            name: 'articleName'
        },
        {
            id: 4,
            type: 'input',
            label: 'Author',
            name: 'authorName',
            view: 'select',
            values: [
                {
                    id: '10',
                    label: 'Father McKenzie',
                    value: 'McKenzie'
                },
                {
                    id: '11',
                    label: 'Eleanor Rigby',
                    value: 'Rigby'
                }
            ]
        }
    ]
}`

