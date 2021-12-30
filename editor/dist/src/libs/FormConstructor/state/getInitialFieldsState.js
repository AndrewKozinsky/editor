/**
 * THe function composes fields' initial values object for set it in state
 * @param {Object} formConfig — outer configure object
 */
export default function getInitialFieldsState(formConfig) {
    // Fields data
    let fields = {};
    // Walk through form fields from a configuration object for filling fields with data.
    if (formConfig.fields) {
        Object.keys(formConfig.fields).forEach(fieldName => {
            const fieldConfig = formConfig.fields[fieldName];
            const fieldProps = {
                value: fieldConfig.initialValue || [''],
                type: getFieldType(fieldConfig),
                valueCount: getValueCount(fieldConfig),
                disabled: false,
                loading: false
            };
            if (fieldConfig.fieldType === 'text') {
                fieldProps.error = null;
            }
            fields[fieldName] = fieldProps;
        });
    }
    return fields;
}
// TODO Что делает эта функция?
function getFieldType(fieldConfig) {
    if (fieldConfig.fieldType === 'text') {
        return 'text';
    }
    else if (fieldConfig.fieldType === 'checkboxes') {
        return 'checkbox';
    }
    else if (fieldConfig.fieldType === 'radios') {
        return 'radio';
    }
    else if (fieldConfig.fieldType === 'select') {
        return 'select';
    }
}
// TODO Что делает эта функция?
function getValueCount(fieldConfig) {
    if (fieldConfig.fieldType === 'checkboxes') {
        return 'many';
    }
    else {
        return 'one';
    }
}
//# sourceMappingURL=getInitialFieldsState.js.map