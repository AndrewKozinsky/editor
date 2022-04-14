import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import StoreArticleTypes from 'store/article/articleTypes'
import { MiscTypes } from 'types/miscTypes'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { updateDataInTextComp } from '../../../RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import {useGetResizeHandler} from '../../../RightPart-2/ArticleFrame/flashElements/useResizeFlashRects'

export type BottomBtnCallbackType = (
    dispatch: MiscTypes.AppDispatch,
    historyItem: StoreArticleTypes.HistoryItem,
    selectedElem: StoreArticleTypes.FlashedElem,
    moveSelectedComp?: StoreArticleTypes.FlashedElem,
    tempComps?: TempCompTypes.TempComps
) => void

/**
 * Хук возвращает универсальный обработчик нажатия на кнопку в левой нижней части второй вкладки редактора.
 * Туда передаётся сама обрабатываемая функция
 * @param {Function} callback — функция запускаемая после нажатия на кнопку
 */
export function useGetUniversalHandler(callback: BottomBtnCallbackType) {
    const dispatch = useDispatch()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const { tempComps } = useGetArticleSelectors()

    // Ссылка на функцию, который нужно запускать для пересчёта положения
    // и размера подсвечивающих прямоугольников
    const resizeHandler = useGetResizeHandler()

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('common')

        // Запуск функции, обрабатывающей нажатие на кнопку
        callback(dispatch, historyItem, selectedElem, moveSelectedComp, tempComps)

        // Пересчитать положение подсвечивающих прямоугольников
        setTimeout(resizeHandler, 110)
    }, [historyItem])
}