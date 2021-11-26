import React from 'react'
import useGetMessages from 'messages/fn/useGetMessages'
import {articleFormMessages} from 'messages/articleFormMessages'
import Wrapper from 'common/Wrapper/Wrapper'
import Hr from 'common/misc/Hr/Hr'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import getConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteArticleModalContent() {

    // Сообщения формы
    const articleFormMsg = useGetMessages(articleFormMessages)

    const config = getConfig(articleFormMsg)
    const formState = useFormConstructorState(config)

    return (
        <>
            <p>{articleFormMsg.deleteArticleConfirmationTextInModal}</p>
            <Wrapper t={10}>
                <Hr/>
            </Wrapper>
            <Wrapper t={10}>
                <FormConstructor config={config} state={formState} />
            </Wrapper>
        </>
    )
}
