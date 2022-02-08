import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import { getState } from '../../../../utils/miscUtils'
import textManagerData from '../textCompsTracking/textManagerData'


/** Hook sets article JSX to IFrame */
export default function useSetArticleToIFrame() {
    const {
        $links,
        history,
        historyCurrentIdx,
        tempComps,
        tempCompsDownloadHash,
        renderIsAllowed
    } = useGetArticleSelectors()

    // Последнее значение хеша загрузки шаблонов компонентов.
    // Требуется, чтобы исправить статью, если изменится.
    const [lastTempCompsDownloadHash, setLastTempCompsDownloadHash] = useState(0)

    useEffect(function () {
        if (!$links.$body?.firstChild) return

        // Отрисовать статью если есть история
        if (tempCompsDownloadHash && history?.length) {
            const article = history[historyCurrentIdx].article

            // Если изменилось значение хеша загрузки шаблонов компонентов,
            if (lastTempCompsDownloadHash !== tempCompsDownloadHash) {
                setLastTempCompsDownloadHash(tempCompsDownloadHash)
                // ... запустить сценарий исправления статьи.
                articleManager.correctArticle(article, article.dComps, tempComps)
            }

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
        tempCompsDownloadHash,
        $links,
        history,
        historyCurrentIdx,
        tempComps
    ])
}
