import React from 'react'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import ModalShortContent from 'src/common/modalEntities/ModalShortContent/ModalShortContent'
import deleteFolderFormConfig from './formConfig'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import componentFolderFormMsg from 'src/messages/componentFolderFormMessages'


/** Содержимое модального окна с вопросом удалить ли папку */
export default function DeleteFolderModalContent() {
    const formState = useFormConstructorState(deleteFolderFormConfig)

    return (
        <ModalShortContent
            header={componentFolderFormMsg.deleteFolderConfirmationHeaderInModal}
            text={componentFolderFormMsg.deleteFolderConfirmationTextInModal}
            bottomElems={[
                <FormConstructor config={deleteFolderFormConfig} state={formState} key={1} />
            ]}
        />
    )
}
