import { useCallback, useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import actions from 'store/rootAction'

/** Хук возвращает булево значение заблокирована ли кнопка «Поместить внутрь» */
export function useIsInsideDisabled() {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem, moveSelectedComp } = historyItem
        const { dComps } = historyItem.article

        const canComponentPutInElement = articleManager.canMoveCompMoveToProperPosition(
            tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
        )

        setDisabled(!canComponentPutInElement)
    }, [historyItem, tempComps])

    return disabled
}


/** Хук возвращает обработчик нажатия на кнопку «Поместить внутрь» */
export function useGetInsideHandler() {
    const dispatch = useDispatch()

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    return useCallback(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        // Поставить перемещаемый компонент в правильное положение и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.moveComponentToProperPosition(
            historyItem.article, selectedElem, moveSelectedComp.dataCompId
        )

        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [historyItem])
}