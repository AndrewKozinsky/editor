import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'common/formElements/Button/Button'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import actions from 'store/rootAction'
import articleMenuMsg from 'messages/articleMenuMessages'
import { getState } from 'utils/miscUtils'
import bridge from '../../../../bridge/bridge'

/** Модальное окно с вопросом действительно ли удалить редактируемую статью */
export function DeleteArticleConfirmModal() {
    const dispatch = useDispatch()

    // Функция удаляющая выделенную папку
    const deleteArticle = useCallback(async function () {
        const { articleId } = getState().article

        await bridge.deleteResource('articles', 'file', articleId)

        // Закрыть модальное окно
        dispatch(actions.modal.closeModal())
    }, [])

    return (
        <ModalShortContent
            header={articleMenuMsg.deleteModalHeader}
            text={articleMenuMsg.deleteModalText}
            bottomElems={[
                <Button
                    color='accent'
                    text={articleMenuMsg.deleteModalDeleteBtn}
                    onClick={deleteArticle}
                    key='1'
                />
            ]}
        />
    )
}
