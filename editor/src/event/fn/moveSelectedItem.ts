import articleActions from 'store/article/articleActions'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from 'articleManager/articleManager'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'
import selectedItemUniversalWrapFn, { BottomBtnCallbackType } from './selectedItemUniversalWrapFn'

/**
 * Функция удаляет выделенный компонент или элемент если это возможно
 * @param {Object} stepConfig — конфигурация шага
 */
export function moveSelectedItemIfAllow(stepConfig: EventDataTypes.moveSelectedItem) {

    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]
    if (!historyItem) return

    const { selectedElem, moveSelectedComp } = historyItem
    const { dComps } = historyItem.article

    const {tempComps} = getState().article

    let canComponentMove

    if (stepConfig.direction === 'inside') {
        canComponentMove = articleManager.canComponentPutInElement(
            tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
        )
    }
    else if (['left', 'right'].includes(stepConfig.direction)) {
        canComponentMove = articleManager.canMoveCompMoveToLeftOrRight(
            stepConfig.direction, tempComps, dComps, selectedElem, moveSelectedComp.dataCompId
        )
    }

    if (!canComponentMove) return

    selectedItemUniversalWrapFn(moveSelectedItem, stepConfig)(null)
}


/**
 * Функция удаляет выделенный компонент или элемент
 * @param {Object} e — объект события
 * @param {Object} dispatch — функция dispatch()
 * @param {Object} historyItem — объект истории статьи
 * @param {Object} selectedElem — координаты выделенного элемента
 * @param {Object} moveSelectedComp — координаты перемещаемого элемента
 * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Object} fireEventArg — данные о событии
 */
export const moveSelectedItem: BottomBtnCallbackType = (
    e: any,
    dispatch,
    historyItem,
    selectedElem,
    moveSelectedComp,
    tempComps,
    fireEventArg
) => {
    if (fireEventArg.event !== 'moveSelectedItem') return

    let compsAndMaxCompId: StoreArticleTypes.CreateNewHistoryItem

    const { direction } = fireEventArg

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
