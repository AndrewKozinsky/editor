import React from 'react'
import useGetShowModal from 'utils/hooksUtils'
import Button from 'common/formElements/Button/Button'
import useGetMessages from 'messages/fn/useGetMessages'
import {componentFormMessages} from 'messages/componentTemplateFormMessages'
import { DeleteComponentModalContent } from './DeleteComponentModalContent'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteComponentButton() {
    // Сообщения
    const componentFormMsg = useGetMessages(componentFormMessages)

    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteComponentConfirmation = useGetShowModal(<DeleteComponentModalContent />)

    return (
        <Button
            type='button'
            text={componentFormMsg.deleteComponentBtnText}
            icon='btnSignTrash'
            onClick={openDeleteComponentConfirmation}
        />
    )
}
