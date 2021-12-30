import React from 'react';
import useGetModalSelectors from 'store/modal/modalSelectors';
import useMakeClasses from './Modal-classes';
import { useGetIsModalOpen, useGetModalCloseHandler } from './Modal-func';
import Button from 'common/formElements/Button/Button';
/** Модальное окно */
export default function Modal() {
    // Содержимое модального окна
    const { content } = useGetModalSelectors();
    // Обработчик закрытия модального окна
    const onModalClose = useGetModalCloseHandler();
    // Открыто ли модальное окно
    const isOpen = useGetIsModalOpen();
    const CN = useMakeClasses();
    // Ничего не отрисовать если модальное окно закрыто
    if (!isOpen)
        return null;
    return (React.createElement("div", { className: CN.outerWrapper, onClickCapture: (e) => onModalClose(e) }, React.createElement("div", { className: CN.root }, React.createElement(Button, { icon: 'btnSignClose', onClick: onModalClose, autoFocus: true, extraClass: CN.closeBtn, id: 'modal-close-btn' }), content)));
}
//# sourceMappingURL=Modal.js.map
//# sourceMappingURL=Modal.js.map