import React from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import submitBtnFormConfig from './submitBtnFormConfig'
import { userAccountSectionMessages } from 'messages/userAccountSectionMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


export function ModalContent() {
    const formState = useFormConstructorState(submitBtnFormConfig)

    return (
        <ModalShortContent
            header={userAccountSectionMessages.confirmModalHeader}
            text={userAccountSectionMessages.confirmModalText}
            bottomElem={
                <FormConstructor config={submitBtnFormConfig} state={formState} />
            }
        />
    )
}
