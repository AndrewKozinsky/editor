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
        // Не отрисовывать статью если внутрь iFrame <body> не добавили корневой <div>.
        // Или данные ещё не исправлены (соответствовали шаблонам компонентам)
        if (!$links.$body?.firstChild || !isArtDataCorrect) return

        // Отрисовать статью если есть история
        if (history?.length) {
            const article = history[historyCurrentIdx].article

            // Создать JSX новой статьи и поставить в iFrame.
            ReactDOM.render(
                articleManager.turnArticleDataToJSX(article, tempComps),
                $links.$body.firstChild as Element
            )

        }
        // Очистить статью если в истории ничего нет
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
