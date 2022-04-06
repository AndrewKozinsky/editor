import React from 'react'
import siteTemplateSectionMsg from 'messages/siteTemplateSectionMessages'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import deleteSiteTemplateModalConfig from './formConfig'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export default function DeleteSiteTemplateModalContent() {
    const formState = useFormConstructorState(deleteSiteTemplateModalConfig)

    return (
        <ModalShortContent
            header={siteTemplateSectionMsg.deleteConfirmationHeaderInModal}
            text={siteTemplateSectionMsg.deleteConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteSiteTemplateModalConfig} state={formState} key='1' />]
            } />
    )
}
