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
import loginRequest from 'requests/user/loginRequest';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func';
/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} enterFormMsg — объект с текстами ошибок
 */
function getConfig(commonMsg, enterFormMsg) {
    const config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(enterFormMsg.emailErrInvalid)
                        .max(100, commonMsg.emailToLong);
                },
                fieldData: {
                    label: enterFormMsg.emailField,
                    autocomplete: 'email',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: 500,
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
                    label: enterFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'current-password',
                }
            }
        },
        bottom: {
            submit: {
                text: enterFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield loginRequest(readyFieldValues);
            });
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                const email = response.data.user.email;
                store.dispatch(actions.user.setUserData('success', email));
                // Перебросить в редактор
                if ('history' in outerFns)
                    outerFns.history.push('/');
                // Smooth hide entrance forms wrapper and show the editor
                smoothMoveToEditor();
            }
            else if (response.status === 'fail') {
                if (response.commonError === 'user_login_userDoesNotConfirmEmail') {
                    outerFns.setShowConfirmEmailMessage(true);
                    // Hide form
                    formDetails.setFormVisible(false);
                }
            }
        },
    };
    return config;
}
export default getConfig;
//# sourceMappingURL=formConfig.js.map
//# sourceMappingURL=formConfig.js.map