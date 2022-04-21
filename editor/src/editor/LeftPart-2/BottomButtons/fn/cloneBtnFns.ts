import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { BottomBtnCallbackType } from './universalHandler'
import { CloneFnOptsType } from '../../../../articleManager/methods/clone'
import {getFromLocalStorage, setInLocalStorage} from '../../../../utils/miscUtils'
import config from '../../../../utils/config'
import fireEvent from '../../../../events/fireEvent'

/** Хук возвращает булево значение заблокирована ли кнопка «Копировать элемент» */
export function useIsCloneDisabled() {
    const [disabled, setDisabled] = useState(true)

    const historyItem = articleManager.hooks.getCurrentHistoryItem()
    const article = articleManager.hooks.getCurrentArticle()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        // Кнопка заблокирована если статья не загружена
        if (!historyItem) {
            setDisabled(true)
            return
        }
        const { selectedElem } = historyItem

        const canClone = articleManager.canClone(article?.dComps, selectedElem, tempComps)

        setDisabled(!canClone)
    }, [historyItem])

    return disabled
}

/**
 * Функция запускает событие клонирования выделенного элемента при нажатии на кнопку «Клонировать элемент»
 * @param {Object} cloneOpts — параметры копирования
 */
export function cloneItem (cloneOpts: CloneFnOptsType) {
    fireEvent({
        event: 'cloneSelectedItem',
        cloneAttrs: !!cloneOpts.cloneAttrs,
        cloneChildren: !!cloneOpts.cloneChildren,
    })
}
