import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import confirmEmailRequest from 'requests/user/confirmEmailRequest'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'
import commonMsg from 'messages/commonMessages'
import confirmEmailMsg from 'messages/confirmEmailMessages'

/** Функция возвращает конфигурацию формы подтверждения почты */
export default function getConfirmEmailFormConfig() {
    const config: FCType.Config = {
        fields: {
            token: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string().required(commonMsg.requiredField)
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
        async requestFn(readyFieldValues) {
            // @ts-ignore
            return await confirmEmailRequest(readyFieldValues.token)
        },
        afterSubmit(response, outerFns, formDetails) {
            if (response.status === 'success') {
                // @ts-ignore
                const email = response.data.user.email
                store.dispatch(actions.user.setUserData('success', email))

                // Перебросить в редактор
                if ('history' in outerFns ) outerFns.history.push('/')

                // Smooth hide entrance forms wrapper and show the editor
                smoothMoveToEditor()
            }
        }
    }

    return config
}
