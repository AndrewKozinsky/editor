import React, {useCallback} from 'react'
import Button from 'common/formElements/Button/Button'
import useGetMessages from 'messages/fn/useGetMessages'
import {siteSectionMessages} from 'messages/siteSectionMessages'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'

/** Кнопка закрытия модального окна подтверждения удаления сайта */
export default function CloseModalButton() {
    // Сообщения формы
    const siteSectionMsg = useGetMessages(siteSectionMessages)

    // Обработчики нажатия на кнопки закрытия окна и удаления сайта
    const closeModal = useGetCloseModal()

    return (
        <Button
            text={siteSectionMsg.closeDeleteSiteModalBtn}
            onClick={closeModal}
        />
    )
}

/* Хук возвращает функцию закрывающую модальное окно с вопросом удалить ли сайт */
export function useGetCloseModal() {
    const dispatch = useDispatch()

    return useCallback(function () {
        dispatch(actions.modal.closeModal())
    }, [])
}
