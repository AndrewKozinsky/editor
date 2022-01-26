import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import LayersConfigType from './LayersConfigType'
import {
    getKey,
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

        // setTimeout нужен чтобы успел отработать код добавляющий в статью данные о корневом элементе у каждого компонента
        // Как только сделаешь свойство allowRender, то от этого можно будет избавиться.
        setTimeout(function () {
            const layersConfig = getLayersConfig(
                historyItem, tempComps, historyItem.article.dComps, [], 0, null, collapsedItems, setCollapsedItems
            )

            setLayersConfig(layersConfig)
        }, 0)

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

                // Перебор массива элементов...
                if (dItem.dElems) {
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

            // Получение данных корневого элемента
            const rootTElem = articleManager.getRootTElemByTComps(tComps, dComp.tCompId)
            const rootDElem = articleManager.getDElemByTElem(dComp, rootTElem.elemId)

            // Является ли текущий элемент корневым?
            const isRootElem = rootDElem.dCompElemId === dItem.dCompElemId
            const itemType = isRootElem ? 'rootElement' : 'element'

            configArr.push(
                {
                    key: getKey(dComp, dItem),
                    type: itemType,
                    dCompId: dComp.dCompId,
                    dElemId: dItem.dCompElemId,
                    name: getElementName(tComps, dComp, dItem),
                    collapsed: isCollapsed,
                    offset,
                    hasChildren: hasElementChildren(dItem),
                    hidden: isHidden(tComps, dComp, dItem),
                    hovered: isFlashed(historyItem, 'hover', dComp, dItem),
                    selected: isFlashed(historyItem, 'select', dComp, dItem),
                    moveHovered: isFlashed(historyItem, 'moveHover', dComp, dItem),
                    moveSelected: isFlashed(historyItem, 'moveSelect', dComp, dItem),
                    parentLayerHidden: articleManager.isParentElemHidden(historyItem.article.dComps, dComp, dItem),
                    hasSelectedChild: hasSelectedChild(historyItem, 'select', dComp.dCompId, dItem.dCompElemId),
                    hasMovedChild: hasSelectedChild(historyItem, 'moveSelect', dComp.dCompId, dItem.dCompElemId),
                    collapseHandler: getCollapseHandler(collapsedItems, setCollapsedItems, dComp, dItem),
                    showHideHandler: getShowHideLayerHandler(historyItem, tComps, dComp, dItem, isRootElem),
                    onClickHandler: getMouseHandler(
                        'select', itemType, dComp.dCompId, dItem.dCompElemId
                    ),
                    onMouseEnterHandler: getMouseHandler(
                        'hover', itemType, dComp.dCompId, dItem.dCompElemId
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
                            offset: offset + 2,
                            hasChildren: false,
                            hidden: isHidden(tComps, dItem.dCompElemChildren),
                            hovered: isFlashed(historyItem, 'hover', dItem.dCompElemChildren),
                            selected: isFlashed(historyItem, 'select', dItem.dCompElemChildren),
                            moveHovered: false,
                            moveSelected: false,
                            parentLayerHidden: articleManager.isParentElemHidden(historyItem.article.dComps, dItem.dCompElemChildren),
                            hasSelectedChild: false,
                            hasMovedChild: false,
                            showHideHandler: getShowHideLayerHandler(historyItem, tComps, dItem.dCompElemChildren, null, false),
                            onClickHandler: getMouseHandler(
                                'select', 'textComponent', dItem.dCompElemChildren.dCompId, null
                            ),
                            onMouseEnterHandler: getMouseHandler(
                                'hover', 'textComponent', dItem.dCompElemChildren.dCompId, null
                            ),
                        }
                    )
                }
            }
        }
    })

    return configArr
}
