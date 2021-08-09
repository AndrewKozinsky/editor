import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import changePasswordRequest from 'requests/user/changePasswordRequest'
import { commonMessages } from 'messages/commonMessages'
import { changePasswordSectionMessages } from '../../../messages/changePasswordSectionMessages'

const config: FCType.Config = {
    fields: {
        currentPassword: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .min(6, commonMessages.passwordToShort)
                    .max(50, commonMessages.passwordToLong)
            },
            fieldData: {
                label: changePasswordSectionMessages.currentPasswordField,
                type: 'password',
                maxWidth: 250,
                autocomplete: 'current-password'
            }
        },
        newPassword: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(commonMessages.requiredField)
                    .min(6, commonMessages.passwordToShort)
                    .max(50, commonMessages.passwordToLong)
            },
            fieldData: {
                label: changePasswordSectionMessages.newPasswordField,
                type: 'password',
                maxWidth: 250,
                autocomplete: 'new-password'
            }
        },
        newPasswordAgain: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .oneOf([fields.newPassword.value[0]], changePasswordSectionMessages.passwordsMustMatch)
            },
            fieldData: {
                label: changePasswordSectionMessages.newPasswordAgainField,
                type: 'password',
                maxWidth: 250,
                autocomplete: 'new-password'
            }
        },
    },
    bottom: {
        submit: {
            text: changePasswordSectionMessages.submitBtnText
        },
        align: 'left',
        topOffset: 'small'
    },
    async requestFn(readyFieldValues) {
        const currentPassword = readyFieldValues.currentPassword.toString()
        const newPassword = readyFieldValues.newPassword.toString()
        return await changePasswordRequest(currentPassword, newPassword)
    },
    showCommonSuccess: true,
    commonSuccess: changePasswordSectionMessages.passwordHasChanged
}

export default config