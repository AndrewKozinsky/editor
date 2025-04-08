import React from 'react'
import Button from 'common/formElements/Button/Button'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import DeleteSiteTemplateModalContent from './DeleteSiteTemplateModalContent'
import useGetShowModal from 'utils/hooksUtils'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteSiteTemplateButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    const openDeleteSiteTemplateConfirmation = useGetShowModal(<DeleteSiteTemplateModalContent />)

    return (
        <Button
            type='button'
            text={siteTemplateSectionMsg.deleteSiteTemplateBtnText}
            icon='btnSignTrash'
            onClick={openDeleteSiteTemplateConfirmation}
        />
    )
}
