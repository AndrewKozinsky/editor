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
import confirmEmailRequest from 'requests/user/confirmEmailRequest';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func';
/**
 * Функция возвращает конфигурацию формы подтверждения почты
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} confirmEmailMsg — объект с текстами ошибок
 */
export default function getConfig(commonMsg, confirmEmailMsg) {
    const config = {
        fields: {
            token: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string().required(commonMsg.requiredField);
                },
                fieldData: {
                    autoFocus: true,
                    label: confirmEmailMsg.tokenField,
                }
            },
        },
        bottom: {
            submit: {
                text: confirmEmailMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        requestFn(readyFieldValues) {
            return __awaiter(this, void 0, void 0, function* () {
                // @ts-ignore
                return yield confirmEmailRequest(readyFieldValues.token);
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
        }
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map