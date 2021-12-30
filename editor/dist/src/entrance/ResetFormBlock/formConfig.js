var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as yup from 'yup';
import resetPasswordRequest from 'requests/user/resetPasswordRequest';
/**
 * Функция возвращает конфигурацию формы сброса пароля
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} resetFormMsg — объект с текстами ошибок
 */
export default function getConfig(commonMsg, resetFormMsg) {
    const config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(commonMsg.emailErrInvalid);
                },
                fieldData: {
                    label: resetFormMsg.emailField,
                    autocomplete: 'email',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: true,
                }
            },
        },
        bottom: {
            submit: {
                text: resetFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield resetPasswordRequest(readyFieldValues.email.toString());
            });
        },
        afterSubmit(response) {
        },
        showCommonSuccess: true,
        commonSuccess: resetFormMsg.retypePasswordLetter
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map