import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from 'articleManager/articleManager'

/** Функция проверяет заблокирована ли кнопка показа разметки статьи */
export function useIsMarkupBtnDisabled() {
    const { articleId } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(function () {
        if (!historyItem) return
        const isArticleExists = articleId && historyItem.article?.dComps.length

        setIsDisabled(!isArticleExists)
    }, [articleId, historyItem])

    return isDisabled
}
