import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
// import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import ArticleTypes from '../../store/article/codeType/articleCodeType'

export const hooks = {
    getCurrentHistoryItem: useGetCurrentHistoryItem,
    getCurrentArticle: useGetCurrentArticle,
    getFlashedElemCoords: useGetFlashedElemCoords
}

/** Hook returns current history item object */
function useGetCurrentHistoryItem() {
    // Templates component from the Store
    const { history, historyCurrentIdx } = useGetArticleSelectors()
    const [currentHistoryItem, setCurrentHistoryItem] = useState<null | StoreArticleTypes.HistoryItem>(null)

    useEffect(function () {
        if (!history) return

        const article = history[historyCurrentIdx]
        setCurrentHistoryItem(article)
    }, [history, historyCurrentIdx])

    return currentHistoryItem
}
/** Hook returns current history item object */
function useGetCurrentArticle() {
    // Templates component from the Store
    const historyItem = useGetCurrentHistoryItem()
    const [currentArt, setCurrentArt] = useState<null | ArticleTypes.Article>(null)

    useEffect(function () {
        if (!historyItem) return

        setCurrentArt(historyItem.article)
    }, [historyItem])

    return currentArt
}


type FlashedElemsCoords = {
    hoveredElem: StoreArticleTypes.FlashedElem
    selectedElem: StoreArticleTypes.FlashedElem
}

/** Hook returns object with coordinated hovered and selected component/element */
function useGetFlashedElemCoords() {
    const historyItem = useGetCurrentHistoryItem()
    const [flashedElemsCoords, setFlashedElemsCoords] = useState<null | FlashedElemsCoords>(null)

    useEffect(function () {
        if (!historyItem) return

        setFlashedElemsCoords({
            hoveredElem: historyItem.hoveredElem,
            selectedElem: historyItem.selectedElem
        })
    }, [historyItem])

    return flashedElemsCoords
}