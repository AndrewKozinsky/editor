import React, { useEffect, useState } from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import articleMenuMsg from 'messages/articleMenuMessages'
import { createParsingData } from './createParsingData'

/** Компонент окна с разметкой статьи */
export default function ArticleDataModal() {
    const { tempComps } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { name } = useGetArticleSelectors()

    const [markupStr, setMarkupStr] = useState('')

    useEffect(function () {
        if (!tempComps || !historyItem) return

        const markupStr = createParsingData(historyItem.article.dComps, name, tempComps)
        setMarkupStr(markupStr)
    }, [tempComps, historyItem])

    return (
        <ModalShortContent
            header={articleMenuMsg.markupModalHeader}
            text={markupStr}
        />
    )
}
