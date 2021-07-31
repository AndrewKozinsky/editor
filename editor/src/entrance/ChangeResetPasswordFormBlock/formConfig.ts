// @ts-ignore
import * as yup from 'yup'
import { commonMessages } from 'src/messages/commonMessages'
import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
import ErrorServerResponseType from 'src/requests/errorServerResponseType'
import UserServerResponseType from 'src/requests/user/userServerResponseType'
import FHTypes from 'src/libs/formHandler/types'
import { changeResetPasswordFormMessages } from 'src/messages/changeResetPasswordFormMessages'
import changeResetPasswordRequest from 'src/requests/user/changeResetPasswordRequest'


function createFormConfig(setShowSuccessMessage: any) {
    const tokenField: UniversalAuthFormConfigType.Field = {
        label: changeResetPasswordFormMessages.tokenField,
        autoFocus: true,
        schema: () => {
            return yup.string().required(commonMessages.requiredField)
        }
    }
    const passField: UniversalAuthFormConfigType.Field = {
        label: changeResetPasswordFormMessages.passwordField,
        type: 'password',
        autocomplete: 'new-password',
        schema: () => {
            return yup.string()
                .required(commonMessages.requiredField)
                .min(6, commonMessages.passwordToShort)
                .max(50, commonMessages.passwordToLong)
        }
    }
    const passConfField: UniversalAuthFormConfigType.Field = {
        label: changeResetPasswordFormMessages.passwordConfirmField,
        type: 'password',
        autocomplete: 'new-password',
        schema: (fields) => {
            return yup.string()
                .oneOf([fields.password.value[0]], changeResetPasswordFormMessages.passwordsMustMatch)
        }
    }

    const formConfig: UniversalAuthFormConfigType.Config = {
        fields: {
            token: tokenField,
            password: passField,
            passwordConfirm: passConfField
        },
        submit: {
            text: changeResetPasswordFormMessages.submitBtnText,
        },
        requestFn: async (readyFieldValues) => {
            // @ts-ignore
            return await changeResetPasswordRequest(
                readyFieldValues.password.toString(),
                readyFieldValues.passwordConfirm.toString(),
                readyFieldValues.token.toString()
            )
        },
        hideFormAfterSuccessfulSubmit: true,
        afterSubmit: afterFormSubmit
    }

    return formConfig

    function afterFormSubmit(
        response: ErrorServerResponseType | UserServerResponseType,
        formState: FHTypes.FormState
    ) {
        if (response.status === 'success') {
            setShowSuccessMessage(true)
        }
    }
}

export default createFormConfig


