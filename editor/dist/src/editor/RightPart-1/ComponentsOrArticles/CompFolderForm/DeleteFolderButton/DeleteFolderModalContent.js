import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import getConfig from './formConfig';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function ModalContent() {
    // Сообщения формы
    const compFolderFormMsg = useGetMessages(componentFolderFormMessages);
    const config = getConfig(compFolderFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: compFolderFormMsg.deleteFolderConfirmationHeaderInModal, text: compFolderFormMsg.deleteFolderConfirmationTextInModal, bottomElems: [React.createElement(FormConstructor, { config: config, state: formState, key: 1 })] }));
}
//# sourceMappingURL=DeleteFolderModalContent.js.map