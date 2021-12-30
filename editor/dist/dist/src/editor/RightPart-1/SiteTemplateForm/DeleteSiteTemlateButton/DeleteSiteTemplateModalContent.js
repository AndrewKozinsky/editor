import React from 'react';
import { siteTemplateSectionMessages } from 'messages/siteTemplateSectionMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import getConfig from './formConfig';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function ModalContent() {
    // Сообщения формы
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages);
    const config = getConfig(siteTemplateSectionMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: 'Header', text: siteTemplateSectionMsg.deleteConfirmationTextInModal, bottomElems: [React.createElement(FormConstructor, { config: config, state: formState })] }));
}
//# sourceMappingURL=DeleteSiteTemplateModalContent.js.map
//# sourceMappingURL=DeleteSiteTemplateModalContent.js.map