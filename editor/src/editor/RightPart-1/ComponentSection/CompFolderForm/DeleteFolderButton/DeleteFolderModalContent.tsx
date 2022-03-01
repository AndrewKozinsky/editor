import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import componentFolderFormMsg from 'messages/componentFolderFormMessages'
import deleteFolderFormConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли папку */
export default function DeleteFolderModalContent() {
    const formState = useFormConstructorState(deleteFolderFormConfig)

    return (
        <ModalShortContent
            header={componentFolderFormMsg.deleteFolderConfirmationHeaderInModal}
            text={componentFolderFormMsg.deleteFolderConfirmationTextInModal}
            bottomElems={[
                <FormConstructor config={deleteFolderFormConfig} state={formState} key='1' />
            ]}
        />
    )
}
