import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import fireEvent from '../../../../event/fireEvent'


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

        const canComponentMoveUpOrDown = articleManager.canMoveItemToUpOrDown(
            dComps, selectedElem, direction
        )

        setDisabled(!canComponentMoveUpOrDown)
    }, [historyItem])

    return disabled
}



/** Функция запускает событие изменения порядка выделенного элемента при нажатии на кнопку «Переместить выше или ниже» */
export function upDownItem(direction: 'up' | 'down') {
    fireEvent({
        event: 'upDownSelectedItem',
        direction
    })
}