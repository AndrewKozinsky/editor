import React from 'react'
import Button from 'src/common/formElements/Button/Button'
import DeleteFolderModalContent from './DeleteFolderModalContent'
import useGetShowModal from 'src/utils/hooksUtils'
import articleFolderFormMsg from 'src/messages/articleFolderFormMessages'


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
