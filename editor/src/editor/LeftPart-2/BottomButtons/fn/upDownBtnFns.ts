import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import articleActions from 'store/article/articleActions'
import { BottomBtnCallbackType } from './universalHandler'


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

/**
 * Функция возвращает обработчик нажатия на кнопку «Переместить выше или ниже»
 * @param {String} direction — направление перемещения
 */
export function upDownItem(direction: 'up' | 'down'): BottomBtnCallbackType {
    return (e: any, dispatch, historyItem, selectedElem, moveSelectedComp) => {
        // Поставить перемещаемый компонент в правильное положение и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.moveItemToUpOrDown(
            historyItem.article, selectedElem, direction
        )

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}
