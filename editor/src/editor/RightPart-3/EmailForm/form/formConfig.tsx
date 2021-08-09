import React from 'react'
//@ts-ignore
import * as yup from 'yup'
import FCType from 'src/libs/FormConstructor/FCType'
import store from 'src/store/store'
import { userDataSectionMessages } from 'src/messages/userDataSectionMessages'
import actions from 'store/rootAction'
import ModalContent from '../modal/ModalContent'


const config: FCType.Config = {
    fields: {
        email: {
            fieldType: 'text',
            schema: (fields) => {
                return yup.string()
                    .required(userDataSectionMessages.requiredField)
                    .email(userDataSectionMessages.emailErrInvalid)
                    .max(100, userDataSectionMessages.emailIsTooLong)
            },
            fieldData: {
                label: userDataSectionMessages.emailField,
                placeholder: userDataSectionMessages.emailPlaceholder,
                maxWidth: 250,
            }
        }
    },
    bottom: {
        topOffset: 'small',
        submit: {
            text: userDataSectionMessages.submitBtnText,
        },
        align: 'left'
    },
    afterSubmit(response, outerFns, formDetails) {
        const newEmail = formDetails.readyFieldValues.email.toString()
        store.dispatch( actions.modal.openModal(<ModalContent newEmail={newEmail}/>) )
    },
}

export default config