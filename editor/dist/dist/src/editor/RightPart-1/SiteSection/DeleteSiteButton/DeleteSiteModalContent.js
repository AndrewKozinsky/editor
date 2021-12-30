import React from 'react';
import { siteSectionMessages } from 'messages/siteSectionMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import getConfig from './formConfig';
/** Содержимое модального окна с вопросом удалить ли сайт и кнопками отмены и удаления */
export default function DeleteSiteModalContent() {
    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages);
    const config = getConfig(siteSectionMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: siteSectionMsg.deleteSiteModalHeader, text: siteSectionMsg.deleteSiteConfirmationTextInModal, bottomElems: [React.createElement(FormConstructor, { config: config, state: formState, key: '1' })] }));
}
//# sourceMappingURL=DeleteSiteModalContent.js.map
//# sourceMappingURL=DeleteSiteModalContent.js.map