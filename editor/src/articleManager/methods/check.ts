import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'

/**
 * Функция проверяющая работоспособность кнопки перемещения перемещаемого компонента
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Array} dataCompArr — массив всех компонентов
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 */
export function canMoveCompMoveToProperPosition(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    dataCompArr: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id
) {
    // Нельзя перемещать если перемещаемый компонент не выделен
    if (!moveCompId) return false

    // Если выделен перемещаемый компонент, но не выделен целевой,
    // то перемещаемый можно переместить в конец массива, где он сейчас находится
    if (moveCompId && !targetCompCoords.dataCompId) return true

    // Если выделили элемент
    if (targetCompCoords.dataCompId && targetCompCoords.dataElemId) {
        // Если выделен целевой элемент и туда можно переместить перемещаемый компонент
        return this.canComponentPutInElement(
            tempCompArr, dataCompArr, targetCompCoords, moveCompId
        )
    }

    return false
}

/**
 * The function check can you insert a component into the target element
 * Функция используется для вычисления может ли компонент в списке компонентов быть вставлен в выделенный элемент.
 * Для кнопки Вставка перемещаемого компонента в другой элемент используется функция
 * @param {Array} tempCompArr — components templates array
 * @param {Array} dataCompArr — array of data components
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 */
export function canComponentPutInElement(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    dataCompArr: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id
) {
    // Если не выделен целевой элемент и перемещаемый компонент, то нельзя вставить перемещаемый компонент
    if (!(targetCompCoords.dataCompId && targetCompCoords.dataElemId && moveCompId)) return false

    // Получение шаблона выделенного элемента
    const targetTElem = this.getTempElemByDataCompIdAndDataElemId(
        dataCompArr, targetCompCoords.dataCompId, targetCompCoords.dataElemId, tempCompArr
    )
    if (!targetTElem) return false

    // Перемещаемый компонент нельзя поместить в элемент, который может содержать только текстовый компонент
    if (targetTElem.elemTextInside) return false

    // Получение данных целевого компонента
    const targetDComp = this.getComponent(dataCompArr, targetCompCoords.dataCompId)

    if (targetDComp.dCompType === 'component') {
        // Если элемент имеет вложенные элементы, то туда нельзя вставить перемещаемый компонент
        const hasElemNestedElements = this.hasElemNestedElements(tempCompArr, targetDComp.tCompId, targetTElem.elemId)
        if (hasElemNestedElements) return false
    }

    // В остальных случаях перемещаемый компонент можно поместить в выделенный элемент
    return true
}


/**
 * The function checks if $element in component template html-string has children
 * @param {Array} tempCompArr — components templates array
 * @param {Number} tempCompId — component template id
 * @param {String} tempElemId — element template id
 */
export function hasElemNestedElements(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id,
    tempElemId: TempCompTypes.ElemId
) {
    // Get component template
    const tempComp =  this.getTemplate(tempCompArr, tempCompId)
    if (!tempComp) return true

    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(tempComp.content.html, 'text/html')
    const $component = doc.body.childNodes[0] as HTMLElement

    let $elem: HTMLElement = $component.closest(`[data-em-id=${tempElemId}]`)
    if (!$elem) $elem = $component.querySelector(`[data-em-id=${tempElemId}]`)
    if (!$elem) return true

    return !!$elem.childElementCount
}


/**
 * The function checks if I can make undo or redo history step
 * @param {String} step — step direction: undo OR redo
 * @param {Array} historyArr — articles history array
 * @param {Number} currentIdx — current history array index
 */
export function canMakeHistoryStep(
    this: typeof articleManager,
    step: 'undo' | 'redo',
    historyArr: StoreArticleTypes.HistoryItems,
    currentIdx: number
) {
    return (
        (step === 'undo' && currentIdx - 1 !== -1) ||
        (step === 'redo' && currentIdx + 1 < historyArr.length)
    )
}


/**
 * The function checks if an article is saved
 * @param historyStepWhenWasSave
 * @param historyCurrentIdx
 */
export function isArticleSave(
    this: typeof articleManager,
    historyStepWhenWasSave: number,
    historyCurrentIdx: number
) {
    return historyStepWhenWasSave === historyCurrentIdx
}

/**
 * Находится ли компонент в корне статьи?
 * @param {Array} dCompArr — массив компонентов статьи
 * @param {Number} targetDCompId — id проверяемого компонента
 * @returns {Boolean} — находится ли компонент в корне статьи?
 */
export function isCompInArticleRoot(
    this: typeof articleManager,
    dCompArr: ArticleTypes.Components,
    targetDCompId: ArticleTypes.Id,
) {
    return !!(dCompArr.find(dComp => dComp.dCompId === targetDCompId))
}

/**
 * Находятся ли компоненты в одном массиве?
 * @param {Array} dCompArr — массив компонентов статьи
 * @param {Number} firstDCompId — id первого компонента
 * @param {Number} secondDCompId — id второго компонента
 */
export function isCompsInTheSameArr(
    this: typeof articleManager,
    dCompArr: ArticleTypes.Components,
    firstDCompId: ArticleTypes.Id,
    secondDCompId: ArticleTypes.Id,
) {
    // Массив, в котором находится первый компонент
    const firstCompParentArr = this.getCompParentArray(dCompArr, firstDCompId)
    return this.isCompInArray(firstCompParentArr, secondDCompId)
}

/**
 * Находится ли компонент в переданном массиве?
 * @param {Array} array — массив, в котором, возможно, находится компонент
 * @param {Number} targetDCompId — id искомого компонента
 * @returns {Boolean} — находится ли компонент в переданном массиве?
 */
export function isCompInArray(
    this: typeof articleManager,
    array: ArticleTypes.ElemChildren,
    targetDCompId: ArticleTypes.Id,
) {
    if (!Array.isArray(array)) return false
    return !!(array.find(comp => comp.dCompId === targetDCompId))
}