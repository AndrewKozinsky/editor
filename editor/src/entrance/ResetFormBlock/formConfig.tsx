import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import resetPasswordRequest from 'requests/user/resetPasswordRequest'
import commonMsg from 'messages/commonMessages'
import resetFormMsg from 'messages/resetFormMessages'

/**
 * Функция возвращает конфигурацию формы сброса пароля
 */
export default function getResetFormConfig() {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .email(commonMsg.emailErrInvalid)
                },
                fieldData: {
                    label: resetFormMsg.emailField,
                    autocomplete: 'email',
                    placeholder: commonMsg.emailPlaceholder,
                    autoFocus: true,
                }
            },
        },
        bottom: {
            submit: {
                text: resetFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            return await resetPasswordRequest(readyFieldValues.email.toString())
        },
        afterSubmit(response) {

        },
        showCommonSuccess: true,
        commonSuccess: resetFormMsg.retypePasswordLetter
    }

    return config
}
