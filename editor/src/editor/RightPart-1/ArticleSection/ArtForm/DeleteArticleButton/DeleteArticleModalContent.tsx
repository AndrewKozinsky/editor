import React from 'react'
import FormConstructor from 'src/libs/FormConstructor/FormConstructor'
import useFormConstructorState from 'src/libs/FormConstructor/state/useFormConstructorState'
import ModalShortContent from 'src/common/modalEntities/ModalShortContent/ModalShortContent'
import articleFormMsg from 'src/messages/articleFormMessages'
import deleteArticleModalConfig from './formConfig'


/** Содержимое модального окна с вопросом удалить ли шаблон сайта и кнопками отмены и удаления */
export function DeleteArticleModalContent() {
    const formState = useFormConstructorState(deleteArticleModalConfig)

    return (
        <ModalShortContent
            header={articleFormMsg.deleteArticleConfirmationHeaderInModal}
            text={articleFormMsg.deleteArticleConfirmationTextInModal}
            bottomElems={
                [<FormConstructor config={deleteArticleModalConfig} state={formState} key={1} />]
            }
        />
    )
}
