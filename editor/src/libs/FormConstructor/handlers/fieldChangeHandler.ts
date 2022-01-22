import FCType from '../FCType'
import setErrorsToFields from '../state/setErrorsToFields'
import { OuterOnChangeHandlerType } from 'common/formElements/outerOnChangeFn'

export default function fieldChangeHandler(
    fieldData: OuterOnChangeHandlerType.FieldsData, // Имя и введённое в поле значение
    fields: FCType.FieldsState, // Fields data from Store
    setFields: FCType.SetFields, // Fields data setting function
    submitCounter: number, // How many time form was submitted
    formConfig: FCType.Config, // Outer configure object
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled, // Submit button
    setCommonError: FCType.SetCommonError, // Common error setting function
) {
    const fieldName = fieldData.fieldName
    let fieldCopy = {...fields[fieldName]}
    fieldCopy.value = fieldData.fieldValue

    // Set the field with a new value to a fields set
    let updatedFields: FCType.FieldsState = {...fields, [fieldName]: fieldCopy}

    // Set errors to fields if form sent at once
    if (submitCounter) {
        const { fieldsCopy, isFormValid } = setErrorsToFields(updatedFields, formConfig)
        updatedFields = fieldsCopy
        setSubmitBtnDisabled(!isFormValid)
    }

    setFields(updatedFields)
    setCommonError(null)
}
