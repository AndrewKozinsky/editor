// import {AppStateType} from 'store/rootReducer'
import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
// import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'

export const hooks = {
    // getHistoryItem: useGetCurrentArticle,
    getArticle: useGetCurrentArticle,
    // getFlashedElemCoords: useGetFlashedElemCoords
}

/** Hook returns current history item object */
function useGetCurrentArticle() {
    // Templates component from the Store
    const { history, historyCurrentIdx } = useGetArticleSelectors()
    const [currentArticle, setCurrentArticle] = useState<null | StoreArticleTypes.HistoryItem>(null)

    useEffect(function () {
        if (!history) return

        const article = history[historyCurrentIdx]
        setCurrentArticle(article)
    }, [history, historyCurrentIdx])

    return currentArticle
}


/*type FlashedElemsCoords = {
    hoveredElem: StoreArticleTypes.HoveredElem
    selectedElem: StoreArticleTypes.HoveredElem
}*/

/** Hook returns object with coordinated hovered and selected component/element */
/*function useGetFlashedElemCoords() {
    const historyItem = useGetCurrentArticle()
    const [flashedElemsCoords, setFlashedElemsCoords] = useState<null | FlashedElemsCoords>(null)

    useEffect(function () {
        if (!historyItem) return

        setFlashedElemsCoords({
            hoveredElem: historyItem.hoveredElem,
            selectedElem: historyItem.selectedElem
        })
    }, [historyItem])

    return flashedElemsCoords
}*/
