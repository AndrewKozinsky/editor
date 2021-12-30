import React from 'react';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import useGetMessages from 'messages/fn/useGetMessages';
import { componentFormMessages } from 'messages/componentTemplateFormMessages';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import getConfig from './formConfig';
/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteComponentModalContent() {
    // Сообщения формы
    const componentFormMsg = useGetMessages(componentFormMessages);
    const config = getConfig(componentFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: componentFormMsg.deleteComponentConfirmationHeaderInModal, text: componentFormMsg.deleteComponentConfirmationTextInModal, bottomElems: [React.createElement(FormConstructor, { config: config, state: formState, key: 1 })] }));
}
//# sourceMappingURL=DeleteComponentModalContent.js.map
//# sourceMappingURL=DeleteComponentModalContent.js.map