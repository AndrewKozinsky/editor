import React from 'react'
import metaTemplateSectionMsg from 'messages/metaTemplateSectionMessages'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import deleteMetaTemplateModalConfig from './formConfig'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export default function DeleteMetaModalContent() {
    const formState = useFormConstructorState(deleteMetaTemplateModalConfig)

    return (
        <ModalShortContent
            header={metaTemplateSectionMsg.deleteConfirmationHeaderInModal}
            text={metaTemplateSectionMsg.deleteConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteMetaTemplateModalConfig} state={formState} key='1' />]
            } />
    )
}
