import { useEffect, useState } from 'react'
import { setUpperCaseForFirstLetter } from 'utils/stringUtils'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import iconsCollector from 'common/icons/js/getIcon'

/**
 * Хук возвращает тип значка у кнопок
 * @param {String} btnKey — тип кнопки
 */
export function useGetIconType(btnKey: string) {
    const [iconType, setIconType] = useState<keyof typeof iconsCollector>('elBtnSignVisible')
    const visibleIconType = useGetVisibleIconType()

    useEffect(function () {
        let resultType = btnKey

        if (btnKey === 'visible') {
            resultType = visibleIconType
        }

        // @ts-ignore
        setIconType('elBtnSign' + setUpperCaseForFirstLetter(resultType))
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

        if (['rootElement', 'element'].includes(selectedElem.tagType)) {
            // Получение элемента
            const dElem = articleManager.getDataElemInDataCompArr(
                dComps, selectedElem.dataCompId, selectedElem.dataElemId
            )

            isHidden = !([undefined, false].includes(dElem?.dCompElemLayer?.layerHidden))
        }
        else if (selectedElem.tagType === 'textComponent') {
            // Получение компонента
            const dTextComp = articleManager.getComponent(
                dComps, selectedElem.dataCompId
            ) as ArticleTypes.SimpleTextComponent

            isHidden = !([undefined, false].includes(dTextComp?.dCompLayer?.layerHidden))
        }

        setIconType( isHidden ? 'hide' : 'visible' )
    }, [historyItem])

    return iconType
}
