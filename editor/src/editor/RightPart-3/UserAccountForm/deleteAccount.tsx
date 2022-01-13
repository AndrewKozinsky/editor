import React from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import userAccountSectionMsg from 'messages/userAccountSectionMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import submitBtnFormConfig from './submitBtnFormConfig'

/* Модальное окно с подтверждением удаления учётной записи */
export default function DeleteAccountModalContent() {
    const formState = useFormConstructorState(submitBtnFormConfig)

    return (
        <ModalShortContent
            header={userAccountSectionMsg.confirmModalHeader}
            text={userAccountSectionMsg.confirmModalText}
            bottomElems={
                [<FormConstructor config={submitBtnFormConfig} state={formState} key='1' />]
            }
        />
    )
}
