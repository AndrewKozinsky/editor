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
import * as yup from 'yup';
import regRequest from 'requests/user/regRequest';
/**
 * Функция возвращает конфигурацию формы регистрации
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} regFormMsg — объект с текстами ошибок
 */
export default function getConfig(commonMsg, regFormMsg) {
    const config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(regFormMsg.emailErrInvalid)
                        .max(100, commonMsg.emailToLong);
                },
                fieldData: {
                    label: regFormMsg.emailField,
                    autocomplete: 'username',
                    placeholder: commonMsg.emailPlaceholder,
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
                    label: regFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
            passwordConfirm: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.password.value[0]], regFormMsg.passwordsMustMatch);
                },
                fieldData: {
                    label: regFormMsg.passwordConfirmField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
        },
        bottom: {
            submit: {
                text: regFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield regRequest(readyFieldValues);
            });
        },
        afterSubmit(response) { },
        showCommonSuccess: true,
        commonSuccess: regFormMsg.confirmRegistrationLetter
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map