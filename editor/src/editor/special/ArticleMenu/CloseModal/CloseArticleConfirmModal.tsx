import React, { useCallback } from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Button from 'common/formElements/Button/Button'
import articleMenuMsg from 'messages/articleMenuMessages'
import articleActions from 'store/article/articleActions'
import articleManager from 'articleManager/articleManager'
import fireEvent from 'event/fireEvent'

/** Модальное окно с вопросом нужно ли закрывать не сохранённую статью */
export default function CloseArticleConfirmModal() {
    const dispatch = useDispatch()
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors()

    // Функция сохраняющая статью, очищающая редактор и закрывающая модальное окно
    const saveArticle = useCallback(async function () {
        await articleManager.saveArticle(history, historyCurrentIdx, articleId)

        // Закрыть статью
        fireEvent({event: 'closeArticle'})

        dispatch(actions.modal.closeModal())
    }, [history, historyCurrentIdx, articleId])

    // Функция очищающая редактор от статьи и закрывающая модальное окно
    const clearArticle = useCallback(function () {
        // Закрыть статью
        fireEvent({event: 'closeArticle'})

        dispatch(actions.modal.closeModal())
        store.dispatch( actions.settings.setMainTabOuter(0) )
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
