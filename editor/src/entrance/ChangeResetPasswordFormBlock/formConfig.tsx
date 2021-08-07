import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { commonMessages } from 'messages/commonMessages'
import changeResetPasswordRequest from 'src/requests/user/changeResetPasswordRequest'
import { changeResetPasswordFormMessages } from 'src/messages/changeResetPasswordFormMessages'


const config: FCType.Config = {
    fields: {
        token: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string().required(commonMessages.requiredField)
            },
            fieldData: {
                label: changeResetPasswordFormMessages.tokenField,
                autoFocus: true,
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
                label: changeResetPasswordFormMessages.passwordField,
                type: 'password',
                autocomplete: 'new-password',
            }
        },
        passwordConfirm: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .oneOf([fields.password.value[0]], changeResetPasswordFormMessages.passwordsMustMatch)
            },
            fieldData: {
                label: changeResetPasswordFormMessages.passwordConfirmField,
                type: 'password',
                autocomplete: 'new-password',
            }
        },
    },
    bottom: {
        submit: {
            text: changeResetPasswordFormMessages.submitBtnText,
            big: true,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues) {
        // @ts-ignore
        return await changeResetPasswordRequest(
            readyFieldValues.password.toString(),
            readyFieldValues.passwordConfirm.toString(),
            readyFieldValues.token.toString()
        )
    },
    afterSubmit(response) {
        console.log(response)
    },
    hideAfterSuccessfulSubmit: true
}


export default config