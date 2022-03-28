import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import {
    setArticleRenderIfTextCompSelected
} from '../../../RightPart-2/ArticleFrame/textCompsTracking/useUpdateArticleDataForText'
import { BottomBtnCallbackType } from './universalHandler'
import { upDownItem } from './upDownBtnFns'

/** Хук возвращает булево значение заблокирована ли кнопка «Копировать элемент» */
export function useIsCloneDisabled() {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem } = historyItem

        const canClone = articleManager.canClone(selectedElem)

        setDisabled(!canClone)
    }, [historyItem])

    return disabled
}

/**
 * Функция возвращает обработчик нажатия на кнопку копирования компонента/элемента.
 * @param {Number} deep — глубина копирования: 1 (компонент без атрибутов), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function cloneItem (deep: 1 | 2 | 3): BottomBtnCallbackType {
    return (dispatch, historyItem, selectedElem, moveSelectedComp, tempComps) => {
        // Разрешить отрисовку статьи если выделен текстовый компонент
        // При выделении текстового компонента отрисовка запрещается
        setArticleRenderIfTextCompSelected(true)

        // Клонировать выделенный компонент, поставить ниже и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.cloneItem(
            tempComps, historyItem.article, selectedElem, deep
        )

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}
