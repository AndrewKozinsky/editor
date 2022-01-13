import React from 'react'
import useGetModalSelectors from 'store/modal/modalSelectors'
import useMakeClasses from './Modal-classes'
import {
    useGetIsModalOpen,
    useGetModalCloseHandler
} from './Modal-func'
import Button from 'common/formElements/Button/Button'


/** Модальное окно */
export default function Modal() {

    // Содержимое модального окна
    const { content } = useGetModalSelectors()

    // Обработчик закрытия модального окна
    const onModalClose = useGetModalCloseHandler()

    // Открыто ли модальное окно
    const isOpen = useGetIsModalOpen()

    const CN = useMakeClasses()

    // Ничего не отрисовать если модальное окно закрыто
    if (!isOpen) return null

    return (
        <div className={CN.outerWrapper} onClickCapture={(e) => onModalClose(e)}>
            <div className={CN.root}>
                <Button
                    icon='btnSignClose'
                    onClick={onModalClose}
                    autoFocus
                    extraClass={CN.closeBtn}
                    id='modal-close-btn'
                />
                {content}
            </div>
        </div>
    )
}
