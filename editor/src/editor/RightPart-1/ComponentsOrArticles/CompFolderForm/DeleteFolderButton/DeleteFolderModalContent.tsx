import React from 'react'
import useGetMessages from 'messages/fn/useGetMessages'
import {componentFolderFormMessages} from 'messages/componentFolderFormMessages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import getConfig from './formConfig'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function ModalContent() {

    // Сообщения формы
    const compFolderFormMsg = useGetMessages(componentFolderFormMessages)

    const config = getConfig(compFolderFormMsg)
    const formState = useFormConstructorState(config)

    return (
        <>
            <p>{compFolderFormMsg.deleteFolderConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10}>
                <FormConstructor config={config} state={formState} />
            </Wrapper>
        </>
    )
}
