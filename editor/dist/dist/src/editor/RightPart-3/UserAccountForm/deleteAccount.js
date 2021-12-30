import React from 'react';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import useGetMessages from 'messages/fn/useGetMessages';
import getSubmitBtnFormConfig from './submitBtnFormConfig';
/* Модальное окно с подтверждением удаления учётной записи */
export function ModalContent() {
    const userAccountSectionMsg = useGetMessages(userAccountSectionMessages);
    const submitBtnFormConfig = getSubmitBtnFormConfig(userAccountSectionMsg);
    const formState = useFormConstructorState(submitBtnFormConfig);
    return (React.createElement(ModalShortContent, { header: userAccountSectionMsg.confirmModalHeader, text: userAccountSectionMsg.confirmModalText, bottomElems: [React.createElement(FormConstructor, { config: submitBtnFormConfig, state: formState, key: '1' })] }));
}
//# sourceMappingURL=deleteAccount.js.map
//# sourceMappingURL=deleteAccount.js.map