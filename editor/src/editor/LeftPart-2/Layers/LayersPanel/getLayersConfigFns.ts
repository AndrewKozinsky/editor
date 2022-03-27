import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { store } from 'store/rootReducer'
import StoreArticleTypes from 'store/article/articleTypes'
import articleActions from 'store/article/articleActions'
import articleManager from 'articleManager/articleManager'
import { isCtrlPressed } from 'utils/domUtils'
import { setFocusInTextComponent } from '../../../../articleManager/methods/misc'


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
        return 'Text...'
    }
    else if (dTextComp.text.length <= 10) {
        return dTextComp.text
    }
    else {
        return dTextComp.text.slice(0, 10) + '...'
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
    dComp: ArticleTypes.MixComponent,
    dElem?: ArticleTypes.ComponentElem,
): boolean {
    if (dComp.dCompType === 'simpleTextComponent') {
        return dComp.dCompLayer?.layerHidden
    }
    else {
        return dElem.dCompElemLayer?.layerHidden
    }
}

/**
 * Функция возвращает функцию-обработчик нажатия на кнопку скрытия/раскрытия слоя
 * @param {Object} historyItem — объект истории статьи
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 * @param {Boolean} isRootElem — это корневой элемент
 */
export function getShowHideLayerHandler(
    historyItem: StoreArticleTypes.HistoryItem,
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    dElem: null | ArticleTypes.ComponentElem,
    isRootElem: boolean
) {
    return function (e: any) {
        e.stopPropagation()

        // Получить объект с координатами элемента у которого нужно поменять видимость
        const thisItemCoords = getShowHideLayerCoords(tComps, dComp, dElem, isRootElem)

        const compsAndMaxCompId = articleManager.changeVisibility(
            historyItem.article, thisItemCoords
        )

        store.dispatch(articleActions.createAndSetHistoryItem(
            compsAndMaxCompId
        ))
    }
}

/**
 * Функция возвращает объект с координатами компонента/элемента у которого нужно поменять видимость
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 * @param {Boolean} isRootElem — это корневой элемент
 */
function getShowHideLayerCoords(
    tComps: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    dElem: null | ArticleTypes.ComponentElem,
    isRootElem: boolean
): StoreArticleTypes.FlashedElem {
    if (dComp.dCompType === 'simpleTextComponent') {
        return {
            tagType: 'textComponent',
            dataCompId: dComp.dCompId,
            dataElemId: null
        }
    }
    else {
        const tagType = isRootElem ? 'rootElement' : 'element'

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
        hoveredElem, selectedElem, moveHoveredComp, moveSelectedComp
    } = historyItem

    // id данных переданного компонента/элемента
    const dCompId = dComp.dCompId
    const dElemId = dElem?.dCompElemId || null

    if (flashType === 'hover') {
        return hoveredElem?.dataCompId === dCompId && hoveredElem.dataElemId === dElemId
    }
    else if (flashType === 'select') {
        return selectedElem?.dataCompId === dCompId && selectedElem.dataElemId === dElemId
    }
    else if (flashType === 'moveHover') {
        return moveHoveredComp?.dataCompId === dCompId && moveHoveredComp?.dataElemId === dElemId
    }
    else if (flashType === 'moveSelect') {
        return moveSelectedComp?.dataCompId === dCompId && moveSelectedComp?.dataElemId === dElemId
    }
}

/**
 * Функция возвращает обработчики наведения и нажатия на слой.
 * Также там учитывается нажата ли клавиша CTRL.
 * В зависимости от наведения или нажатия и нажата ил CTRL компонент/элемент или подсвечиваются или выделяются.
 * @param {String} actionType — тип действий: наведение или щелчок
 * @param {String} itemType — тип компонента/элемента
 * @param {Number} dCompId — id данных компонента
 * @param {Number} dElemId — id данных элементе
 * @param {Boolean} isRootElem — является ли элемент корневым
 */
export function getMouseHandler(
    actionType: 'hover' | 'select',
    itemType: 'rootElement' | 'element' | 'textComponent',
    dCompId: ArticleTypes.Id,
    dElemId: null | ArticleTypes.Id,
    isRootElem: boolean
) {
    return function (e: React.MouseEvent) {
        // Тип действия изменяется в зависимости от того нажата ли клавиша CTRL
        const ctrlPressed = isCtrlPressed(e)

        if (ctrlPressed) {
            if (isRootElem) {
                const moveType = actionType === 'hover' ? 'moveHover' : 'moveSelect'
                setFlashRectangle(moveType, 'rootElement', dCompId, dElemId)
            }

            return
        }

        // Если щёлкнули по слою текстового компонента, то поставить фокус на текстовый компонент в статье
        if (itemType === 'textComponent' && actionType === 'select') {
            const $iFrameDoc = document.querySelector('iframe').contentWindow.document
            articleManager.setFocusInTextComponent($iFrameDoc, dCompId)
        }

        setFlashRectangle(actionType, itemType, dCompId, dElemId)
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
    store.dispatch( articleActions.setFlashRectangles(
        actionType, tagType, dataCompId, dataElemId
    ))
}

/** Обработчик увода мыши из обёртки слоёв */
export function onMouseLeaveHandler() {
    // Обнулить наведённый элемент и наведённый для перемещения.
    setFlashRectangle('hover', null, null, null)
    setFlashRectangle('moveHover', null, null, null)
}
