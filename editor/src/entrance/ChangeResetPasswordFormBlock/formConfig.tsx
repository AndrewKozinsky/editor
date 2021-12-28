import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import changeResetPasswordRequest from 'requests/user/changeResetPasswordRequest'

/**
 * Функция возвращает конфигурацию формы входа в сервис
 * @param {Object} commonMsg — объект с текстами ошибок
 * @param {Object} changeResetPasswordFormMsg — объект с текстами ошибок
 */
export default function getConfig(commonMsg: any,changeResetPasswordFormMsg: any) {
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
            // @ts-ignore
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
