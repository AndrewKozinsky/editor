import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import { commonMessages } from 'messages/commonMessages'
import { resetFormMessages } from 'src/messages/resetFormMessages'
import resetPasswordRequest from 'src/requests/user/resetPasswordRequest'


const config: FCType.Config = {
    fields: {
        email: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .email(commonMessages.emailErrInvalid)
            },
            fieldData: {
                label: resetFormMessages.emailField,
                autocomplete: 'email',
                placeholder: commonMessages.emailPlaceholder,
                autoFocus: true,
            }
        },
    },
    bottom: {
        submit: {
            text: resetFormMessages.submitBtnText,
            big: true,
            block: true,
            align: 'center',
            color: 'accent'
        },
    },
    async requestFn(readyFieldValues) {
        // @ts-ignore
        return await resetPasswordRequest(readyFieldValues.email)
    },
    afterSubmit(response) {

    },
    hideAfterSuccessfulSubmit: true
}


export default config