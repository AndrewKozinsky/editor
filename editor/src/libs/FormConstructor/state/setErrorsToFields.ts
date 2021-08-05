// import FCType from '../FCType'

/*export default function setErrorsToFields(
    fields: FCType.FieldsState,
    config: FCType.Config,
) {
    // Правильно ли заполнена форма
    let isFormValid = true

    const fieldsCopy: FCType.FieldsState = {...fields}

    // Проверка всех полей формы
    for(let fieldName in fields) {
        const field = fields[fieldName]
        const fieldCopy = {...field}

        // Ignore all beside text inputs
        if (field.type !== 'text') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            const schema = config.fields[fieldName].schema

            if (schema) {
                schema(fields).validateSync(fieldValue)
                fieldCopy.error = null
                fieldsCopy[fieldName] = fieldCopy
            }
        }
        catch (err) {
            isFormValid = false
            fieldCopy.error = err.message
            fieldsCopy[fieldName] = fieldCopy
        }
    }

    return {
        fieldsCopy,
        isFormValid
    }
}*/
