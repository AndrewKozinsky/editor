import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { regFormMessages } from 'messages/regFormMessages'
import { commonMessages } from 'messages/commonMessages'
import regRequest from 'src/requests/user/regRequest'


const config: FCType.Config = {
    fields: {
        email: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .email(regFormMessages.emailErrInvalid)
                    .max(100, commonMessages.emailToLong)
            },
            fieldData: {
                label: regFormMessages.emailField,
                autocomplete: 'username',
                placeholder: commonMessages.emailPlaceholder,
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
                label: regFormMessages.passwordField,
                type: 'password',
                autocomplete: 'new-password',
            }
        },
        passwordConfirm: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .oneOf([fields.password.value[0]], regFormMessages.passwordsMustMatch)
            },
            fieldData: {
                label: regFormMessages.passwordConfirmField,
                type: 'password',
                autocomplete: 'new-password',
            }
        },
    },
    bottom: {
        submit: {
            text: regFormMessages.submitBtnText,
            big: true,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues) {
        // @ts-ignore
        return await regRequest(readyFieldValues)
    },
    afterSubmit(response) {
        console.log(response)
    },
    showCommonSuccess: true,
    commonSuccess: regFormMessages.confirmRegistrationLetter
}


export default config