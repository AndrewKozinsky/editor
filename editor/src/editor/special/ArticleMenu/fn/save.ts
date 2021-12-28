import { useCallback, useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'

/** The hook returns boolean if Save article button is disabled */
export function useIsSaveBtnDisabled() {
    const { historyCurrentIdx, historyStepWhenWasSave } = useGetArticleSelectors()

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        if (!history?.length) return

        // Button is disabled when History step when article was saved is equal to current history step
        setIsDisabled( historyStepWhenWasSave === historyCurrentIdx )
    }, [historyCurrentIdx, historyStepWhenWasSave])

    return isDisabled
}

/** The hook returns on Save article button click handler */
export function useSaveArticle() {
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors()

    return useCallback(async function () {
        await articleManager.saveArticle(history, historyCurrentIdx, articleId)
    }, [history, historyCurrentIdx, articleId])
}
