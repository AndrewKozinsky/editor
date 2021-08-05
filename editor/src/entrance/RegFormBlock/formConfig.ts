// @ts-ignore
// import * as yup from 'yup'
// import { commonMessages } from 'src/messages/commonMessages'
// import { regFormMessages } from 'src/messages/regFormMessages'
// import UniversalAuthFormConfigType from '../UniversalAuthForm/UniversalAuthFormConfigType'
// import regRequest from 'src/requests/user/regRequest'
// import ErrorServerResponseType from 'src/requests/errorServerResponseType'
// import UserServerResponseType from 'src/requests/user/userServerResponseType'
// import FHTypes from 'src/libs/formHandler/types'


/*function createFormConfig(setEmail: any, setShowSuccessMessage: any) {
    const emailField: UniversalAuthFormConfigType.Field = {
        label: regFormMessages.emailField,
        autocomplete: 'username',
        placeholder: commonMessages.emailPlaceholder,
        autoFocus: true,
        schema: () => {
            return yup.string()
                .required(commonMessages.requiredField)
                .email(regFormMessages.emailErrInvalid)
                .max(100, commonMessages.emailToLong)
        }
    }
    const passField: UniversalAuthFormConfigType.Field = {
        label: regFormMessages.passwordField,
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
        label: regFormMessages.passwordConfirmField,
        type: 'password',
        autocomplete: 'new-password',
        schema: (fields) => {
            return yup.string()
                .oneOf([fields.password.value[0]], regFormMessages.passwordsMustMatch)
        }
    }

    const formConfig: UniversalAuthFormConfigType.Config = {
        fields: {
            email: emailField,
            password: passField,
            passwordConfirm: passConfField
        },
        submit: {
            text: regFormMessages.submitBtnText,
        },
        requestFn: async (readyFieldValues) => {
            // @ts-ignore
            return await regRequest(readyFieldValues)
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
}*/

// export default createFormConfig
