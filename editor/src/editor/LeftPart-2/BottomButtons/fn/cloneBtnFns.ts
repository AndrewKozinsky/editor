import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import actions from 'store/rootAction'

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
 * Хук возвращает обработчик нажатия на кнопку копирования компонента/элемента.
 * @param {Number} deep — глубина копирования: 1 (компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function useGetCloneHandler(deep: 1 | 2 | 3) {
    const dispatch = useDispatch()

    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { tempComps } = useGetArticleSelectors()

    return useCallback(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) return
        const { selectedElem } = historyItem

        // Клонировать выделенный компонент, поставить ниже и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.cloneItem(
            tempComps, historyItem.article, selectedElem, deep
        )

        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [historyItem])
}
