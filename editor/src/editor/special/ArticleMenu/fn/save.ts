import { useCallback, useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'

/** The hook returns on Save article button click handler */
export function useSaveArticle() {
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors()

    return useCallback(async function () {
        await articleManager.saveArticle(history, historyCurrentIdx, articleId)
    }, [history, historyCurrentIdx, articleId])
}
