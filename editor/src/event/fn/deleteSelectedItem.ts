import articleActions from 'store/article/articleActions'
import articleManager from '../../articleManager/articleManager'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'
import selectedItemUniversalWrapFn, { BottomBtnCallbackType } from './selectedItemUniversalWrapFn'

/**
 * Функция удаляет выделенный компонент или элемент если это возможно
 * @param {Object} stepConfig — конфигурация шага
 */
export function deleteSelectedItemIfAllow(stepConfig: EventDataTypes.deleteSelectedItem) {
    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]

    // Можно ли сделать шаг по истории в переданном направлении?
    const canDeleteElem = articleManager.canDeleteElem(historyItem.article.dComps, historyItem.selectedElem)

    if (!canDeleteElem) return

    selectedItemUniversalWrapFn(deleteSelectedItem, stepConfig)(null)
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
export const deleteSelectedItem: BottomBtnCallbackType = (
    e: any,
    dispatch,
    historyItem,
    selectedElem,
    moveSelectedComp,
    tempComps,
    fireEventArg
) => {
    // Убрать выделение с этого компонента потому что его хотят удалить
    dispatch(articleActions.setFlashedElement(
        'select', null, null, null
    ))

    // Удалить компонент/элемент и возвратить новый объект истории
    const compsAndMaxCompId = articleManager.deleteItem(
        historyItem.article, selectedElem
    )

    // Поставить новый элемент истории
    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}