import React from 'react'
import Button from 'common/formElements/Button/Button'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
// import DeleteMetaModalContent from './DeleteSiteTemplateModalContent'
// import useGetShowModal from 'utils/hooksUtils'


/** Кнопка удаления сайта открывающая модальное окно подтверждения */
export default function DeleteMetaTemplateButton() {
    // Хук возвращает функцию открывающую модальное окно с подтверждением удаления сайта
    // const openDeleteSiteTemplateConfirmation = useGetShowModal(<DeleteMetaModalContent />)

    return (
        <Button
            type='button'
            text={metaTemplateSectionMsg.deleteMetaTemplateBtnText}
            icon='btnSignTrash'
            // onClick={openDeleteSiteTemplateConfirmation}
        />
    )
}
