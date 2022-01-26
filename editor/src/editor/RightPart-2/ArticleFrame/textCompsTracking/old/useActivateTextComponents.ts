// import { useEffect } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import articleManager from 'articleManager/articleManager'
// import actions from 'store/rootAction'
// import { store } from 'store/rootReducer'

/*export function useActivateTextComponents() {
    const flashedElems = articleManager.hooks.getFlashedElemCoords()

    useEffect(function () {
        if (!flashedElems || !flashedElems.selectedElem) return

        const { selectedElem } = flashedElems
        if (selectedElem.tagType !== 'textComponent') return

        if (!addedExtraHistoryItemForText) {
            store.dispatch( actions.article.makeHistoryStepForText())
        }
    }, [flashedElems])
}*/
