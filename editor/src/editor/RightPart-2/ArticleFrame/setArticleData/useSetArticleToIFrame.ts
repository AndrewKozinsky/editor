import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'


/** Hook sets article JSX to IFrame */
export default function useSetArticleToIFrame() {
    const {
        $links,
        history,
        historyCurrentIdx,
        tempComps,
        tempCompsDownloadHash
    } = useGetArticleSelectors()

    const [lastDownloadHashVal, setLastDownloadHashVal] = useState(0)

    useEffect(function () {
        if (!$links.$body?.firstChild) return

        if (tempCompsDownloadHash && history?.length) {
            const article = history[historyCurrentIdx].article

            if (lastDownloadHashVal !== tempCompsDownloadHash) {
                console.log('Код скорректирован')
                setLastDownloadHashVal(tempCompsDownloadHash)
                articleManager.correctArticle(article, article.dComps, tempComps)
            }

            // Создать JSX новой статьи и поставить в iFrame.
            ReactDOM.render(
                articleManager.turnArticleDataToJSX(article, tempComps),
                $links.$body.firstChild as Element
            )
        }
        else {
            // Создать JSX новой статьи и поставить в iFrame.
            ReactDOM.render(
                null,
                $links.$body.firstChild as Element
            )
        }

    }, [
        tempCompsDownloadHash,
        $links,
        history,
        historyCurrentIdx,
        tempComps,
    ])
}
