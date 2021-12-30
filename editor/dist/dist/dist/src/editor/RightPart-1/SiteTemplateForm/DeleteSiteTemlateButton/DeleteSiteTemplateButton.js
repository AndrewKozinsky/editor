import React from 'react';
import Button from 'src/common/formElements/Button/Button';
import { ModalContent } from './DeleteSiteTemplateModalContent';
import useGetShowModal from 'utils/hooksUtils';
import useGetMessages from 'messages/fn/useGetMessages';
import { siteTemplateSectionMessages } from 'messages/siteTemplateSectionMessages';
/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteSiteTemplateButton() {
    // Сообщения
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages);
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteTemplateConfirmation = useGetShowModal(React.createElement(ModalContent, null));
    return (React.createElement(Button, { type: 'button', text: siteTemplateSectionMsg.deleteSiteTemplateBtnText, icon: 'btnSignTrash', onClick: openDeleteSiteTemplateConfirmation }));
}
//# sourceMappingURL=DeleteSiteTemplateButton.js.map
//# sourceMappingURL=DeleteSiteTemplateButton.js.map
//# sourceMappingURL=DeleteSiteTemplateButton.js.map