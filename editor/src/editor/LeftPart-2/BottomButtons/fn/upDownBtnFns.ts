import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import actions from 'store/rootAction'


/** Хук возвращает булево значение заблокирована ли кнопка «Переместить выше» */
export function useIsUpDownDisabled(direction: 'up' | 'down') {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem } = historyItem
        const { dComps } = historyItem.article

        const canComponentPutInElement = articleManager.canMoveItemToUpOrDown(
            dComps, selectedElem, direction
        )

        setDisabled(!canComponentPutInElement)
    }, [historyItem])

    return disabled
}

/** Хук возвращает обработчик нажатия на кнопку «Переместить выше» */
export function useGetUpDownHandler(direction: 'up' | 'down') {
    const dispatch = useDispatch()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        // Поставить перемещаемый компонент в правильное положение и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.moveItemToUpOrDown(
            historyItem.article, selectedElem, direction
        )

        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [historyItem])
}
