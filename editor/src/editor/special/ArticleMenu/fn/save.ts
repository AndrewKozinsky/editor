import { useCallback, useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'
import fireEvent from '../../../../event/fireEvent'

/** The hook returns on Save article button click handler */
export function useSaveArticle() {
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors()

    return useCallback(async function () {
        fireEvent({
            event: 'saveArticle'
        })
    }, [history, historyCurrentIdx, articleId])
}
