import React from 'react'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'
import StoreArticleTypes from 'store/article/articleTypes'
import LayersConfigType from './LayersConfigType'
import { isCtrlPressed } from 'utils/domUtils'

/**
 * Функция возвращает строковое представление id компонента и элемента. Вроде '4_2'.
 * Это используется для атрибута key компонента <Layer /> и в массиве свёрнутых компонентов/элементов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function getKey(dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent, dElem?: ArticleTypes.ComponentElem): string {
    return dElem
        ? dComp.dCompId + '_' + dElem.dCompElemId
        : dComp.dCompId.toString()
}

/**
 * Функция возвращает имя компонента
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 */
export function getComponentName(tComps: TempCompTypes.TempComps, dComp: ArticleTypes.Component): string {
    const tComp = articleManager.getTemplate(tComps, dComp.tCompId)
    return tComp.content.name
}

/**
 * Функция возвращает имя элемента
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function getElementName(
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component,
    dElem: ArticleTypes.ComponentElem
): string {
    const tComp = articleManager.getTElemByTCompIdAndTElemId(tComps, dComp.tCompId, dElem.tCompElemId)
    return tComp.elemName
}

/**
 * Функция возвращает начало текста в текстовом компоненте
 * @param {Object} dTextComp — данные текстового компонента
 */
export function getTextComponentName(dTextComp: ArticleTypes.SimpleTextComponent): string {
    if (!dTextComp.text.length) {
        return ''
    }
    else if (dTextComp.text.length < 10) {
        return dTextComp.text
    }
    else {
        return dTextComp.text.slice(0, 10) + '...'
    }
}

/**
 * Функция возвращает булево значение свёрнут ли слой на панели слоёв
 * @param {Array} collapsedItems — массив ключей по которым можно определить свёрнутые компоненты/элементы
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function isItemCollapsed(
    collapsedItems: LayersConfigType.CollapsedItems,
    dComp: ArticleTypes.Component,
    dElem?: ArticleTypes.ComponentElem
) {
    const key = getKey(dComp, dElem)
    return collapsedItems.includes(key)
}

/**
 * Функция возвращает булево значение имеет ли элемент вложенные компоненты
 * @param {Object} dElem — данные элемента
 */
export function hasElementChildren(dElem: ArticleTypes.ComponentElem) {
    if (Array.isArray(dElem?.dCompElemChildren)) {
        if (dElem.dCompElemChildren.length) {
            return true
        }
    }

    return false
}

/**
 * Функция возвращает обработчик сворачивания/разворачивания слоя
 * @param {Array} collapsedItems — массив ключей по которым можно определить свёрнутые компоненты/элементы
 * @param {Function} setCollapsedItems — функция изменяющая массив ключей свёрнутых компонентов/элементов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 * @returns {() => void}
 */
export function getCollapseHandler(
    collapsedItems: LayersConfigType.CollapsedItems,
    setCollapsedItems: LayersConfigType.SetCollapsedItems,
    dComp: ArticleTypes.Component,
    dElem?: ArticleTypes.ComponentElem
) {
    return function () {
        const isCollapsed = isItemCollapsed(collapsedItems, dComp, dElem)
        // Строка где написаны id данных компонента и элемента
        const key = getKey(dComp, dElem)

        // Поставить или убрать ключ компонента/элемента в массив ключей свёрнутых слоёв
        if (isCollapsed) {
            setCollapsedItems(
                collapsedItems.filter(item => item !== key)
            )
        }
        else {
            setCollapsedItems(
                [...collapsedItems, key]
            )
        }
    }
}

/**
 * Функция возвращает булево значение скрыт ли слой
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 * @returns {boolean}
 */
export function isHidden(
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component,
    dElem?: ArticleTypes.ComponentElem
): boolean {
    // Если это компонент...
    if (!dElem) {
        return dComp.dCompLayer?.layerHidden || false
    }
    // Если это элемент
    else {
        // Является ли переданный элемент корневым?
        const isElemRoot = articleManager.isElemIsRootByDElem(tComps, dComp, dElem)
        // Слой скрыт если элемент является корневым и скрыт он либо компонент
        return isElemRoot && dComp.dCompLayer?.layerHidden || dElem.dCompElemLayer?.layerHidden
    }
}

/**
 * Функция возвращает функцию-обработчик нажатия на кнопку скрытия/раскрытия слоя
 * @param {Object} historyItem — объект истории статьи
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function getShowHideLayerHandler(
    historyItem: StoreArticleTypes.HistoryItem,
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    dElem?: ArticleTypes.ComponentElem
) {
    return function () {
        // Получить объект с координатами компонента/элемента у которого нужно поменять видимость
        const thisItemCoords = getShowHideLayerCoords(tComps, dComp, dElem)

        const compsAndMaxCompId = articleManager.changeVisibility(
            historyItem.article, thisItemCoords
        )

        store.dispatch(actions.article.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}

/**
 * Функция возвращает объект с координатами компонента/элемента у которого нужно поменять видимость
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
function getShowHideLayerCoords(
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    dElem?: ArticleTypes.ComponentElem
): StoreArticleTypes.FlashedElem {
    if (!dElem || dComp.dCompType === 'simpleTextComponent') {
        return {
            tagType: 'component',
            dataCompId: dComp.dCompId,
            dataElemId: null
        }
    }
    else {
        const tagType = articleManager.isElemIsRootByDElem(tComps, dComp, dElem)
            ? 'rootElement'
            : 'element'

        return {
            tagType: tagType,
            dataCompId: dComp.dCompId,
            dataElemId: dElem.dCompElemId
        }
    }
}

/**
 * Функция возвращает булево значение подсвечен ли компонент/элемент
 * @param {Object} historyItem — объект истории статьи
 * @param {String} flashType — тип подсветки: hover, select, moveHover или moveSelect
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function isFlashed(
    historyItem: StoreArticleTypes.HistoryItem,
    flashType: 'hover' | 'select' | 'moveHover' | 'moveSelect',
    dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    dElem?: ArticleTypes.ComponentElem
): boolean {
    const {
        hoveredElem, selectedElem, moveHoveredComp, moveSelectedComp, selectedTextComp
    } = historyItem

    // id данных переданного компонента/элемента
    const dCompId = dComp.dCompId
    const dElemId = dElem?.dCompElemId || null

    // Проверка того, что выделен текстовый компонент.
    // Остальные варианты подсветки для текстового компонента отсутствуют потому что
    // в текст можно только поставить фокус, то есть выделить.
    if (flashType === 'select') {
        if (selectedTextComp.dataCompId === dCompId) {
            return true
        }
    }

    if (flashType === 'hover') {
        return hoveredElem?.dataCompId === dCompId && hoveredElem.dataElemId === dElemId
    }
    else if (flashType === 'select') {
        return selectedElem?.dataCompId === dCompId && selectedElem.dataElemId === dElemId
    }
    else if (flashType === 'moveHover') {
        return moveHoveredComp?.dataCompId === dCompId && !dElemId
    }
    else if (flashType === 'moveSelect') {
        return moveSelectedComp?.dataCompId === dCompId && !dElemId
    }
}

/**
 * Функция возвращает булево значение содержится ли внутри переданного компонента/элемента выделенный компонент/элемент
 * @param {Object} historyItem — объект истории статьи
 * @param {String} selectionType — тип выделения: обычное или для перемещения
 * @param {Number} targetDCompId — данные компонента в котором требуется найти выделенный компонент/элемент
 * @param {Number} targetDElemId — данные элемента в котором требуется найти выделенный компонент/элемент
 */
export function hasSelectedChild(
    historyItem: StoreArticleTypes.HistoryItem,
    selectionType: 'select' | 'moveSelect',
    targetDCompId: ArticleTypes.Id,
    targetDElemId: null | ArticleTypes.Id,
): boolean {
    const { selectedElem, moveSelectedComp, article } = historyItem

    // Получение id данных компонента и элемента, который нужно найти
    let childDCompId: ArticleTypes.Id = null
    let childDElemId: ArticleTypes.Id = null

    if (selectionType === 'select') {
        childDCompId = selectedElem.dataCompId
        childDElemId = selectedElem.dataElemId
    }
    else if (selectionType === 'moveSelect') {
        childDCompId = moveSelectedComp.dataCompId
    }

    return articleManager.hasItemAnotherItem(
        article.dComps, targetDCompId, targetDElemId,
        childDCompId, childDElemId
    )
}


/**
 * Функция возвращает обработчики наведения и нажатия на слой.
 * Также там учитывается нажата ли клавиша CTRL.
 * В зависимости от наведения или нажатия и нажата ил CTRL компонент/элемент или подсвечиваются или выделяются.
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Array} dComps — массив компонентов статьи
 * @param {String} actionType — тип действий: наведение или щелчок
 * @param {String} itemType — тип компонента/элемента
 * @param {Number} dCompId — id данных компонента
 * @param {Number} dElemId — id данных элементе
 */
export function getMouseHandler(
    tempCompArr: TempCompTypes.TempComps,
    dComps: ArticleTypes.Components,
    actionType: 'hover' | 'select',
    itemType: 'component' | 'element' | 'text',
    dCompId: ArticleTypes.Id,
    dElemId: null | ArticleTypes.Id,
) {
    return function (e: React.MouseEvent) {

        // Тип действия изменяется в зависимости от того нажата ли клавиша CTRL
        const ctrlPressed = isCtrlPressed(e)

        if (ctrlPressed) {
            if (actionType === 'hover') {
                setFlashRectangle('moveHover', 'component', dCompId, null)
            }
            else if (actionType === 'select') {
                setFlashRectangle('moveSelect', 'component', dCompId, null)
            }

            return
        }

        if (dElemId) {
            const dComp = articleManager.getComponent(dComps, dCompId) as ArticleTypes.Component
            const dElem = articleManager.getDataElemInDataComp(dComp, dElemId)
            const isElemIsRoot = articleManager.isElemIsRootByDElem(tempCompArr, dComp, dElem)

            const tagType = isElemIsRoot ? 'rootElement' : 'element'
            setFlashRectangle(actionType, tagType, dCompId, dElemId)
        }
        else {
            if (itemType === 'component') {
                setFlashRectangle(actionType, 'component', dCompId, null)
            }
            else if (itemType === 'text') {
                setTextCompId(dCompId)
            }
        }
    }
}


/**
 * Функция запускает экшен подсвечивающий элемент
 * @param {String} actionType — тип подсветки: 'hover' | 'select' | 'moveHover' | 'moveSelect'
 * @param {Boolean} tagType — тип тега над которым завис курсор: component, rootElement или element
 * @param {Number} dataCompId — id данных компонента подсвечиваемого компонента/элемента
 * @param {Number} dataElemId — id данных элемента подсвечиваемого компонента/элемента
 */
function setFlashRectangle(
    actionType: StoreArticleTypes.FlashedElemType,
    tagType: StoreArticleTypes.FlashedTagType,
    dataCompId: number | null,
    dataElemId: number | null
) {
    store.dispatch( actions.article.setFlashRectangles(
        actionType, tagType, dataCompId, dataElemId
    ))
}

/**
 * Функция запускает экшен ставящий id данных выделенного текстового компонента
 * @param {Number} dataCompId — id данных выделенного текстового компонента
 */
function setTextCompId(dataCompId: number | null) {
    store.dispatch( actions.article.setTextComp(dataCompId))
}

/** Обработчик увода мыши из обёртки слоёв */
export function onMouseLeaveHandler() {
    // Обнулить наведённый элемент и наведённый для перемещения.
    setFlashRectangle('hover', null, null, null)
    setFlashRectangle('moveHover', null, null, null)
}