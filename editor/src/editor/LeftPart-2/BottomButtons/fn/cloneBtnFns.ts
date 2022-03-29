import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import articleActions from 'store/article/articleActions'
import { BottomBtnCallbackType } from './universalHandler'

/** Хук возвращает булево значение заблокирована ли кнопка «Копировать элемент» */
export function useIsCloneDisabled() {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem } = historyItem

        const canClone = articleManager.canClone(selectedElem)

        setDisabled(!canClone)
    }, [historyItem])

    return disabled
}

/**
 * Функция возвращает обработчик нажатия на кнопку копирования компонента/элемента.
 * @param {Number} deep — глубина копирования: 1 (компонент без атрибутов), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function cloneItem (deep: 1 | 2 | 3): BottomBtnCallbackType {
    return (dispatch, historyItem, selectedElem, moveSelectedComp, tempComps) => {
        // Клонировать выделенный компонент, поставить ниже и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.cloneItem(
            tempComps, historyItem.article, selectedElem, deep
        )

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}
