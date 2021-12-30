import React from 'react';
import Button from 'src/common/formElements/Button/Button';
import DeleteSiteModalContent from './DeleteSiteModalContent';
import useGetShowModal from 'utils/hooksUtils';
import useGetMessages from 'messages/fn/useGetMessages';
import { siteSectionMessages } from 'messages/siteSectionMessages';
/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteSiteButton() {
    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages);
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteConfirmation = useGetShowModal(React.createElement(DeleteSiteModalContent, null));
    return (React.createElement(Button, { type: 'button', text: siteSectionMsg.deleteSiteBtnText, icon: 'btnSignTrash', onClick: openDeleteSiteConfirmation }));
}
//# sourceMappingURL=DeleteSiteButton.js.map