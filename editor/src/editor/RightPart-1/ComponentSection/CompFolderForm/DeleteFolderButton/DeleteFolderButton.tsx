import React from 'react'
import Button from 'src/common/formElements/Button/Button'
import componentFolderFormMsg from 'src/messages/componentFolderFormMessages'
import DeleteFolderModalContent from './DeleteFolderModalContent'
import useGetShowModal from 'src/utils/hooksUtils'


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
