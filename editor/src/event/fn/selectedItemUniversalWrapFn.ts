import {MiscTypes} from '../../types/miscTypes'
import StoreArticleTypes from 'store/article/articleTypes'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import {store} from 'store/rootReducer'
import { resizeFlashedElemsHandler } from 'editor/RightPart-2/ArticleFrame/flashElements/useResizeFlashRects'
import {updateDataInTextComp} from 'editor/RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import {getState} from 'utils/miscUtils'
import {FireDataEventArg} from '../EventDataTypes'

export type BottomBtnCallbackType = (
    e: any,
    dispatch: MiscTypes.AppDispatch,
    historyItem: StoreArticleTypes.HistoryItem,
    selectedElem: StoreArticleTypes.FlashedElem,
    moveSelectedComp: StoreArticleTypes.FlashedElem,
    tempComps: TempCompTypes.TempComps,
    fireEventArg: FireDataEventArg
) => void


/**
 * Функция возвращает универсальный обработчик действий с выделенным элементом: удаление, изменение видимости, клонирование, изменение порядка
 * Туда передаётся сама обрабатываемая функция
 * @param {Function} callback — функция запускаемая после нажатия на кнопку
 * @param {Object} fireEventArg — данные о событии
 */
export default function selectedItemUniversalWrapFn(callback: BottomBtnCallbackType, fireEventArg: FireDataEventArg) {
    return function (e: any) {
        const { history, historyCurrentIdx } = getState().article
        const historyItem = history[historyCurrentIdx]

        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('common')

        // Запуск функции, обрабатывающей нажатие на кнопку
        callback(e, store.dispatch, historyItem, selectedElem, moveSelectedComp, getState().article.tempComps, fireEventArg)

        // Пересчитать положение подсвечивающих прямоугольников
        setTimeout(resizeFlashedElemsHandler, 10)
    }
}