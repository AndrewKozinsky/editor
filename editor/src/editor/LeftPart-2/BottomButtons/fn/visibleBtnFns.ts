import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import fireEvent from '../../../../event/fireEvent'

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


/** Функция запускает событие изменения видимости выделенного элемента при нажатии на кнопку «Изменить видимость элемента» */
export function changeSelectedItemVisibility(e: any) {
    fireEvent({
        event: 'changeSelectedItemVisibility',
    })
}

