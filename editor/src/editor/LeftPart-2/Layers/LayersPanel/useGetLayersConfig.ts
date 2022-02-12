import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import LayersConfigType from './LayersConfigType'
import { getElementName, getMouseHandler, getShowHideLayerHandler, getTextComponentName, isFlashed, isHidden } from './getLayersConfigFns'

/** Хук возвращает массив с конфигурацией слоёв */
export default function useGetLayersConfig() {
    const [layersConfig, setLayersConfig] = useState<LayersConfigType.Layers>([])

    const { tempComps } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        if (!historyItem || !tempComps?.length) return

        const layersConfig = getLayersConfig(
            historyItem,
            [],
            historyItem.article.dComps,
            0,
            tempComps,
            null
        )

        setLayersConfig(layersConfig)

    }, [historyItem, tempComps])

    return layersConfig
}

/**
 * Функция возвращает массив с конфигурациями всех слоёв
 * @param {Object} historyItem — объект истории статьи
 * @param {Array} dItems — массив данных компонентов/элементов
 * @param {Array} configArr — массив с объектами конфигурации слоёв
 * @param tempComps
 * @param {Number} offset — уровень вложенности слоя
 * @param dComp
 */
function getLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dItems: ArticleTypes.Components | ArticleTypes.ComponentElems | ArticleTypes.ElemChildren,
    offset: number,
    tempComps: TempCompTypes.TempComps,
    dComp: null | ArticleTypes.Component
): LayersConfigType.Layers {
    if (!Array.isArray(dItems)) return

    dItems.forEach(dItem => {
        // Если это обычный компонент
        if ('dCompType' in dItem && dItem.dCompType === 'component') {
            getCompLayersConfig(historyItem, configArr, dItem, offset, tempComps)
        }
        // Если это текстовый компонент
        else if ('dCompType' in dItem && dItem.dCompType === 'simpleTextComponent') {
            getTextLayersConfig(historyItem, configArr, dItem, offset, tempComps)
        }
        // Если это элемент...
        else if ('dCompElemId' in dItem) {
            getElemLayersConfig(historyItem, configArr, dItem, offset, tempComps, dComp, false)
        }
    })

    return configArr
}

function getCompLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dComp: ArticleTypes.Component,
    offset: number,
    tempComps: TempCompTypes.TempComps,
) {
    getElemLayersConfig(
        historyItem,
        configArr,
        dComp.dElems,
        offset,
        tempComps,
        dComp,
        true,
    )
}

function getTextLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dComp: ArticleTypes.SimpleTextComponent,
    offset: number,
    tempComps: TempCompTypes.TempComps,
) {
    configArr.push(
        {
            type: 'text',
            name: getTextComponentName(dComp),
            hidden: isHidden(tempComps, dComp),
            offset,
            hovered: isFlashed(historyItem, 'hover', dComp),
            selected: isFlashed(historyItem, 'select', dComp),
            moveHovered: isFlashed(historyItem, 'moveHover', dComp, null),
            moveSelected: isFlashed(historyItem, 'moveSelect', dComp, null),
            showHideHandler: getShowHideLayerHandler(historyItem, tempComps, dComp, null, false),
            onClickHandler: getMouseHandler(
                'select', 'textComponent', dComp.dCompId, null, true
            ),
            onMouseEnterHandler: getMouseHandler(
                'hover', 'textComponent', dComp.dCompId, null, true
            ),
        }
    )
}

function getElemLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dElem: ArticleTypes.ComponentElem,
    offset: number,
    tempComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component,
    isRootElem: boolean
) {
    const itemType = isRootElem ? 'rootElement' : 'element'

    configArr.push(
        {
            type: itemType,
            name: getElementName(tempComps, dComp, dElem),
            hidden: isHidden(tempComps, dComp, dElem),
            offset,
            hovered: isFlashed(historyItem, 'hover', dComp, dElem),
            selected: isFlashed(historyItem, 'select', dComp, dElem),
            moveHovered: isFlashed(historyItem, 'moveHover', dComp, dElem),
            moveSelected: isFlashed(historyItem, 'moveSelect', dComp, dElem),
            showHideHandler: getShowHideLayerHandler(historyItem, tempComps, dComp, dElem, isRootElem),
            onClickHandler: getMouseHandler(
                'select', itemType, dComp.dCompId, dElem.dCompElemId, isRootElem
            ),
            onMouseEnterHandler: getMouseHandler(
                'hover', itemType, dComp.dCompId, dElem.dCompElemId, isRootElem
            ),
        }
    )

    // Если есть вложенные элементы
    if (dElem.dCompElemInnerElems) {
        getLayersConfig(
            historyItem,
            configArr,
            dElem.dCompElemInnerElems,
            offset + 1,
            tempComps,
            dComp
        )
    }

    // Если есть вложенные компоненты
    if (dElem.dCompElemChildren) {
        getLayersConfig(
            historyItem,
            configArr,
            dElem.dCompElemChildren,
            offset + 1,
            tempComps,
            null,
        )
    }
}