import React, { useEffect, useState } from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import articleMenuMsg from 'messages/articleMenuMessages'

/** Компонент окна с разметкой статьи */
export function ArticleMarkupModal() {
    const { tempComps } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    const [markupStr, setMarkupStr] = useState('')

    useEffect(function () {
        if (!tempComps || !historyItem) return

        const markupStr = articleManager.turnArticleDataToHTML(historyItem.article, tempComps)
        setMarkupStr(markupStr)
    }, [tempComps, historyItem])

    return (
        <ModalShortContent
            header={articleMenuMsg.markupModalHeader}
            text={markupStr}
        />
    )
}
