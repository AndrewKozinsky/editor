import { useCallback, useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { useDispatch } from 'react-redux'
import articleActions from 'store/article/articleActions'

/** Хук возвращает булево значение заблокирована ли кнопка «Изменить видимость элемента» */
export function useIsVisibleDisabled() {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        if (!historyItem) {
            setDisabled(true)
            return
        }

        const { selectedElem } = historyItem
        // Кнопка заблокирована если ничего не выделено
        setDisabled(!selectedElem.tagType)
    }, [historyItem])

    return disabled
}

/** Хук возвращает обработчик нажатия на кнопку «Изменить видимость элемента» */
export function useGetVisibleHandler() {
    const dispatch = useDispatch()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem } = historyItem

        const compsAndMaxCompId = articleManager.changeVisibility(
            historyItem.article, selectedElem
        )

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [historyItem])
}
