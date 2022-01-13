import React from 'react'
import useGetShowModal from 'utils/hooksUtils'
import Button from 'common/formElements/Button/Button'
import { DeleteComponentModalContent } from './DeleteComponentModalContent'
import componentFormMsg from 'messages/componentTemplateFormMessages'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteComponentButton() {
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
