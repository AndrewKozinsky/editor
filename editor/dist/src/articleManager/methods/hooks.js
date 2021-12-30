import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
export const hooks = {
    getCurrentHistoryItem: useGetCurrentHistoryItem,
    getCurrentArticle: useGetCurrentArticle,
    getFlashedElemCoords: useGetFlashedElemCoords
};
/** Hook returns current history item object */
function useGetCurrentHistoryItem() {
    // Templates component from the Store
    const { history, historyCurrentIdx } = useGetArticleSelectors();
    const [currentHistoryItem, setCurrentHistoryItem] = useState(null);
    useEffect(function () {
        if (!history)
            return;
        const article = history[historyCurrentIdx];
        setCurrentHistoryItem(article);
    }, [history, historyCurrentIdx]);
    return currentHistoryItem;
}
/** Hook returns current history item object */
function useGetCurrentArticle() {
    // Templates component from the Store
    const historyItem = useGetCurrentHistoryItem();
    const [currentArt, setCurrentArt] = useState(null);
    useEffect(function () {
        if (!historyItem)
            return;
        setCurrentArt(historyItem.article);
    }, [historyItem]);
    return currentArt;
}
/** Hook returns object with coordinated hovered and selected component/element */
function useGetFlashedElemCoords() {
    const historyItem = useGetCurrentHistoryItem();
    const [flashedElemsCoords, setFlashedElemsCoords] = useState(null);
    useEffect(function () {
        if (!historyItem)
            return;
        setFlashedElemsCoords({
            hoveredElem: historyItem.hoveredElem,
            selectedElem: historyItem.selectedElem
        });
    }, [historyItem]);
    return flashedElemsCoords;
}
//# sourceMappingURL=hooks.js.map