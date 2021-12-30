/**
 * The function sets visibility, size and position for flashed rectangle
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {String} type — type of flashed rectangle: hover | select | movehover | moveselect
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Element} $flashRect — a link to a flashed rectangle
 */
export function setSizeAndPosition($links, type, rectCoords, $flashRect) {
    // 1. Get element by coordinates
    const $element = getArticleElementByCoordinates($links.$body, type, rectCoords);
    // Hide flashed rectangle if an element didn't found
    if (!$element) {
        hideRect(type, $flashRect);
        return;
    }
    // Объект с данными по прокрутке окна iFrame-а.
    const scrollObj = {
        top: $links.$window.scrollY,
        left: $links.$window.scrollX,
    };
    // 2. Get the article element rectangle coordinates
    const coords = getCoordinates($element, type, rectCoords, scrollObj);
    // 3. Set coordinates to the rectangle coordinates
    positionFlashRect($flashRect, coords, rectCoords);
}
/**
 * The function finds element by dataCompId, dataElemId and type
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — тип подсветки: hover | select | movehover | moveselect
 * @param {Object} rectCoords — id данных элемента и компонента над которым стоит курсор
 */
function getArticleElementByCoordinates($body, type, rectCoords) {
    // Return null if cursor is not on component/element
    if (!rectCoords.dataCompId)
        return null;
    // Create query string to find component/element under cursor
    let queryStr = '';
    if (type === 'hover' || type === 'select') {
        if (rectCoords.dataElemId) {
            queryStr = `[data-em-d-comp-id="${rectCoords.dataCompId}"][data-em-d-elem-id="${rectCoords.dataElemId}"]`;
        }
        else {
            queryStr = `[data-em-d-gen-comp-id="${rectCoords.dataCompId}"]`;
        }
    }
    else if (type === 'movehover' || type === 'moveselect') {
        queryStr = `[data-em-d-gen-comp-id="${rectCoords.dataCompId}"]`;
    }
    // Return a founded element
    return $body.querySelector(queryStr);
}
/**
 * The function hides element by style
 * @param type
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
function hideRect(type, $flashRect) {
    $flashRect.style.display = 'none';
}
/**
 * The function returns coordinates of flashed rectangle depending on flashed element in article
 * @param {HTMLElement} articleElement — flashed element in article
 * @param {String} type — тип подсветки: hover | select | movehover | moveselect
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Number} scrollObj — данные по прокрутке iFrame-а.
 */
function getCoordinates(articleElement, type, rectCoords, scrollObj) {
    // Get a flashed element's coordinates object
    const coords = articleElement.getBoundingClientRect();
    // Offset from flashed element in article to flashed rectangle depends on type
    const offset = (type === 'hover' || type === 'movehover') ? 2 : 4;
    return {
        top: coords.top - offset + scrollObj.top + 'px',
        left: coords.left - offset + scrollObj.left + 'px',
        width: coords.width + offset + 'px',
        height: coords.height + offset + 'px'
    };
}
/**
 * The function sets visibility, size and position to flashed rectangle
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 * @param {Object} coords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 * @param {Object} rectCoords — object with coordinates of a flashed element: type, dataCompId, dataElemId
 */
function positionFlashRect($flashRect, coords, rectCoords) {
    // Make rectangle visible
    $flashRect.style.display = 'block';
    //Set coordinates to an element
    $flashRect.style.top = coords.top;
    $flashRect.style.left = coords.left;
    $flashRect.style.width = coords.width;
    $flashRect.style.height = coords.height;
}
//# sourceMappingURL=setSizeAndPosition.js.map
//# sourceMappingURL=setSizeAndPosition.js.map