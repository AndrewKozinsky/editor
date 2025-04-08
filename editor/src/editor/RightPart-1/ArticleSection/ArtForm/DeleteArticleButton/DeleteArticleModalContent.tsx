import React from 'react'
import FormConstructor from 'libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'libs/FormConstructor/state/useFormConstructorState'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import articleFormMsg from 'messages/articleFormMessages'
import deleteArticleModalConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteArticleModalContent() {
    const formState = useFormConstructorState(deleteArticleModalConfig)

    return (
        <ModalShortContent
            header={articleFormMsg.deleteArticleConfirmationHeaderInModal}
            text={articleFormMsg.deleteArticleConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteArticleModalConfig} state={formState} key='1' />]
            }
        />
    )
}
