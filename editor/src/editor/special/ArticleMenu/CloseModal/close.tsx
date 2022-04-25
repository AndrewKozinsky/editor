import React, { useCallback } from 'react'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetShowModal from 'utils/hooksUtils'
import articleManager from 'articleManager/articleManager'
import CloseArticleConfirmModal from './CloseArticleConfirmModal'
import fireEvent from 'event/fireEvent'

/** Обработчик кнопки закрытия редактируемой статьи */
export function useCloseArticle() {
    const { historyStepWhenWasSave, historyCurrentIdx } = useGetArticleSelectors()
    const openConfirmCloseModal = useGetShowModal(<CloseArticleConfirmModal />)

    return useCallback(function () {
        const isArticleSaved = articleManager.isArticleSave( historyStepWhenWasSave, historyCurrentIdx )

        if (isArticleSaved) {
            // Закрыть статью
            fireEvent({event: 'closeArticle'})

            store.dispatch( actions.settings.setMainTabOuter(0) )
        }
        else {
            // Show confirmation modal
            openConfirmCloseModal()
        }

    }, [historyStepWhenWasSave, historyCurrentIdx])
}
