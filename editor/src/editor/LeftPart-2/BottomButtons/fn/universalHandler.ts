import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import StoreArticleTypes from 'store/article/articleTypes'
import { MiscTypes } from 'types/miscTypes'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { updateDataInTextComp } from '../../../RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'

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

    return useCallback(function () {
        if (!historyItem) return
        const { selectedElem, moveSelectedComp } = historyItem

        // Обновить данные в текстовом компоненте если это требуется
        updateDataInTextComp('common')

        // Запуск функции, обрабатывающей нажатие на кнопку
        callback(dispatch, historyItem, selectedElem, moveSelectedComp, tempComps)
    }, [historyItem])
}