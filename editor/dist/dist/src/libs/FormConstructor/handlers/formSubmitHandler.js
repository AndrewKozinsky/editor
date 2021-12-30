var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getFirstInvalidFieldName from '../misc/getFirstInvalidFieldName';
import getReadyFieldsValues from '../misc/getReadyFieldsValues';
import setErrorsToFields from '../state/setErrorsToFields';
export default function formSubmitHandler(e, // Event object
fields, // Fields data from Store
setFields, // Fields data setting function
submitCounter, // How many time form was submitted
setSubmitCounter, // Set submit counter setting function
formConfig, // Outer configure object
setSubmitBtnDisabled, // Set submit button disabled setting function
setFormDisabled, // Set form disabled setting function
setSubmitBtnLoading, // Set submit button loading status function
setCommonError, // Common error setting function
setFormVisible, // Set form visible setting function
setFormSentSuccessfully, // Set form successfully sent setting function
outerFns, // User's functions passed to FormConstructor config
commonSuccess, // Success message
showCommonSuccess, // Show success message setting function
formData, // Пользовательские данные формы
setFormData, // Установка пользовательских данных формы
serverMsg // Error message from a server response
) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        // 1. Increase submit counter
        setSubmitCounter(submitCounter + 1);
        // 2. Check fields and set errors in fields
        if (submitCounter === 0) {
            const { fieldsCopy, isFormValid } = setErrorsToFields(fields, formConfig);
            if (!isFormValid) {
                // Disable submit button
                setSubmitBtnDisabled(true);
                // Первое поле, где есть ошибка
                let firstWrongFieldName = getFirstInvalidFieldName(fieldsCopy);
                // Set a focus to the first field with an error
                const $firstWrongField = document.querySelector(`[name="${firstWrongFieldName}"]`);
                if ($firstWrongField)
                    $firstWrongField.focus();
                setFields(fieldsCopy);
                return;
            }
        }
        setFormDisabled(true);
        setSubmitBtnLoading(true);
        setSubmitBtnDisabled(true);
        // Get ready fields values
        const readyFieldValues = getReadyFieldsValues(fields);
        const formDetails = {
            setFormVisible,
            readyFieldValues,
            formData,
            setFormData
        };
        // Send data to a server and get response
        let response = formConfig.requestFn
            ? yield formConfig.requestFn(readyFieldValues, outerFns, formDetails)
            : { status: 'success' };
        // Unlock all fields. Remove loading status from the submit button
        setFormDisabled(false);
        setSubmitBtnLoading(false);
        if (response.status === 'success') {
            setFormSentSuccessfully(true);
            if (formConfig.hideAfterSuccessfulSubmit) {
                setFormVisible(false);
                return;
            }
        }
        // If user set wrong data
        else {
            // Lock submit button
            setSubmitBtnDisabled(true);
            // Show common message. It will be shown below a form
            if (response.commonError) {
                setCommonError(serverMsg[response.commonError]);
            }
            if (response.errors) {
                const fieldsCopy = Object.assign({}, fields);
                for (let fieldName in response.errors) {
                    fieldsCopy[fieldName].error = response.errors[fieldName][0];
                }
                setFields(fieldsCopy);
            }
        }
        if (formConfig.afterSubmit) {
            formConfig.afterSubmit(response, outerFns, formDetails);
        }
    });
}
//# sourceMappingURL=formSubmitHandler.js.map
//# sourceMappingURL=formSubmitHandler.js.map