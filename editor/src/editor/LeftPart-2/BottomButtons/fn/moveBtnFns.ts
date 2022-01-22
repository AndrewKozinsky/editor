import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import actions from 'store/rootAction'
import StoreArticleTypes from 'store/article/articleTypes'

/**
 * Хук возвращает булево значение заблокирована ли одна из кнопок перемещения компонента
 * @param {String} direction — направление перемещения: inside (внутрь выделенного элемента),
 * left и right (левее или правее выделенного компонента)
 */
export function useIsMoveBtnDisabled(direction: 'inside' | 'left' | 'right'): boolean {
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

        let canComponentMove

        if (direction === 'inside') {
            canComponentMove = articleManager.canComponentPutInElement(
                tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
            )
        }
        else if (['left', 'right'].includes(direction)) {
            canComponentMove = articleManager.canMoveCompMoveToLeftOrRight(
                direction, tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
            )
        }

        setDisabled(!canComponentMove)
    }, [historyItem, tempComps])

    return disabled
}


/**
 * Хук возвращает обработчик нажатия на кнопку перемещения компонента
 * @param {String} direction — направление перемещения: inside (внутрь выделенного элемента),
 * left и right (левее или правее выделенного компонента)
 */
export function useGetMoveHandler(direction: 'inside' | 'left' | 'right') {
    const dispatch = useDispatch()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        let compsAndMaxCompId: StoreArticleTypes.CreateNewHistoryItem

        if (direction === 'inside') {
            // Поставить перемещаемый компонент внутрь элемента и возвратить новый объект истории
            compsAndMaxCompId = articleManager.moveComponentToElement(
                historyItem.article, selectedElem, moveSelectedComp.dataCompId
            )
        }
        else if (['left', 'right'].includes(direction)) {
            if (selectedElem.dataCompId) {
                // Поставить перемещаемый компонент после выделенного компонента
                compsAndMaxCompId = articleManager.moveCompNearComp(
                    historyItem.article, selectedElem.dataCompId, moveSelectedComp.dataCompId, direction
                )
            }
            else {
                // Поставить перемещаемый компонент в корневой массив компонентов статьи
                compsAndMaxCompId = articleManager.moveComponentToRoot(
                    historyItem.article, moveSelectedComp.dataCompId, direction
                )
            }
        }


        dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }, [historyItem])
}



