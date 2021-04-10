import FHTypes from '../libs/formHandler/types';

/**
 * Функция ставит текст ошибки в данные поля если форма обрабатывается библиотекой FormHandler.
 * @param {Object} formDetails — объект с деталями формы
 * @param {String} fieldName — имя поля которому нужно поставить значение ошибки
 * @param {*} err — данные об ошибке. Может быть как null если ошибки нет или строка с текстом ошибки
 */
export function setErrorToFieldData(
    formDetails: FHTypes.FormDetailsInEventHandler, fieldName: string, err: FHTypes.AnyData
) {
    // Получение поля
    const field = formDetails.state.fields[fieldName]

    formDetails.state.fields

    formDetails.setFieldData({
        ...field.data,
        error: err
    }, fieldName)
}

/**
 * Функция проверяет есть ли в форме ошибки и возвращает булево значение
 * @param {Object} formState — Состояние формы
 */
export function isFormValid(formState: FHTypes.FormState) {
    let isCorrect = true

    for(let fieldName in formState.fields) {
        const fieldData = formState.fields[fieldName].data

        if (fieldData && fieldData.error) {
            isCorrect = false
        }
    }

    return isCorrect
}