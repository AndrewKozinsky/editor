import React from 'react';
import useGetShowModal from 'utils/hooksUtils';
import Button from 'common/formElements/Button/Button';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleFormMessages } from 'messages/articleFormMessages';
import { DeleteArticleModalContent } from './DeleteArticleModalContent';
/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteArticleButton() {
    // Сообщения
    const articleFormMsg = useGetMessages(articleFormMessages);
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteArticleConfirmation = useGetShowModal(React.createElement(DeleteArticleModalContent, null));
    return (React.createElement(Button, { type: 'button', text: articleFormMsg.deleteArticleBtnText, icon: 'btnSignTrash', onClick: openDeleteArticleConfirmation }));
}
//# sourceMappingURL=DeleteArticleButton.js.map