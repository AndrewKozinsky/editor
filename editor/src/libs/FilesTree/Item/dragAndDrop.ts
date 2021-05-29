import FilesTreeType from '../types'
import {
    hasFolderAnItem, showPlaceMark, moveItemTo
} from '../FilesTree/manageStateDataFunc'

/**
 * Обработчик начала перетаскивания
 * @param {Object} e — объект события
 */
export function handleDragStart(e: any) {
    e.target.style.opacity = 0.2
}

/**
 * Обработчик перетаскивания
 * @param {Object} e — объект события
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 */
export function handleDrag(
    e: any,
    itemData: FilesTreeType.Item,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn
) {
    e.preventDefault()

    // Папки или файл, над которым навис курсор.
    let itemBelow = <null | HTMLElement>document.elementFromPoint(e.clientX, e.clientY).closest('[data-ft-item]')
    if (!itemBelow) return

    // id папки или файла, над которым навис курсор.
    const itemBelowId = itemBelow.dataset.ftFolderItem || itemBelow.dataset.ftFileItem

    // Ничего не делать если сброс нельзя делать в этом месте
    if (!isDropAllowed(itemBelowId, itemData)) return

    // Определить позицию сброса
    const dropPlaceCoords = getDropPlaceCoords(e, itemBelow, itemBelowId, itemData)
    if(!dropPlaceCoords) return

    // Подсветить позицию сброса
    showPlaceMark(setItems, items, dropPlaceCoords.itemId, dropPlaceCoords.place)
}

/**
 * Обработчик отпускания мыши при перетаскивании
 * @param {Object} e — объект события
 */
export function handleDragOver(e: any) {
    e.preventDefault()
}

/**
 * Обработчик отпускания мыши при перетаскивании
 * @param {Object} e — объект события
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 */
export function handleDragEnd(
    e: any,
    itemData: FilesTreeType.Item,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn,
) {
    e.target.style.opacity = 1

    // Папки или файл, над которым навис курсор.
    let itemBelow = <null | HTMLElement>document.elementFromPoint(e.clientX, e.clientY).closest('[data-ft-item]')
    if (!itemBelow) return

    // id папки или файла, над которым навис курсор.
    const itemBelowId = itemBelow.dataset.ftFolderItem || itemBelow.dataset.ftFileItem

    // Ничего не делать если сброс нельзя делать в этом месте
    if (!isDropAllowed(itemBelowId, itemData)) return

    // Определить позицию сброса
    const dropPlaceCoords = getDropPlaceCoords(e, itemBelow, itemBelowId, itemData)
    if(!dropPlaceCoords) return

    // Обновить состояние списка папок чтобы перетаскиваемый элемент попал в указанное место
    moveItemTo(itemData.id, dropPlaceCoords.itemId, dropPlaceCoords.place, items, setItems)
}


// ================================================


/**
 * Функция определяет можно ли сбросить папку или файл в место где стоит курсор
 * @param {String} itemBelowId — id элемента под курсором
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 */
function isDropAllowed(
    itemBelowId: FilesTreeType.Id,
    itemData: FilesTreeType.Item
) {
    // Ничего не делать если не передан id
    if (!itemBelowId) return false

    // Ничего не делать если родительскую папку хотят поместить внутрь дочерней
    if (hasFolderAnItem(itemData, itemBelowId)) return false

    return true
}

/**
 * Функция возвращает объект вида: {itemId: '5', place: 'before'} с данными в каком элементе
 * и в каком месте элемента можно приземлить перетаскиваемый файл.
 * @param {Object} e — объект события
 * @param {HTMLElement} itemBelow — элемент под курсором
 * @param {String} itemBelowId — id элемента под курсором
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 */
function getDropPlaceCoords(
    e: any,
    itemBelow: HTMLElement,
    itemBelowId: FilesTreeType.Id,
    itemData: FilesTreeType.Item,
): {itemId: FilesTreeType.Id, place: FilesTreeType.PlaceMark} {
    // Расстояние до элемента с верха экрана и высота элемента под курсором
    const itemBelowY = itemBelow.getBoundingClientRect().top
    const itemBelowHeight = itemBelow.getBoundingClientRect().height

    // Ничего не делать если курсор находится над перемещаемым элементом
    if (itemBelowId === itemData.id) return

    // Если это папка
    if (itemBelow.dataset.ftFolderItem) {
        // Если курсор на верхней четверти файла
        if (itemBelowY + (itemBelowHeight / 4) > e.clientY) {
            // Вернуть id элемента и место, куда поставить перемещаемый элемент
            return {
                itemId: itemBelowId,
                place: 'before'
            }
        }
        // Если курсор на средней части папки
        else if (itemBelowY + ((itemBelowHeight / 4) * 3) > e.clientY) {
            // Вернуть id элемента и место, куда поставить перемещаемый элемент
            return {
                itemId: itemBelowId,
                place: 'inside'
            }
        }
        // Если курсор на нижней половине файла
        else {
            // Вернуть id элемента и место, куда поставить перемещаемый элемент
            return {
                itemId: itemBelowId,
                place: 'after'
            }
        }
    }
    // Если это файл
    else {
        // Если курсор на верхней половине файла
        if (itemBelowY + (itemBelowHeight / 2) > e.clientY) {
            // Вернуть id элемента и место, куда поставить перемещаемый элемент
            return {
                itemId: itemBelowId,
                place: 'before'
            }
        }
        // Если курсор на нижней половине файла
        else {
            // Вернуть id элемента и место, куда поставить перемещаемый элемент
            return {
                itemId: itemBelowId,
                place: 'after'
            }
        }
    }
}
