import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import { useGetModalClasses, getCloseBtnText, useGetIsModalOpen } from './Modal-func'
import Button from 'common/formElements/Button/Button';
import Wrapper from 'common/Wrapper/Wrapper';
import { useGetModalCloseHandler } from 'utils/MiscUtils';
import './Modal.scss'


/** Модальное окно */
export default function Modal() {

    // Содержимое модального окна
    const { content } = useSelector((store: AppState) => store.modal)

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Размер элементов интерфейса из Хранилища
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    // Обработчик закрытия модального окна
    const onModalClose = useGetModalCloseHandler()

    // Открыто ли модальное окно
    const isOpen = useGetIsModalOpen()

    const CN = 'modal'

    // Классы обёртки
    const modalClasses = useGetModalClasses(CN, editorSize)

    // Ничего не отрисовывать если модальное окно закрыто
    if (!isOpen) return null

    return (
        <div className={`${CN}__outer-wrapper`}>
            <div className={modalClasses}>
                <Wrapper align='right' b={15}>
                    <Button
                        text={getCloseBtnText(lang)}
                        relativeSize={-1}
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