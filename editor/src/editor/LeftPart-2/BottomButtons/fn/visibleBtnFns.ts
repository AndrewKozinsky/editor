import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import articleActions from 'store/article/articleActions'
import { BottomBtnCallbackType } from './universalHandler'

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

/** Функция возвращает обработчик нажатия на кнопку «Изменить видимость элемента» */
export const visibleItem: BottomBtnCallbackType = (
    e: any, dispatch, historyItem, selectedElem, moveSelectedComp
) => {
    const compsAndMaxCompId = articleManager.changeVisibility(
        historyItem.article, selectedElem
    )

    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}
