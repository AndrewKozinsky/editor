// @ts-ignore
import * as yup from 'yup'
import { commonMessages } from 'src/messages/commonMessages'
import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
import ErrorServerResponseType from 'src/requests/errorServerResponseType'
import UserServerResponseType from 'src/requests/user/userServerResponseType'
import FHTypes from 'src/libs/formHandler/types'
import { resetFormMessages } from 'src/messages/resetFormMessages'
import resetPasswordRequest from 'src/requests/user/resetPasswordRequest'


function createFormConfig(setEmail: any, setShowSuccessMessage: any) {
    const emailField: UniversalAuthFormConfigType.Field = {
        label: resetFormMessages.emailField,
        autocomplete: 'email',
        placeholder: commonMessages.emailPlaceholder,
        autoFocus: true,
        schema: () => {
            return yup.string()
                .required(commonMessages.requiredField)
                .email(commonMessages.emailErrInvalid)
        }
    }

    const formConfig: UniversalAuthFormConfigType.Config = {
        fields: {
            email: emailField
        },
        submit: {
            text: resetFormMessages.submitBtnText,
        },
        requestFn: async (readyFieldValues) => {
            // @ts-ignore
            return await resetPasswordRequest(readyFieldValues.email)
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
            setEmail(formState.fields['email'].value[0])
            setShowSuccessMessage(true)
        }
    }
}

export default createFormConfig


