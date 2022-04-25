import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'


/** Hook sets article JSX to IFrame */
export default function useSetArticleToIFrame() {
    const {
        isArtDataCorrect,
        $links,
        history,
        historyCurrentIdx,
        tempComps
    } = useGetArticleSelectors()

    useEffect(function () {
        // Ничего не делать если внутрь iFrame <body> не добавили корневой <div>.
        if (!$links.$body?.firstChild) return

        if (isArtDataCorrect && history?.length) {
            const article = history[historyCurrentIdx].article

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
        isArtDataCorrect,
        $links,
        history,
        historyCurrentIdx,
        tempComps
    ])
}
