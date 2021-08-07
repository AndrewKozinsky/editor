import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { commonMessages } from 'messages/commonMessages'
import { enterFormMessages } from 'src/messages/enterFormMessages'
import loginRequest from 'src/requests/user/loginRequest'
import actions from 'src/store/rootAction'
import store from 'src/store/store'
import { smoothMoveToEditor } from '../EntrancePages/EntrancePages-func'


const config: FCType.Config = {
    fields: {
        email: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .email(enterFormMessages.emailErrInvalid)
                    .max(100, commonMessages.emailToLong)
            },
            fieldData: {
                label: enterFormMessages.emailField,
                autocomplete: 'email',
                placeholder: commonMessages.emailPlaceholder,
                autoFocus: 500,
            }
        },
        password: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .min(6, commonMessages.passwordToShort)
                    .max(50, commonMessages.passwordToLong)
            },
            fieldData: {
                label: enterFormMessages.passwordField,
                type: 'password',
                autocomplete: 'current-password',
            }
        }
    },
    bottom: {
        submit: {
            text: enterFormMessages.submitBtnText,
            big: true,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues) {
        // @ts-ignore
        return await loginRequest(readyFieldValues)
    },
    afterSubmit(response, outerFns, formDetails) {
        if (response.status === 'success') {

            // Поставить токен авторизации в Хранилище
            store.dispatch(actions.user.setAuthTokenStatus(2))

            // Перебросить в редактор
            if ('history' in outerFns ) {
                outerFns.history.push('/')
            }

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
    hideAfterSuccessfulSubmit: true
}


export default config