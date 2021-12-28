import React, { useCallback } from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetMessages from 'messages/fn/useGetMessages'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Button from 'common/formElements/Button/Button'
import { articleMenuMessages } from 'messages/articleMenuMessages'


export default function CloseArticleConfirmModal() {
    const dispatch = useDispatch()
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors()

    const articleMenuMsg = useGetMessages(articleMenuMessages)

    // Функция сохраняющая статью, очищающая редактор и закрывающая модальное окно
    const saveArticle = useCallback(async function () {
        // await articleManager.saveArticle(history, historyCurrentIdx, articleId)
        store.dispatch( actions.article.clearArticle() )
        dispatch(actions.modal.closeModal())
    }, [])

    // Функция очищающая редактор от статьи и закрывающая модальное окно
    const clearArticle = useCallback(function () {
        store.dispatch( actions.article.clearArticle() )
        dispatch(actions.modal.closeModal())
    }, [])

    const bottomButtons = [
        <Button
            text={articleMenuMsg.closeArticleModalDoNotSaveBtn}
            block
            onClick={clearArticle}
            key={1}
        />,
        <Button
            color='accent'
            text={articleMenuMsg.closeArticleModalSaveBtn}
            block
            onClick={saveArticle}
            key={2}
        />
    ]

    return (
        <ModalShortContent
            header={articleMenuMsg.closeArticleModalHeader}
            text={articleMenuMsg.closeArticleModalText}
            bottomElems={bottomButtons}
        />
    )
}
