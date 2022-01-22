import StoreArticleTypes from './articleTypes'

/**
 * Функция получает id данных компонента и элемента на котором стоит курсор и сравнивает их
 * с данными записанными в объект текущей истории статьи чтобы выяснить находится ли курсор на том же самом элементе,
 * что и был уже подсвечен.
 * @param {String} actionType — тип мыши: hover, select, moveHover, moveSelect
 * @param {Number} dataCompId — id данных компонента на котором стоит курсор мыши
 * @param {Number} dataElemId — id данных элемента на котором стоит курсор мыши
 * @param {Object} historyItem — объект истории статьи
 */
export function isCursorInTheSameElem(
    actionType: StoreArticleTypes.FlashedElemType,
    dataCompId: StoreArticleTypes.FlashedElemId,
    dataElemId: StoreArticleTypes.FlashedElemId,
    historyItem: StoreArticleTypes.HistoryItem
) {
    if (['hover', 'select'].includes(actionType)) {
        let flashedElem: StoreArticleTypes.FlashedElem

        if (actionType === 'hover') {
            flashedElem = historyItem.hoveredElem
        }
        else if (actionType === 'select') {
            flashedElem = historyItem.selectedElem
        }

        if (flashedElem.dataCompId === dataCompId && flashedElem.dataElemId === dataElemId) {
            return true
        }
    }
    else if (['moveHover', 'moveSelect'].includes(actionType)) {
        let flashedElem: StoreArticleTypes.FlashedElem

        if (actionType === 'moveHover') {
            flashedElem = historyItem.moveHoveredComp
        }
        else if (actionType === 'moveSelect') {
            flashedElem = historyItem.moveSelectedComp
        }

        if (flashedElem.dataCompId === dataCompId) {
            return true
        }
    }

    return false
}
