import React from 'react';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleFormMessages } from 'messages/articleFormMessages';
import FormConstructor from 'libs/FormConstructor/FormConstructor';
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import getConfig from './formConfig';
/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteArticleModalContent() {
    // Сообщения формы
    const articleFormMsg = useGetMessages(articleFormMessages);
    const config = getConfig(articleFormMsg);
    const formState = useFormConstructorState(config);
    return (React.createElement(ModalShortContent, { header: articleFormMsg.deleteArticleConfirmationHeaderInModal, text: articleFormMsg.deleteArticleConfirmationTextInModal, bottomElems: [
            React.createElement(FormConstructor, { config: config, state: formState, key: 1 })
        ] }));
}
//# sourceMappingURL=DeleteArticleModalContent.js.map
//# sourceMappingURL=DeleteArticleModalContent.js.map