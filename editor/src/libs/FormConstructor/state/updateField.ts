import FCType from '../FCType'

export default function updateFieldFn(
    fields: FCType.FieldsState,
    setFields: FCType.SetFields,
    fieldName: string,
    newFieldData: FCType.StateFieldsObj
) {
    const fieldsCopy = {...fields}
    fieldsCopy[fieldName] = newFieldData
    setFields( fieldsCopy )
}