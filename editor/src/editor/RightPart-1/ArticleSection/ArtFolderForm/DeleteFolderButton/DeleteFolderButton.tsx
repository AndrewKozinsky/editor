import React from 'react'
import Button from 'common/formElements/Button/Button'
import useGetShowModal from 'utils/hooksUtils'
import articleFolderFormMsg from 'messages/articleFolderFormMessages'
import DeleteFolderModalContent from './DeleteFolderModalContent'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteFolderButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteTemplateConfirmation = useGetShowModal(<DeleteFolderModalContent />)

    return (
        <Button
            type='button'
            text={articleFolderFormMsg.deleteFolderBtnText}
            icon='btnSignTrash'
            onClick={openDeleteSiteTemplateConfirmation}
        />
    )
}
