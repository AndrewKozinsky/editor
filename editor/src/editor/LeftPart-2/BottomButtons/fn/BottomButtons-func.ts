import { useEffect, useState } from 'react'
import { setUpperCaseForFirstLetter } from 'utils/stringUtils'
import articleManager from 'articleManager/articleManager'

/**
 * Хук возвращает тип значка у кнопок
 * @param {string} btnKey — тип кнопки
 */
export function useGetIconType(btnKey: string) {
    const [iconType, setIconType] = useState('elBtnSignVisible')
    const visibleIconType = useGetVisibleIconType()

    useEffect(function () {
        let resultType = btnKey

        if (btnKey === 'visible') {
            resultType = visibleIconType
        }

        setIconType(
            'elBtnSign' + setUpperCaseForFirstLetter(resultType)
        )
    }, [btnKey, visibleIconType])

    return iconType
}

/** Хук возвращает тип значка кнопки изменения видимости */
export function useGetVisibleIconType() {
    const [iconType, setIconType] = useState('visible')

    // Текущий элемент истории статьи
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        if (!historyItem) {
            setIconType('visible')
            return
        }

        // Выделенный элемент и массив всех компонентов статьи
        const { selectedElem } = historyItem
        const { dComps } = historyItem.article

        // Если компонент не выделен, то поменять тип значка на visible
        if (!selectedElem.dataCompId) {
            setIconType('visible')
            return
        }

        let isHidden = true

        if (selectedElem.tagType === 'element') {
            // Получение элемента
            const dElem = articleManager.getDataElemInDataCompArr(
                dComps, selectedElem.dataCompId, selectedElem.dataElemId
            )

            isHidden = !([undefined, false].includes(dElem?.dCompElemLayer?.layerHidden))
        }
        else {
            // Получение компонента
            const dComp = articleManager.getComponent(
                dComps, selectedElem.dataCompId
            )

            if (dComp.dCompType === 'simpleTextComponent') return

            isHidden = !([undefined, false].includes(dComp?.dCompLayer?.layerHidden))
        }

        setIconType( isHidden ? 'hide' : 'visible' )
    }, [historyItem])

    return iconType
}
