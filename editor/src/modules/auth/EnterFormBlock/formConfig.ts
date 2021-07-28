import { enterFormMessages } from 'messages/enterFormMessages'
// @ts-ignore
import * as yup from 'yup'
import { commonMessages } from 'messages/commonMessages'
import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
import loginRequest from 'requests/user/loginRequest'
import ErrorServerResponseType from 'requests/errorServerResponseType'
import UserServerResponseType from 'requests/user/userServerResponseType'
import FHTypes from 'libs/formHandler/types'
import { regFormMessages } from 'messages/regFormMessages'
import { serverMessages } from 'messages/serverMessages'
import store from 'store/store'
import actions from 'store/rootAction'


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
        }
    }
}

export default createFormConfig