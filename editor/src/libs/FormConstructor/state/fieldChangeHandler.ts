// import FCType from '../FCType'
// import setErrorsToFields from './setErrorsToFields'


/*export default function fieldChangeHandler(
    e: React.BaseSyntheticEvent,
    fields: FCType.FieldsState,
    setFields: FCType.SetFields,
    submitCounter: number,
    setSubmitCounter: FCType.SetSubmitCounter,
    formHasErrors: boolean,
    setFormHasErrors: FCType.SetFormHasErrors,
    formConfig: FCType.Config,
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled,
    setCommonError: FCType.SetCommonError
) {
    const fieldName = e.target.name

    const field = fields[fieldName]
    let fieldCopy = {...field}

    const value = e.target.value
    fieldCopy.value = getNewValue(fieldCopy, value)

    let updatedFields = {...fields, [fieldName]: fieldCopy}

    if (submitCounter) {
        const { fieldsCopy, isFormValid } = setErrorsToFields(updatedFields, formConfig)
        updatedFields = fieldsCopy
        setSubmitBtnDisabled(!isFormValid)
    }

    setFields(updatedFields)
}*/

/**
 * Функция получает новое значение поля и в зависимости от типа поля возвращает новый массив значений поля
 * @param {Object} inputData — данные поля
 * @param {String} newValue — новое значение поля
 */
/*function getNewValue(inputData: FCType.StateFieldsObj, newValue: string) {

    if (inputData.valueCount === 'one') {
        return [newValue]
    }
    else {
        // Существует ли переданное значение в массиве значений?
        const isPassedValueExists = !!(inputData.value.find(val => val === newValue))

        // Если сущуствует, то удалить, если нет, то добавить переданное значение
        let valuesNewArr = [...inputData.value]
        if (isPassedValueExists) {
            valuesNewArr = valuesNewArr.filter(val => val !== newValue)
        } else {
            valuesNewArr.push(newValue)
        }

        valuesNewArr = valuesNewArr.filter(value => !!value)

        return valuesNewArr
    }
}*/
