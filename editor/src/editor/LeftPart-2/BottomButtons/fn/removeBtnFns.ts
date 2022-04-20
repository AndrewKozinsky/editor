import { useCallback, useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { useDispatch } from 'react-redux'
import articleActions from 'store/article/articleActions'
import { BottomBtnCallbackType } from './universalHandler'

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

/**
 * Функция возвращает обработчик нажатия на кнопку «Удалить элемент»
 * @param {Object} e — объект события
 * @param {Object} dispatch — функция dispatch()
 * @param {Object} historyItem — объект истории статьи
 * @param {Object} selectedElem — координаты выделенного элемента
 * @param moveSelectedComp — координаты перемещаемого элемента
 */
export const removeItem: BottomBtnCallbackType = (e: any, dispatch, historyItem, selectedElem, moveSelectedComp) => {
    // Удалить компонент/элемент и возвратить новый объект истории
    const compsAndMaxCompId = articleManager.deleteItem(
        historyItem.article, selectedElem
    )

    // Поставить новый элемент истории
    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))

    // Убрать выделение с этого компонента потому что он удалён
    dispatch(articleActions.setFlashedElement(
        'select', null, null, null
    ))
}
