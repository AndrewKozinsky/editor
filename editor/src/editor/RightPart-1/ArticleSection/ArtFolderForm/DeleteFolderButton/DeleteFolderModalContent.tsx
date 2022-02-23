import React from 'react'
import articleFolderFormMsg from 'src/messages/articleFolderFormMessages'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import deleteFolderArtFormConfig from './deleteFolderArtFormConfig'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import ModalShortContent from 'src/common/modalEntities/ModalShortContent/ModalShortContent'

/** Содержимое модального окна с вопросом удалить ли статью */
export default function DeleteFolderModalContent() {
    const formState = useFormConstructorState(deleteFolderArtFormConfig)

    return (
        <ModalShortContent
            header={articleFolderFormMsg.deleteFolderConfirmationHeaderInModal}
            text={articleFolderFormMsg.deleteFolderConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteFolderArtFormConfig} state={formState} key={1} />]
            }
        />
    )
}
