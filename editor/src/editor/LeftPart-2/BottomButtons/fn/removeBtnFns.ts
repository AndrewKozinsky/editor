import { useCallback, useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { useDispatch } from 'react-redux'
import actions from 'store/rootAction'

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
        const { selectedElem, moveSelectedComp } = historyItem
        const { dComps } = historyItem.article

        const canDeleteElem = articleManager.canDeleteElem(
            dComps, selectedElem
        )

        setDisabled(!canDeleteElem)
    }, [historyItem])

    return disabled
}

/** Хук возвращает обработчик нажатия на кнопку «Удалить элемент» */
export function useGetRemoveHandler() {
    const dispatch = useDispatch()

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem } = historyItem

        // Удалить компонент/элемент и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.deleteItem(
            historyItem.article, selectedElem
        )

        // Поставить новый элемент истории
        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))

        // Убрать выделение с этого компонента потому что он удалён
        dispatch(actions.article.setFlashedElement(
            'select', null, null, null
        ))
    }, [historyItem])
}
