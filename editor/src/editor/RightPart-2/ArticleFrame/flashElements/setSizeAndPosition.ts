import StoreArticleTypes from 'store/article/articleTypes'

export type FlashRectType = 'hover' | 'select' | 'movehover' | 'moveselect'
type ScrollObjType = { top: number, left: number }

/**
 * The function sets visibility, size and position for flashed rectangle
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {String} type — type of flashed rectangle: hover | select | movehover | moveselect
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Element} $flashRect — a link to a flashed rectangle
 */
export default function setSizeAndPosition(
    $links: StoreArticleTypes.LinksObj,
    type: FlashRectType,
    rectCoords: StoreArticleTypes.FlashedElem,
    $flashRect: HTMLElement,
) {
    // 1. Get element by coordinates
    const $element = getArticleElementByCoordinates($links.$body, type, rectCoords)

    // Hide flashed rectangle if an element didn't found
    if (!$element) {
        hideRect(type, $flashRect)
        return
    }

    // Объект с данными по прокрутке окна iFrame-а.
    const scrollObj: ScrollObjType  = {
        top: $links.$window.scrollY,
        left: $links.$window.scrollX,
    }

    // 2. Get the article element rectangle coordinates
    const coords = getCoordinates($element, type, rectCoords, scrollObj)

    // 3. Set coordinates to the rectangle coordinates
    positionFlashRect($flashRect, coords, rectCoords)
}

/**
 * The function finds element by dataCompId, dataElemId and type
 * @param {HTMLBodyElement} $body — ссылка на <body> с разметкой шаблона
 * @param {String} type — тип подсветки: hover | select | movehover | moveselect
 * @param {Object} rectCoords — id данных элемента и компонента над которым стоит курсор
 */
function getArticleElementByCoordinates($body: HTMLBodyElement, type: FlashRectType, rectCoords: StoreArticleTypes.FlashedElem): null | HTMLElement {
    // Return null if cursor is not on component/element
    if (!rectCoords.dataCompId) return null

    // Create query string to find component/element under cursor
    let queryStr = ''

    if (type === 'hover' || type === 'select') {
        if (['textComponent', 'rootElement'].includes(rectCoords.tagType)) {
            queryStr = `[data-em-d-gen-comp-id="${rectCoords.dataCompId}"]`
        }
        else if (rectCoords.tagType === 'element') {
            queryStr = `[data-em-d-comp-id="${rectCoords.dataCompId}"][data-em-d-elem-id="${rectCoords.dataElemId}"]`
        }
    }
    else if (type === 'movehover' || type === 'moveselect') {
        queryStr = `[data-em-d-gen-comp-id="${rectCoords.dataCompId}"]`
    }

    // Return a founded element
    return $body.querySelector(queryStr)
}

/**
 * The function hides element by style
 * @param type
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
function hideRect(type: FlashRectType, $flashRect: HTMLElement) {
    if (!$flashRect) return

    $flashRect.style.display = 'none'
}

/**
 * The function returns coordinates of flashed rectangle depending on flashed element in article
 * @param {HTMLElement} articleElement — flashed element in article
 * @param {String} type — тип подсветки: hover | select | movehover | moveselect
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Number} scrollObj — данные по прокрутке iFrame-а.
 */
function getCoordinates(
    articleElement: HTMLElement,
    type: FlashRectType,
    rectCoords: StoreArticleTypes.FlashedElem,
    scrollObj: ScrollObjType
): CoordsType {
    // Get a flashed element's coordinates object
    const coords = articleElement.getBoundingClientRect()

    // Offset from flashed element in article to flashed rectangle depends on type
    const lineWidth = (type === 'hover' || type === 'movehover') ? 1 : 2

    return {
        top: coords.top + scrollObj.top + 'px',
        left: coords.left + scrollObj.left + 'px',
        width: coords.width - lineWidth * 2 + 'px',
        height: coords.height - lineWidth * 2 + 'px'
    }
}

type CoordsType = {
    top: string
    left: string
    width: string
    height: string
}

/**
 * The function sets visibility, size and position to flashed rectangle
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 * @param {Object} coords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 */
function positionFlashRect($flashRect: HTMLElement, coords: CoordsType, rectCoords: StoreArticleTypes.FlashedElem) {
    if (!$flashRect) return

    // Make rectangle visible
    $flashRect.style.display = 'block'

    //Set coordinates to an element
    $flashRect.style.top = coords.top
    $flashRect.style.left = coords.left
    $flashRect.style.width = coords.width
    $flashRect.style.height = coords.height
}
