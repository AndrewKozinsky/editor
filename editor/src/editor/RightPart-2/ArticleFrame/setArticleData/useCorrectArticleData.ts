import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'

// ДУМАЮ ЭТО МОЖНО ПОТОМ УДАЛИТЬ ПОТОМУ ЧТО Я ФУНКЦИОНАЛ ПЕРЕНЁС В useSetArticleToIFrame
/** Хук правит данные статьи, чтобы убрать возможные ошибки и предотвратить падение функций, которые будут собирать статью. */
/*export default function useCorrectArticleData() {
    const {
        history, historyCurrentIdx,
        tempComps, tempCompsDownloadHash
    } = useGetArticleSelectors()

    const [lastDownloadHashVal, setLastDownloadHashVal] = useState(0)

    useEffect(function () {
        if (!history.length || !tempCompsDownloadHash) return

        if (lastDownloadHashVal === tempCompsDownloadHash) return
        setLastDownloadHashVal(tempCompsDownloadHash)

        const article = history[historyCurrentIdx].article
        // Пройти через компоненты в данных и изменить их чтобы они соответствовали шаблонам
        articleManager.correctArticle(article, article.dComps, tempComps)
    }, [
        history, historyCurrentIdx,
        tempComps, tempCompsDownloadHash,
        lastDownloadHashVal
    ])
}*/

