import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import articleActions from 'store/article/articleActions'
import {
    setArticleRenderIfTextCompSelected
} from '../../../RightPart-2/ArticleFrame/textCompsTracking/useUpdateArticleDataForText'
import { BottomBtnCallbackType } from './universalHandler'

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
 * Функция возвращает обработчик нажатия на кнопку перемещения компонента
 * @param {String} direction — направление перемещения: inside (внутрь выделенного элемента),
 * left и right (левее или правее выделенного компонента)
 */
export function moveItem(direction: 'inside' | 'left' | 'right'): BottomBtnCallbackType {
    return (dispatch, historyItem, selectedElem, moveSelectedComp) => {
        // Разрешить отрисовку статьи если выделен текстовый компонент
        // При выделении текстового компонента отрисовка запрещается
        setArticleRenderIfTextCompSelected(selectedElem, true)

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

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}

