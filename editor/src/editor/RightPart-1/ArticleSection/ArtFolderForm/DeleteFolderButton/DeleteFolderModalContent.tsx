import React from 'react'
import articleFolderFormMsg from 'messages/articleFolderFormMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import deleteFolderArtFormConfig from './deleteFolderArtFormConfig'

/** Содержимое модального окна с вопросом удалить ли статью */
export default function DeleteFolderModalContent() {
    const formState = useFormConstructorState(deleteFolderArtFormConfig)

    return (
        <ModalShortContent
            header={articleFolderFormMsg.deleteFolderConfirmationHeaderInModal}
            text={articleFolderFormMsg.deleteFolderConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteFolderArtFormConfig} state={formState} key='1' />]
            }
        />
    )
}
