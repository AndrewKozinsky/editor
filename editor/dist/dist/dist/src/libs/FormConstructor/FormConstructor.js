import React from 'react';
import TextInput from 'common/formElements/TextInput/TextInput';
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup';
import Select from 'common/formElements/Select/Select';
import Wrapper from 'common/Wrapper/Wrapper';
import Button from 'common/formElements/Button/Button';
import Hr from 'common/misc/Hr/Hr';
import CommonNotice from 'libs/FormConstructor/misc/CommonNotice';
import useGetMessages from 'messages/fn/useGetMessages';
import { serverMessages } from 'messages/serverMessages';
/** The component gets form config and its state and generate form's markup */
function FormConstructor(props) {
    const { config, state } = props;
    if (!state.formVisible)
        return null;
    return (React.createElement("form", { onSubmit: state.onFormSubmit }, React.createElement(Fields, { config: config, state: state }), React.createElement(BottomDivider, { config: config, state: state }), React.createElement(Bottom, { config: config, state: state }), React.createElement(Common, { config: config, state: state })));
}
export default FormConstructor;
/** Form fields component */
function Fields(props) {
    const { fields } = props.config;
    const { state } = props;
    const serverMsg = useGetMessages(serverMessages);
    // A form may consists only submit button
    if (!fields)
        return null;
    // Generate all fields depends on its type and passed data
    let fieldsMarkup = Object.keys(fields).map((fieldName, i) => {
        const fieldConfig = fields[fieldName];
        // Field element
        let field = null;
        // If it is a text input
        if (fieldConfig.fieldType === 'text') {
            // Get all field data
            const fieldData = fieldConfig.fieldData;
            // Add field name, value, onChange handler and error text. This data controlled by FormConstructor Store
            fieldData.name = fieldName;
            fieldData.value = state.fields[fieldName].value[0];
            fieldData.onChange = state.onChangeFieldHandler;
            // Получить текст ошибки...
            let errorText = state.fields[fieldName].error;
            // Возможно этот текст ошибки пришёл из сервера.
            // Тогда он будет вида site_CreateSiteDto_nameTooLong
            // Поэтому проверю есть ли человекочитаемый эквивалент в объекте serverMsg
            //@ts-ignore
            if (serverMsg[errorText])
                errorText = serverMsg[errorText];
            // Назначу текст ошибки
            fieldData.error = errorText;
            // Disable field if it is disabled or entire form
            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled);
            field = React.createElement(TextInput, Object.assign({}, fieldData));
        }
        else if (fieldConfig.fieldType === 'checkboxes' || fieldConfig.fieldType === 'radios') {
            const fieldData = fieldConfig.fieldData;
            fieldData.value = state.fields[fieldName].value;
            fieldData.onChange = state.onChangeFieldHandler;
            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled);
            field = React.createElement(FieldGroup, Object.assign({}, fieldData));
        }
        else if (fieldConfig.fieldType === 'select') {
            const fieldData = fieldConfig.fieldData;
            fieldData.name = fieldName;
            fieldData.value = state.fields[fieldName].value[0];
            //@ts-ignore
            if (state.fields[fieldName].options) {
                //@ts-ignore
                fieldData.options = state.fields[fieldName].options;
            }
            fieldData.onChange = state.onChangeFieldHandler;
            fieldData.disabled = !!(state.fields[fieldName].disabled || state.formDisabled);
            field = React.createElement(Select, Object.assign({}, fieldData));
        }
        return (React.createElement(Wrapper, { b: 10, key: i }, field));
    });
    return React.createElement(React.Fragment, null, fieldsMarkup);
}
function BottomDivider(props) {
    var _a;
    if (!((_a = props.config.bottom) === null || _a === void 0 ? void 0 : _a.hr))
        return null;
    return (React.createElement(Wrapper, { t: 10 }, React.createElement(Hr, null)));
}
/** The component with some passed elements (buttons, for example) and a submit button */
function Bottom(props) {
    const { hr } = props.config.bottom;
    const { elems, align } = props.config.bottom;
    // Some wrapper customization
    let wrapperProps = { align: 'justify', t: 5 };
    if (hr)
        wrapperProps.t = 15;
    if (align === 'left')
        delete wrapperProps.align;
    return (React.createElement(Wrapper, Object.assign({}, wrapperProps), React.createElement("div", null, elems), React.createElement(SubmitButton, Object.assign({}, props))));
}
/** Submit button component */
function SubmitButton(props) {
    const { state } = props;
    const submitBtnConfig = props.config.bottom.submit;
    submitBtnConfig.type = 'submit';
    submitBtnConfig.disabled = state.submitBtnDisabled || state.formDisabled;
    submitBtnConfig.loading = state.submitBtnLoading;
    return React.createElement(Button, Object.assign({}, submitBtnConfig));
}
/** A component with common succes or error message */
function Common(props) {
    const { state } = props;
    if (state.commonError && state.showCommonError) {
        return React.createElement(CommonNotice, { type: 'error', text: state.commonError });
    }
    else if (state.commonSuccess && state.showCommonSuccess && state.formSentSuccessfully) {
        return React.createElement(CommonNotice, { type: 'success', text: state.commonSuccess });
    }
    return null;
}
//# sourceMappingURL=FormConstructor.js.map
//# sourceMappingURL=FormConstructor.js.map
//# sourceMappingURL=FormConstructor.js.map