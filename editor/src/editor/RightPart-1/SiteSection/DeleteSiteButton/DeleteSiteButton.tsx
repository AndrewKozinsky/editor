import React from 'react'
import Button from 'common/formElements/Button/Button'
import siteSectionMsg from 'messages/groupSectionMessages'
import DeleteSiteModalContent from './DeleteSiteModalContent'
import useGetShowModal from 'utils/hooksUtils'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteSiteButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteConfirmation = useGetShowModal(<DeleteSiteModalContent />)

    return (
        <Button
            type='button'
            text={siteSectionMsg.deleteSiteBtnText}
            icon='btnSignTrash'
            onClick={openDeleteSiteConfirmation}
        />
    )
}
