import { OuterOnChangeHandlerType } from '../outerOnChangeFn'

/**
 * Обработчик изменения значения флага или переключателя.
 * После этого функция вычисляет данные установленные в полях и записывает в местное Состояние.
 * Объект с данными установленными в полях передаётся внешней функции, которая дальше их обрабатывает
 * @param {Object} fieldsValues — объект состояния с данными о введённых в поля значениях
 * @param {Function} setFieldsValues — функция-установщик объекта состояния с данными о введённых в поля значениях
 * @param {String} inputType — тип поля: переключатель или флаг
 * @param {Function} outerOnChangeHandler — внешняя функция обрабатывающая данные
 */
export function updateFieldValuesInState(
    fieldsValues: OuterOnChangeHandlerType.FieldsData,
    setFieldsValues: OuterOnChangeHandlerType.FieldsHandler,
    inputType: 'radio' | 'checkbox',
    outerOnChangeHandler: OuterOnChangeHandlerType.FieldsHandler
) {
    return function (fieldData: OuterOnChangeHandlerType.FieldsData) {
        if (inputType === 'radio') {
            // Объект со значением выделенного поля, который будет сохранён в Состояние
            const fieldsStateObj = {
                fieldName: fieldData.fieldName,
                fieldValue: [fieldData.fieldValue[0]]
            }
            // Сохранить объект в Состояние
            setFieldsValues(fieldsStateObj)
            // Передать этот объект внешней функции обрабатывающей данные
            outerOnChangeHandler(fieldsStateObj)
        }
        else if (inputType === 'checkbox') {
            // Is passed value exist in a values array?
            const isPassedValueExists = !!(fieldsValues.fieldValue.find(val => val === fieldData.fieldValue[0]))

            // If it is exists, then delete it, otherwise add the passed value
            let valuesNewArr = [...fieldsValues.fieldValue]
            if (isPassedValueExists) {
                valuesNewArr = valuesNewArr.filter(val => val !== fieldData.fieldValue[0])
            }
            else {
                valuesNewArr.push(fieldData.fieldValue[0])
            }

            // Объект со значениями выделенных полей, который будет сохранён в Состояние
            const fieldsStateObj = {
                fieldName: fieldData.fieldName,
                fieldValue: valuesNewArr
            }
            // Сохранить объект в Состояние
            setFieldsValues(fieldsStateObj)
            // Передать этот объект внешней функции обрабатывающей данные
            outerOnChangeHandler(fieldsStateObj)
        }
    }
}
