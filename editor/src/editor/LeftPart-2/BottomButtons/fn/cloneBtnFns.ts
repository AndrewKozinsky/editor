import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { BottomBtnCallbackType } from './universalHandler'
import { CloneFnOptsType } from '../../../../articleManager/methods/clone'
import {getFromLocalStorage, setInLocalStorage} from '../../../../utils/miscUtils'
import config from '../../../../utils/config'

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
 * Функция возвращает обработчик нажатия на кнопку копирования компонента/элемента.
 * @param {Object} cloneOpts — параметры копирования
 */
export function cloneItem (cloneOpts: CloneFnOptsType): BottomBtnCallbackType {
    return (dispatch, historyItem, selectedElem, moveSelectedComp, tempComps) => {
        // Клонировать выделенный компонент, поставить ниже и возвратить новый объект истории
        const compsAndMaxCompId = articleManager.cloneItem(
            tempComps, historyItem.article, selectedElem, cloneOpts
        )

        dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}

/**
 * Хук хранит значение нажата ли кнопка сообщающая должен ли выделенный элемент быть скопирован с атрибута.
 * Возвращает это значение и функцию изменяющую это значение
 */
export function useManageAttrBtnStatus(): [boolean, (isBtnOn: boolean) => void] {
    const [isAttrsBtnOn, setIsAttrsBtnOn] = useState(
        // Получить из LocalStorage нажата ли кнопка копирования выделенного элемента вместе с установленными атрибутами
        getFromLocalStorage(config.ls.editIsCloneAttrBtnOn, false)
    )

    useEffect(function () {
        // При изменении значения сохранить его в LocalStorage
        setInLocalStorage(config.ls.editIsCloneAttrBtnOn, isAttrsBtnOn)
    }, [isAttrsBtnOn])

    return [isAttrsBtnOn, setIsAttrsBtnOn]
}