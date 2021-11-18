import React from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import { siteTemplateSectionMessages } from 'messages/siteTemplateSectionMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import getConfig from './formConfig'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function ModalContent() {

    // Сообщения формы
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages)

    const config = getConfig(siteTemplateSectionMsg)
    const formState = useFormConstructorState(config)

    return (
        <>
            <p>{siteTemplateSectionMsg.deleteConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10}>
                <FormConstructor config={config} state={formState} />
            </Wrapper>
        </>
    )
}
