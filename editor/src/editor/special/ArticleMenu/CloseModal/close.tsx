import React, { useCallback } from 'react'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetShowModal from 'utils/hooksUtils'
import articleManager from 'articleManager/articleManager'
import CloseArticleConfirmModal from './CloseArticleConfirmModal'

/** Обработчик кнопки закрытия редактируемой статьи */
export function useCloseArticle() {
    const { historyStepWhenWasSave, historyCurrentIdx } = useGetArticleSelectors()
    const openConfirmCloseModal = useGetShowModal(<CloseArticleConfirmModal />)

    return useCallback(function () {
        const isArticleSaved  = articleManager.isArticleSave( historyStepWhenWasSave, historyCurrentIdx )

        if (isArticleSaved) {
            // Clear an article data in Store
            store.dispatch( actions.article.clearArticle() )
            store.dispatch( actions.settings.setMainTab(0) )
        }
        else {
            // Show confirmation modal
            openConfirmCloseModal()
        }

    }, [historyStepWhenWasSave, historyCurrentIdx])
}
