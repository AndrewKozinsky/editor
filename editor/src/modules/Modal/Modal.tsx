import React from 'react'
import { modalMessages } from 'messages/modalMessages'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import { useGetModalClasses, useGetIsModalOpen } from 'modules/Modal/Modal-func'
import Button from 'common/formElements/Button/Button'
import Wrapper from 'common/Wrapper/Wrapper'
import { useGetModalCloseHandler } from 'utils/MiscUtils'
import './Modal.scss'


/** Модальное окно */
export default function Modal() {

    // Содержимое модального окна
    const { content } = useSelector((store: AppState) => store.modal)

    // Обработчик закрытия модального окна
    const onModalClose = useGetModalCloseHandler()

    // Открыто ли модальное окно
    const isOpen = useGetIsModalOpen()

    const CN = 'modal'

    // Классы обёртки
    const modalClasses = useGetModalClasses(CN)

    // Ничего не отрисовывать если модальное окно закрыто
    if (!isOpen) return null

    return (
        <div className={`${CN}__outer-wrapper`}>
            <div className={modalClasses}>
                <Wrapper align='right' b={15}>
                    <Button
                        text={modalMessages.close}
                        icon='btnSignClose'
                        onClick={onModalClose}
                        autoFocus={250}
                    />
                </Wrapper>
                {content}
            </div>
        </div>
    )
}
