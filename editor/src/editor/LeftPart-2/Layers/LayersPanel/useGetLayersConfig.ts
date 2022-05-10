import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import LayersConfigType from './LayersConfigType'
import {
    getElementName,
    getMouseHandler,
    getShowHideLayerHandler,
    getTextComponentName,
    isFlashed
} from './getLayersConfigFns'

/** Хук возвращает массив с конфигурацией слоёв */
export default function useGetLayersConfig() {
    const [layersConfig, setLayersConfig] = useState<LayersConfigType.Layers>([])

    const { tempComps, isArtDataCorrect } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    useEffect(function () {
        if (!historyItem || !tempComps || !isArtDataCorrect) return

        const layersConfig = getLayersConfig(
            historyItem,
            [],
            historyItem.article.dComps,
            0,
            tempComps,
            null,
            false
        )

        setLayersConfig(layersConfig)

    }, [historyItem, tempComps, isArtDataCorrect])

    return layersConfig
}

/**
 * Функция возвращает массив с данными по отрисовки всех слоёв
 * @param {Object} historyItem — объект истории статьи
 * @param {Array} configArr — массив с объектами конфигурации слоёв
 * @param {Array} dItems — массив данных компонентов/элементов
 * * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Number} offset — уровень вложенности слоя
 * @param {Object} dComp
 * @param {Boolean} isParentItemHidden — скрыт ли слой выше по иерархии
 */
function getLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dItems: ArticleTypes.Components | ArticleTypes.ComponentElems | ArticleTypes.ElemChildren,
    offset: number,
    tempComps: TempCompTypes.TempComps,
    dComp: null | ArticleTypes.Component,
    isParentItemHidden: boolean
): LayersConfigType.Layers {
    if (!Array.isArray(dItems)) return

    dItems.forEach(dItem => {
        // Если это обычный компонент...
        if ('dCompType' in dItem && dItem.dCompType === 'component') {
            getElemLayersConfig(historyItem, configArr, dItem.dElems, offset, tempComps, dItem, true, isParentItemHidden)
        }
        // Если это текстовый компонент...
        else if ('dCompType' in dItem && dItem.dCompType === 'simpleTextComponent') {
            getTextLayersConfig(historyItem, configArr, dItem, offset, tempComps, isParentItemHidden)
        }
        // Если это элемент...
        else if ('dCompElemId' in dItem) {
            getElemLayersConfig(historyItem, configArr, dItem, offset, tempComps, dComp, false, isParentItemHidden)
        }
    })

    return configArr
}


/*
* Создание из элемента компонента объекта данных для отрисовки слоя
* @param {Object} historyItem — объект истории
* @param {Array} configArr — массив с объектами конфигураций для отрисовки слоёв (наполняется в результате работы функций)
* @param {Object} dElem — данные элемента
* @param {Number} offset — уровень смещения элемента в слоях
* @param {Array} tempComps — массив шаблонов компонентов
* @param {Object} dComp — данные компонента которому принадлежит элемент
* @param {Boolean} isRootElem — является ли элемент корневым
* @param {Boolean} isParentItemHidden — скрыт ли слой выше по иерархии
 */
function getElemLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dElem: ArticleTypes.ComponentElem,
    offset: number,
    tempComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component,
    isRootElem: boolean,
    isParentItemHidden: boolean
) {
    // Тип элемента: корневой или вложенный
    const itemType = isRootElem ? 'rootElement' : 'element'
    const isThisLayerHidden = articleManager.isItemHidden(dComp, dElem)

    configArr.push(
        {
            type: itemType,
            name: getElementName(tempComps, dComp, dElem),
            parentLayerHidden: isParentItemHidden,
            hidden: isThisLayerHidden,
            offset,
            hovered: isFlashed(historyItem, 'hover', dComp, dElem),
            selected: isFlashed(historyItem, 'select', dComp, dElem),
            moveHovered: isFlashed(historyItem, 'moveHover', dComp, dElem),
            moveSelected: isFlashed(historyItem, 'moveSelect', dComp, dElem),
            showHideHandler: getShowHideLayerHandler(historyItem, tempComps, dComp, dElem, isRootElem),
            onClickHandler: getMouseHandler(
                'select', itemType, dComp, dElem.dCompElemId, isRootElem, isParentItemHidden
            ),
            onMouseEnterHandler: getMouseHandler(
                'hover', itemType, dComp, dElem.dCompElemId, isRootElem, isParentItemHidden
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
            dComp,
            isParentItemHidden || isThisLayerHidden
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
            isParentItemHidden || isThisLayerHidden
        )
    }
}


/**
 * Создание из текстового компонента объекта данных для отрисовки слоя
 * @param {Object} historyItem — объект истории
 * @param {Array} configArr — массив с объектами конфигураций для отрисовки слоёв (наполняется в результате работы функций)
 * @param {Object} dComp — данные текстового компонента
 * @param {Number} offset — уровень смещения компонента в слоях
 * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Boolean} isParentItemHidden — скрыт ли слой выше по иерархии
 */
function getTextLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    configArr: LayersConfigType.Layers,
    dComp: ArticleTypes.SimpleTextComponent,
    offset: number,
    tempComps: TempCompTypes.TempComps,
    isParentItemHidden: boolean
) {
    configArr.push(
        {
            type: 'text',
            name: getTextComponentName(dComp),
            parentLayerHidden: isParentItemHidden,
            hidden: articleManager.isItemHidden(dComp),
            offset,
            hovered: isFlashed(historyItem, 'hover', dComp),
            selected: isFlashed(historyItem, 'select', dComp),
            moveHovered: isFlashed(historyItem, 'moveHover', dComp, null),
            moveSelected: isFlashed(historyItem, 'moveSelect', dComp, null),
            showHideHandler: getShowHideLayerHandler(historyItem, tempComps, dComp, null, false),
            onClickHandler: getMouseHandler(
                'select', 'textComponent', dComp, null, true, isParentItemHidden
            ),
            onMouseEnterHandler: getMouseHandler(
                'hover', 'textComponent', dComp, null, true, isParentItemHidden
            ),
        }
    )
}

