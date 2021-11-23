import React from 'react'
import useGetMessages from 'messages/fn/useGetMessages'
import {componentFormMessages} from 'messages/componentTemplateFormMessages'
// import useGetMessages from 'messages/fn/useGetMessages'
// import {componentFolderFormMessages} from 'messages/componentFolderFormMessages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteComponentModalContent() {

    // Сообщения формы
    const componentFormMsg = useGetMessages(componentFormMessages)

    const config = getConfig(componentFormMsg)
    const formState = useFormConstructorState(config)

    return (
        <>
            <p>{componentFormMsg.deleteComponentConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10}>
                <FormConstructor config={config} state={formState} />
            </Wrapper>
        </>
    )
}
