import React from 'react'
import Button from 'common/formElements/Button/Button'
import componentFolderFormMsg from 'messages/componentFolderFormMessages'
import useGetShowModal from 'utils/hooksUtils'
import DeleteFolderModalContent from './DeleteFolderModalContent'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteFolderButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления папки
    const openDeleteSiteTemplateConfirmation = useGetShowModal(<DeleteFolderModalContent />)

    return (
        <Button
            type='button'
            text={componentFolderFormMsg.deleteFolderBtnText}
            icon='btnSignTrash'
            onClick={openDeleteSiteTemplateConfirmation}
        />
    )
}
