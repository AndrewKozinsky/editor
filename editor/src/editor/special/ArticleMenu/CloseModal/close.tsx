import React, { useCallback } from 'react'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import useGetShowModal from 'utils/hooksUtils'
import CloseArticleConfirmModal from './CloseArticleConfirmModal'
import fireEvent from 'event/fireEvent'

/** Обработчик кнопки закрытия редактируемой статьи */
export function useCloseArticle() {
    const { isArticleSaved } = useGetArticleSelectors()
    const openConfirmCloseModal = useGetShowModal(<CloseArticleConfirmModal />)

    return useCallback(function () {
        if (isArticleSaved) {
            // Закрыть статью
            fireEvent({event: 'closeArticle'})

            store.dispatch( actions.settings.setMainTabOuter(0) )
        }
        else {
            // Show confirmation modal
            openConfirmCloseModal()
        }

    }, [isArticleSaved])
}
