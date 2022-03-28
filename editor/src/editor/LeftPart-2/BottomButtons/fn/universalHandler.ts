import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import StoreArticleTypes from 'store/article/articleTypes'
import { MiscTypes } from 'types/miscTypes'
import {
    setArticleRenderIfTextCompSelected
} from '../../../RightPart-2/ArticleFrame/textCompsTracking/useUpdateArticleDataForText'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'

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

        // Разрешить отрисовку статьи если выделен текстовый компонент
        // При выделении текстового компонента отрисовка запрещается
        setArticleRenderIfTextCompSelected(true)

        // Запуск функции, обрабатывающей нажатие на кнопку
        callback(dispatch, historyItem, selectedElem, moveSelectedComp, tempComps)

        // Снова запретить отрисовку статьи если выбран текстовый компонент
        setArticleRenderIfTextCompSelected(false)
    }, [historyItem])
}