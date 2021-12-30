import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import getConfig from './formConfig';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function ModalContent() {
    // Сообщения формы
    const artFolderFormMsg = useGetMessages(articleFolderFormMessages);
    const config = getConfig(artFolderFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: artFolderFormMsg.deleteFolderConfirmationHeaderInModal, text: artFolderFormMsg.deleteFolderConfirmationTextInModal, bottomElems: [React.createElement(FormConstructor, { config: config, state: formState, key: 1 })] }));
}
//# sourceMappingURL=DeleteFolderModalContent.js.map
//# sourceMappingURL=DeleteFolderModalContent.js.map