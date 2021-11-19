import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'
import Button from 'common/formElements/Button/Button'
import useGetMessages from 'messages/fn/useGetMessages'
import { componentFolderFormMessages } from 'messages/componentFolderFormMessages'


export default function CloseModalButton() {
    // Сообщения формы
    const compFolderFormMsg = useGetMessages(componentFolderFormMessages)

    // Обработчики нажатия на кнопки закрытия окна и удаления сайта
    const closeModal = useGetCloseModal()

    return (
        <Button
            text={compFolderFormMsg.closeDeleteFolderModalBtn}
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
