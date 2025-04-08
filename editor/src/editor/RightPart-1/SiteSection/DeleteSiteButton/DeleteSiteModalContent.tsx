import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import siteSectionMsg from 'messages/groupSectionMessages'
import deleteSiteFormConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли сайт и кнопками отмены и удаления */
export default function DeleteSiteModalContent() {
    const formState = useFormConstructorState(deleteSiteFormConfig)

    return (
        <ModalShortContent
            header={siteSectionMsg.deleteSiteModalHeader}
            text={siteSectionMsg.deleteSiteConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteSiteFormConfig} state={formState} key='1' />]
            }
        />
    )
}
