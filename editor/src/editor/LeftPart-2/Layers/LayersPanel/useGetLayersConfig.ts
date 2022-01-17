import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import LayersConfigType from './LayersConfigType'
import {
    getKey,
    getComponentName,
    getElementName,
    getTextComponentName,
    hasElementChildren,
    isItemCollapsed,
    getCollapseHandler,
    getShowHideLayerHandler,
    isHidden,
    isFlashed,
    hasSelectedChild,
    getMouseHandler
} from './getLayersConfigFns'

/** Хук возвращает массив с конфигурацией слоёв */
export default function useGetLayersConfig() {
    const [layersConfig, setLayersConfig] = useState<LayersConfigType.Layers>([])

    const { tempComps } = useGetArticleSelectors()
    const historyItem = articleManager.hooks.getCurrentHistoryItem()

    // Массив ключей по которым можно определить свёрнутые компоненты/элементы
    const [collapsedItems, setCollapsedItems] = useState<LayersConfigType.CollapsedItems>([])

    useEffect(function () {
        if (!historyItem || !tempComps?.length) return

        const layersConfig = getLayersConfig(
            historyItem, tempComps, historyItem.article.dComps, [], 0, null, collapsedItems, setCollapsedItems
        )

        setLayersConfig(layersConfig)
    }, [historyItem, tempComps, collapsedItems])

    return layersConfig
}

/**
 * Функция возвращает массив с конфигурациями всех слоёв
 * @param {Object} historyItem — объект истории статьи
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Array} dItems — массив данных компонентов/элементов
 * @param {Array} configArr — массив с объектами конфигурации слоёв
 * @param {Number} offset — уровень вложенности слоя
 * @param {Object} dComp — данные компонента
 * @param {Array} collapsedItems — массив ключей по которым можно определить свёрнутые компоненты/элементы
 * @param {Function} setCollapsedItems — функция изменяющая массив ключей свёрнутых компонентов/элементов
 */
function getLayersConfig(
    historyItem: StoreArticleTypes.HistoryItem,
    tComps: TempCompTypes.TempComps,
    dItems: ArticleTypes.Components | ArticleTypes.ComponentElems | ArticleTypes.ElemChildren,
    configArr: LayersConfigType.Layers,
    offset: number,
    dComp: null | ArticleTypes.Component,
    collapsedItems: LayersConfigType.CollapsedItems,
    setCollapsedItems: LayersConfigType.SetCollapsedItems,
): LayersConfigType.Layers {
    if (!Array.isArray(dItems)) return

    dItems.forEach(dItem => {

        // Если это компонент...
        if ('dCompType' in dItem) {
            // Обычный компонент
            if (dItem.dCompType === 'component') {
                const isCollapsed = isItemCollapsed(collapsedItems, dItem)

                configArr.push(
                    {
                        key: getKey(dItem),
                        type: 'component',
                        dCompId: dItem.dCompId,
                        dElemId: null,
                        name: getComponentName(tComps, dItem),
                        collapsed: isCollapsed,
                        offset: offset,
                        hasChildren: !!(dItem.dElems?.length),
                        hidden: isHidden(tComps, dItem),
                        hovered: isFlashed(historyItem, 'hover', dItem),
                        selected: isFlashed(historyItem, 'select', dItem),
                        moveHovered: isFlashed(historyItem, 'moveHover', dItem),
                        moveSelected: isFlashed(historyItem, 'moveSelect', dItem),
                        parentLayerHidden: articleManager.isParentElemHidden(historyItem.article.dComps, dItem, ),
                        hasSelectedChild: hasSelectedChild(historyItem, 'select', dItem.dCompId, null),
                        hasMovedChild: hasSelectedChild(historyItem, 'moveSelect', dItem.dCompId, null),
                        collapseHandler: getCollapseHandler(collapsedItems, setCollapsedItems, dItem),
                        showHideHandler: getShowHideLayerHandler(historyItem, tComps, dItem),
                        onClickHandler: getMouseHandler(tComps, historyItem.article.dComps, 'select', 'component', dItem.dCompId, null),
                        onMouseEnterHandler: getMouseHandler(tComps, historyItem.article.dComps, 'hover', 'component', dItem.dCompId, null),
                    }
                )

                // Перебор массива элементов...
                if (dItem.dElems && !isCollapsed) {
                    getLayersConfig(
                        historyItem, tComps, dItem.dElems, configArr, offset + 1, dItem,
                        collapsedItems, setCollapsedItems
                    )
                }
            }
        }

        // Если это элемент...
        if ('dCompElemId' in dItem) {
            const isCollapsed = isItemCollapsed(collapsedItems, dComp, dItem)

            configArr.push(
                {
                    key: getKey(dComp, dItem),
                    type: 'element',
                    dCompId: dComp.dCompId,
                    dElemId: dItem.dCompElemId,
                    name: getElementName(tComps, dComp, dItem),
                    collapsed: isCollapsed,
                    offset: offset,
                    hasChildren: hasElementChildren(dItem),
                    hidden: isHidden(tComps, dComp, dItem),
                    hovered: isFlashed(historyItem, 'hover', dComp, dItem),
                    selected: isFlashed(historyItem, 'select', dComp, dItem),
                    moveHovered: isFlashed(historyItem, 'moveHover', dComp, dItem),
                    moveSelected: isFlashed(historyItem, 'moveSelect', dComp, dItem),
                    parentLayerHidden: articleManager.isParentElemHidden(historyItem.article.dComps, dComp, dItem, ),
                    hasSelectedChild: hasSelectedChild(historyItem, 'select', dComp.dCompId, dItem.dCompElemId),
                    hasMovedChild: hasSelectedChild(historyItem, 'moveSelect', dComp.dCompId, dItem.dCompElemId),
                    collapseHandler: getCollapseHandler(collapsedItems, setCollapsedItems, dComp, dItem),
                    showHideHandler: getShowHideLayerHandler(historyItem, tComps, dComp, dItem),
                    onClickHandler: getMouseHandler(
                        tComps, historyItem.article.dComps, 'select', 'element', dComp.dCompId, dItem.dCompElemId
                    ),
                    onMouseEnterHandler: getMouseHandler(
                        tComps, historyItem.article.dComps, 'hover', 'element', dComp.dCompId, dItem.dCompElemId
                    ),
                }
            )

            // Если есть вложенные компоненты
            if (dItem.dCompElemChildren && !isCollapsed) {
                // Если там массив компонентов
                if (Array.isArray(dItem.dCompElemChildren)) {
                    getLayersConfig(
                        historyItem, tComps, dItem.dCompElemChildren, configArr, offset + 1, null,
                        collapsedItems, setCollapsedItems
                    )
                }
                // Если там текстовый компонент
                else {
                    configArr.push(
                        {
                            key: getKey(dItem.dCompElemChildren),
                            type: 'text',
                            dCompId: dItem.dCompElemChildren.dCompId,
                            dElemId: null,
                            name: getTextComponentName(dItem.dCompElemChildren),
                            collapsed: false,
                            offset: offset + 1,
                            hasChildren: false,
                            hidden: false,
                            hovered: false,
                            selected: isFlashed(historyItem, 'select', dItem.dCompElemChildren),
                            moveHovered: false,
                            moveSelected: false,
                            parentLayerHidden: articleManager.isParentElemHidden(historyItem.article.dComps, dItem.dCompElemChildren),
                            hasSelectedChild: false,
                            hasMovedChild: false,
                            showHideHandler: getShowHideLayerHandler(historyItem, tComps, dItem.dCompElemChildren),
                            onClickHandler: getMouseHandler(
                                tComps, historyItem.article.dComps, 'select', 'text', dItem.dCompElemChildren.dCompId, null
                            ),
                        }
                    )
                }
            }
        }
    })

    return configArr
}
