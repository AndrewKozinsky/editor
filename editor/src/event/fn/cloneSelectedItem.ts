import articleActions from 'store/article/articleActions'
import articleManager from '../../articleManager/articleManager'
import { getState } from 'utils/miscUtils'
import EventDataTypes from '../EventDataTypes'
import selectedItemUniversalWrapFn, { BottomBtnCallbackType } from './selectedItemUniversalWrapFn'
import {CloneFnOptsType} from '../../articleManager/methods/clone'

/**
 * Функция удаляет выделенный компонент или элемент если это возможно
 * @param {Object} eventConfig — конфигурация события
 */
export function cloneSelectedItemIfAllow(eventConfig: EventDataTypes.cloneSelectedItem) {
    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]

    // Кнопка заблокирована если статья не загружена
    if (!historyItem) return

    const { selectedElem } = historyItem

    const canClone = articleManager.canClone(historyItem.article?.dComps, selectedElem, getState().article.tempComps)
    if (!canClone) return

    selectedItemUniversalWrapFn(cloneSelectedItem, eventConfig)(null)
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
export const cloneSelectedItem: BottomBtnCallbackType = (
    e: any,
    dispatch,
    historyItem,
    selectedElem,
    moveSelectedComp,
    tempComps,
    fireEventArg
) => {
    // Параметры копии
    const cloneOpts: CloneFnOptsType = {}
    if (fireEventArg.event === 'cloneSelectedItem') {
        cloneOpts.cloneAttrs = fireEventArg.cloneAttrs
        cloneOpts.cloneChildren = fireEventArg.cloneChildren
    }

    // Клонировать выделенный компонент, поставить ниже и возвратить новый объект истории
    const compsAndMaxCompId = articleManager.cloneItem(
        tempComps, historyItem.article, selectedElem, cloneOpts
    )

    dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}