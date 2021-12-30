import React from 'react';
import * as yup from 'yup';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import ModalContent from '../modal/ModalContent';
// TODO Что делает эта функция?
export default function getConfig(userDataSectionMsg) {
    const config = {
        fields: {
            email: {
                fieldType: 'text',
                schema: (fields) => {
                    return yup.string()
                        .required(userDataSectionMsg.requiredField)
                        .email(userDataSectionMsg.emailErrInvalid)
                        .max(100, userDataSectionMsg.emailIsTooLong);
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
            const newEmail = formDetails.readyFieldValues.email.toString();
            store.dispatch(actions.modal.openModal({
                content: React.createElement(ModalContent, { newEmail: newEmail })
            }));
        },
    };
    return config;
}
//# sourceMappingURL=formConfig.js.map