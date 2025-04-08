import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import changeResetPasswordRequest from 'requests/user/changeResetPasswordRequest'
import changeResetPasswordFormMsg from 'messages/changeResetPasswordFormMessages'
import commonMsg from 'messages/commonMessages'


/** Функция возвращает конфигурацию формы входа в сервис */
export default function getChangeResetPasswordFormConfig() {
    const config: FCType.Config = {
        fields: {
            token: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string().required(commonMsg.requiredField)
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.tokenField,
                    autoFocus: true,
                }
            },
            password: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(commonMsg.requiredField)
                        .min(6, commonMsg.passwordToShort)
                        .max(50, commonMsg.passwordToLong)
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.passwordField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
            passwordConfirm: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .oneOf([fields.password.value[0]], changeResetPasswordFormMsg.passwordsMustMatch)
                },
                fieldData: {
                    label: changeResetPasswordFormMsg.passwordConfirmField,
                    type: 'password',
                    autocomplete: 'new-password',
                }
            },
        },
        bottom: {
            submit: {
                text: changeResetPasswordFormMsg.submitBtnText,
                big: true,
                block: true,
                align: 'center',
                color: 'accent'
            },
        },
        async requestFn(readyFieldValues) {
            return await changeResetPasswordRequest(
                readyFieldValues.password.toString(),
                readyFieldValues.passwordConfirm.toString(),
                readyFieldValues.token.toString()
            )
        },
        afterSubmit(response) {},
        hideAfterSuccessfulSubmit: true
    }

    return config
}
