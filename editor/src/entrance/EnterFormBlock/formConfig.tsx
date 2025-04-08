import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import commonMsg from 'messages/commonMessages'
import enterFormMsg from 'messages/enterFormMessages'
import loginRequest, { LoginRequestValuesType } from 'requests/user/loginRequest'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'

/** Функция возвращает конфигурацию формы входа в сервис */
function getEnterFormConfig() {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(enterFormMsg.emailErrInvalid)
                        .max(100, commonMsg.emailToLong)
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
                        .max(50, commonMsg.passwordToLong)
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
        async requestFn(readyFieldValues) {
            return await loginRequest(readyFieldValues as LoginRequestValuesType)
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
            else if (response.status === 'fail') {
                if (response.commonError === 'user_login_userDoesNotConfirmEmail') {
                    outerFns.setShowConfirmEmailMessage(true)
                    // Hide form
                    formDetails.setFormVisible(false)
                }
            }
        },
    }

    return config
}

export default getEnterFormConfig
