/**
 * The function returns ready fields values
 * @param {Object} fields — fields data
 */
export default function getReadyFieldsValues(fields) {
    let fieldsValuesSubmitObj = {};
    for (let fieldName in fields) {
        const field = fields[fieldName];
        if (field.valueCount === 'one') {
            fieldsValuesSubmitObj[fieldName] = field.value[0];
        }
        else if (field.valueCount === 'many') {
            fieldsValuesSubmitObj[fieldName] = field.value;
        }
    }
    return fieldsValuesSubmitObj;
}
//# sourceMappingURL=getReadyFieldsValues.js.map
//# sourceMappingURL=getReadyFieldsValues.js.map