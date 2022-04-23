import articleActions from 'store/article/articleActions'
import articleManager from 'articleManager/articleManager'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'
import selectedItemUniversalWrapFn, { BottomBtnCallbackType } from './selectedItemUniversalWrapFn'

/**
 * Функция удаляет выделенный компонент или элемент если это возможно
 * @param {Object} stepConfig — конфигурация шага
 */
export function changeSelectedItemVisibilityIfAllow(stepConfig: EventDataTypes.changeSelectedItemVisibility) {
    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]

    if (!historyItem) return

    const { selectedElem } = historyItem

    // Завершить если ничего не выделено
    if (!selectedElem.tagType) return

    // Изменить видимость выделенного компонента/элемента
    selectedItemUniversalWrapFn(changeSelectedItemVisibility, stepConfig)(null)
}


/**
 * Функция изменяет видимость выделенного элемента
 * @param {Object} e — объект события
 * @param {Object} dispatch — функция dispatch()
 * @param {Object} historyItem — объект истории статьи
 * @param {Object} selectedElem — координаты выделенного элемента
 * @param {Object} moveSelectedComp — координаты перемещаемого элемента
 * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Object} fireEventArg — данные о событии
 */
export const changeSelectedItemVisibility: BottomBtnCallbackType = (
    e: any,
    dispatch,
    historyItem,
    selectedElem,
    moveSelectedComp,
    tempComps,
    fireEventArg
) => {

    const compsAndMaxCompId = articleManager.changeVisibility(
        historyItem.article, selectedElem
    )

    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}