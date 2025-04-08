import React, { useEffect, useState } from 'react'
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import articleMenuMsg from 'messages/articleMenuMessages'
import getArticleRequest from 'requests/editor/article/getArticleRequest'
import { createParsingData } from './createParsingData'

/** Компонент окна с данными статьи для сборки */
export default function ArticleDataModal() {
    const { tempComps, articleId } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { name } = useGetArticleSelectors()

    const [markupStr, setMarkupStr] = useState('')

    useEffect(function () {
        async function getMarkupStr() {
            if (!tempComps || !historyItem) return

            const meta = await getMeta(articleId)
            const markupStr = createParsingData(articleId, historyItem.article.dComps, name, tempComps, meta)
            setMarkupStr(markupStr)
        }

        getMarkupStr().catch(console.error)
    }, [tempComps, historyItem, articleId])

    return (
        <ModalShortContent
            header={articleMenuMsg.dataModalHeader}
            text={markupStr}
        />
    )
}

async function getMeta(articleId: number) {
    const currentArticleData = await getArticleRequest(articleId)

    if (currentArticleData.status === 'success') {
        return currentArticleData.data.articles[0].meta
    }

    return null
}