import FHTypes from '../libs/formHandler/types';

/**
 * Функция проверяет значение поля по переданной схеме, записывает или убирает ошибку поля из Состояния формы
 * и возвращает новое Состояние формы.
 * @param {Object} schema — Схема Yup
 * @param {Array} fieldValue — значение поля
 * @param {Array} fieldName — имя поля
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldData — установшик Состояния формы
 */
export function checkFieldAndReturnFormState(
    schema: any, fieldName: string, fieldValue: string, formState: FHTypes.FormState, setFieldData: FHTypes.SetFieldData
) {
    try {
        schema.validateSync({[fieldName]: fieldValue})
        return setFieldData(formState, {error: null})
    } catch (err) {
        return setFieldData(formState, {error: err.message})
    }
}

// НЕИСПОЛЬЗУЕМАЯ ФУНКЦИЯ
/**
 * Функция ставит текст ошибки в данные поля если форма обрабатывается библиотекой FormHandler.
 * @param {Object} formDetails — объект с деталями формы
 * @param {String} fieldName — имя поля которому нужно поставить значение ошибки
 * @param {*} err — данные об ошибке. Может быть как null если ошибки нет или строка с текстом ошибки
 */
/*export function setErrorToFieldData(
    formDetails: FHTypes.FormDetailsInEventHandler, fieldName: string, err: FHTypes.AnyData
) {
    // Получение поля
    const field = formDetails.state.fields[fieldName]

    formDetails.state.fields

    formDetails.setFieldData({
        ...field.data,
        error: err
    }, fieldName)
}*/

// НЕИСПОЛЬЗУЕМАЯ ФУНКЦИЯ
/**
 * Функция проверяет есть ли в форме ошибки и возвращает булево значение
 * @param {Object} formState — Состояние формы
 */
/*
export function isFormValid(formState: FHTypes.FormState) {
    let isCorrect = true

    for(let fieldName in formState.fields) {
        const fieldData = formState.fields[fieldName].data

        if (fieldData && fieldData.error) {
            isCorrect = false
        }
    }

    return isCorrect
}*/
