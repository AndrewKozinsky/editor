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
import changeResetPasswordRequest from 'requests/user/changeResetPasswordRequest';
/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} changeResetPasswordFormMsg — объект с текстами ошибок
 */
export default function getConfig(commonMsg, changeResetPasswordFormMsg) {
    const config = {
        fields: {
            token: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string().required(commonMsg.requiredField);
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.tokenField,
                    autoFocus: true,
                }
            },
            password: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong);
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
            passwordConfirm: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.password.value[0]], changeResetPasswordFormMsg.passwordsMustMatch);
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.passwordConfirmField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
        },
        bottom: {
            submit: {
                text: changeResetPasswordFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                return yield changeResetPasswordRequest(readyFieldValues.password.toString(), readyFieldValues.passwordConfirm.toString(), readyFieldValues.token.toString());
            });
        },
        afterSubmit(response) { },
        hideAfterSuccessfulSubmit: true
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map