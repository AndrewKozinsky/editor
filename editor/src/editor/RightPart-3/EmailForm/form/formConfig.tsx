import React from 'react'
import * as yup from 'yup'
import FCType from 'libs/FormConstructor/FCType'
import userDataSectionMsg from 'messages/userDataSectionMessages'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import ChangeEmailModalContent from '../modal/ChangeEmailModalContent'

/** Функция возвращает конфигурацию формы изменения почты пользователя */
export default function getEmailFormConfig() {
    const config: FCType.Config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(userDataSectionMsg.requiredField)
                        .email(userDataSectionMsg.emailErrInvalid)
                        .max(100, userDataSectionMsg.emailIsTooLong)
                },
                fieldData: {
                    label: userDataSectionMsg.emailField,
                    placeholder: userDataSectionMsg.emailPlaceholder,
                    maxWidth: 250,
                }
            }
        },
        bottom: {
            submit: {
                text: userDataSectionMsg.submitBtnText,
            },
            align: 'left'
        },
        afterSubmit(response, outerFns, formDetails) {
            const newEmail = formDetails.readyFieldValues.email.toString()
            store.dispatch( actions.modal.openModal({
                content: <ChangeEmailModalContent newEmail={newEmail}/>
            }))
        },
    }

    return config
}
