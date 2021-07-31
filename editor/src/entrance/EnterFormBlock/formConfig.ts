import { enterFormMessages } from 'src/messages/enterFormMessages'
// @ts-ignore
import * as yup from 'yup'
import store from 'src/store/store'
import actions from 'src/store/rootAction'
import { commonMessages } from 'src/messages/commonMessages'
import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
import loginRequest from 'src/requests/user/loginRequest'
import ErrorServerResponseType from 'src/requests/errorServerResponseType'
import UserServerResponseType from 'src/requests/user/userServerResponseType'
import FHTypes from 'src/libs/formHandler/types'
import { regFormMessages } from 'src/messages/regFormMessages'
import { serverMessages } from 'src/messages/serverMessages'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'


function createFormConfig(
    setEmail: any,
    setShowCommonError: any,
    setCommonError: any,
    setShowForm: any,
    setShowConfirmEmailMessage: any,
    history: any
) {
    const emailField: UniversalAuthFormConfigType.Field = {
        label: enterFormMessages.emailField,
        autocomplete: 'email',
        placeholder: commonMessages.emailPlaceholder,
        autoFocus: 500,
        schema: () => {
            return yup.string()
                .required(commonMessages.requiredField)
                .email(regFormMessages.emailErrInvalid)
                .max(100, commonMessages.emailToLong)
        }
    }
    const passField: UniversalAuthFormConfigType.Field = {
        label: enterFormMessages.passwordField,
        type: 'password',
        autocomplete: 'current-password',
        schema: () => {
            return yup.string()
                .required(commonMessages.requiredField)
                .min(6, commonMessages.passwordToShort)
                .max(50, commonMessages.passwordToLong)
        }
    }

    const formConfig: UniversalAuthFormConfigType.Config = {
        fields: {
            email: emailField,
            password: passField
        },
        submit: {
            text: enterFormMessages.submitBtnText,
        },
        requestFn: async (readyFieldValues) => {
            // @ts-ignore
            return await loginRequest(readyFieldValues)
        },
        afterSubmit: afterFormSubmit,
        hideCommonErrors: true
    }

    return formConfig

    function afterFormSubmit(
        response: ErrorServerResponseType | UserServerResponseType,
        formState: FHTypes.FormState
    ) {
        if (response.status === 'fail') {
            if (response.commonError === 'user_login_userDoesNotConfirmEmail') {
                setEmail(formState.fields['email'].value[0])
                setShowConfirmEmailMessage(true)
                setShowForm(false)

                setShowCommonError(false)
            }
            else {
                setShowCommonError(true)
                setCommonError(serverMessages[response.commonError])
            }
        }
        if (response.status === 'success') {
            setShowCommonError(false)

            // Поставить токен авторизации в Хранилище
            store.dispatch(actions.user.setAuthTokenStatus(2))

            // Перебросить на страницу редактора
            history.push('/')

            // Smooth hide entrance forms wrapper and show the editor
            smoothMoveToEditor()
        }
    }
}

export default createFormConfig