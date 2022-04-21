import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import articleManager from '../../articleManager/articleManager'
import { updateDataInTextComp } from 'editor/RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'
import selectedItemUniversalWrapFn, { BottomBtnCallbackType } from './selectedItemUniversalWrapFn'
import {useEffect, useState} from 'react'

/**
 * Функция изменяет порядок выделенного компонента или элемента если это возможно
 * @param {Object} stepConfig — конфигурация шага
 */
export function upDownSelectedItemIfAllow(stepConfig: EventDataTypes.upDownSelectedItem) {

    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]
    if (!historyItem) return

    const { selectedElem } = historyItem
    const { dComps } = historyItem.article

    const canComponentMoveUpOrDown = articleManager.canMoveItemToUpOrDown(
        dComps, selectedElem, stepConfig.direction
    )

    if (!canComponentMoveUpOrDown) return

    selectedItemUniversalWrapFn(upDownSelectedItem, stepConfig)(null)
}


/**
 * Функция изменяет порядок выделенного компонента или элемента
 * @param {Object} e — объект события
 * @param {Object} dispatch — функция dispatch()
 * @param {Object} historyItem — объект истории статьи
 * @param {Object} selectedElem — координаты выделенного элемента
 * @param {Object} moveSelectedComp — координаты перемещаемого элемента
 * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Object} fireEventArg — данные о событии
 */
export const upDownSelectedItem: BottomBtnCallbackType = (
    e: any,
    dispatch,
    historyItem,
    selectedElem,
    moveSelectedComp,
    tempComps,
    fireEventArg
) => {
    if (fireEventArg.event !== 'upDownSelectedItem') return

    // Поставить перемещаемый компонент в правильное положение и возвратить новый объект истории
    const compsAndMaxCompId = articleManager.moveItemToUpOrDown(
        historyItem.article, selectedElem, fireEventArg.direction
    )

    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}
