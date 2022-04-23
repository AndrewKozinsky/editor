import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import fireEvent from '../../../../event/fireEvent'

/** Хук возвращает булево значение заблокирована ли кнопка «Удалить элемент» */
export function useIsRemoveDisabled() {
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

        const canDeleteElem = articleManager.canDeleteElem(
            dComps, selectedElem
        )

        setDisabled(!canDeleteElem)
    }, [historyItem])

    return disabled
}

/** Функция запускает событие удаления выделенного элемента при нажатии на кнопку «Удалить элемент» */
export function removeItem(e: any) {
    fireEvent({
        event: 'deleteSelectedItem',
    })
}
