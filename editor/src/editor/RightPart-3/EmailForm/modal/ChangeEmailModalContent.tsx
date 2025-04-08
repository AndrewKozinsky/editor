import React from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import userDataSectionMsg from 'messages/userDataSectionMessages'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import getSubmitBtnFormConfig from './submitBtnFormConfig'

type ModalContentPropType = {
    newEmail: string
}

/** Содержимое модального окна смены почты пользователя */
export default function ChangeEmailModalContent(props: ModalContentPropType) {
    const { newEmail } = props

    const submitBtnFormConfig = getSubmitBtnFormConfig()
    const formState = useFormConstructorState(
        submitBtnFormConfig,
        {newEmail}
    )

    return (
        <ModalShortContent
            header={userDataSectionMsg.confirmModalHeader}
            text={userDataSectionMsg.confirmModalText}
            bottomElems={
                [<FormConstructor config={submitBtnFormConfig} state={formState} key='1' />]
        }
        />
    )
}
