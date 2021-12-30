import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleFolderFormMessages } from 'messages/articleFolderFormMessages';
import Button from 'common/formElements/Button/Button';
import { ModalContent } from './DeleteFolderModalContent';
import useGetShowModal from 'utils/hooksUtils';
/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteFolderButton() {
    // Сообщения
    const articleFolderFormMsg = useGetMessages(articleFolderFormMessages);
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteTemplateConfirmation = useGetShowModal(React.createElement(ModalContent, null));
    return (React.createElement(Button, { type: 'button', text: articleFolderFormMsg.deleteFolderBtnText, icon: 'btnSignTrash', onClick: openDeleteSiteTemplateConfirmation }));
}
//# sourceMappingURL=DeleteFolderButton.js.map
//# sourceMappingURL=DeleteFolderButton.js.map