import DragFilesTreeType from '../types'
import {
    getItemDataById,
    hasFolderAnItem,
    showPlaceMark,
    moveItemTo
} from '../StoreManage/manageState'

/**
 * Обработчик начала перетаскивания
 * @param {Object} e — объект события
 */
export function handleDragStart(e: any) {
    e.target.style.opacity = 0.2
}

/**
 * Обработчик перетаскивания и сброса перетаскиваемого элемента
 * @param {Object} e — объект события
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param {String} phase — когда должна отрабатывать функция: drag (перетаскивание), dragEnd (сброс)
 */
export function handleDrag(
    e: any,
    itemData: DragFilesTreeType.Item,
    items: DragFilesTreeType.Items,
    setItems: DragFilesTreeType.SetItems,
    after: DragFilesTreeType.After,
    phase: 'drag' | 'dragEnd'
) {
    if (phase === 'drag') {
        e.preventDefault()
    }
    else if (phase === 'dragEnd') {
        e.target.style.opacity = 1
    }

    // Папка или файл, над которым навис курсор.
    let $itemBelow = <null | HTMLElement>document
        .elementFromPoint(e.clientX, e.clientY)
        .closest('[data-ft-item]')
    if (!$itemBelow) return

    // id папки или файла, над которым навис курсор.
    let itemBelowId: string | number = $itemBelow.dataset.ftItem
    itemBelowId = isNaN(Number(itemBelowId)) ? itemBelowId : parseInt(itemBelowId)

    // Ничего не делать если сброс нельзя делать в этом месте
    if (!isDropAllowed(itemBelowId, itemData)) return

    // Определить позицию сброса
    const dropPlaceCoords = getDropPlaceCoords(e, $itemBelow, itemBelowId, items, itemData)
    if (!dropPlaceCoords) return

    if (phase === 'drag') {
        // Подсветить позицию сброса
        const newItems = showPlaceMark(items, dropPlaceCoords.itemId, dropPlaceCoords.place)
        setItems(newItems)

    }
    else if (phase === 'dragEnd') {
        // Обновить состояние списка папок чтобы перетаскиваемый элемент попал в указанное место
        const newItems = moveItemTo(itemData.id, dropPlaceCoords.itemId, dropPlaceCoords.place, items)
        setItems(newItems)

        // Запустить переданную функцию, которая должна быть запущена после изменения дерева файлов и папок
        if (after.changingTree) after.changingTree(newItems)
    }
}

/**
 * Обработчик отпускания мыши при перетаскивании
 * @param {Object} e — объект события
 */
export function handleDragOver(e: any) {
    e.preventDefault()
}


// ================================================


/**
 * Функция определяет можно ли сбросить папку или файл в место где стоит курсор
 * @param {String} itemBelowId — id элемента под курсором
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 */
function isDropAllowed(
    itemBelowId: DragFilesTreeType.ItemId,
    itemData: DragFilesTreeType.Item
) {
    // Ничего не делать если не передан id
    if (!itemBelowId) return false

    // Ничего не делать если родительскую папку хотят поместить внутрь дочерней
    return !(hasFolderAnItem(itemData, itemBelowId))
}

/**
 * Функция возвращает объект вида: {itemId: '5', place: 'before'} с данными в каком элементе
 * и в каком месте элемента можно приземлить перетаскиваемый файл.
 * @param {Object} e — объект события
 * @param {HTMLElement} itemBelow — элемент под курсором
 * @param {String} itemBelowId — id элемента под курсором
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} itemData — данные перетаскиваемой папки или файла
 */
function getDropPlaceCoords(
    e: any,
    itemBelow: HTMLElement,
    itemBelowId: DragFilesTreeType.ItemId,
    items: DragFilesTreeType.Items,
    itemData: DragFilesTreeType.Item,
): { itemId: DragFilesTreeType.ItemId, place: DragFilesTreeType.PlaceMark } {
    // Расстояние до элемента с верха экрана и высота элемента под курсором
    const itemBelowY = itemBelow.getBoundingClientRect().top
    const itemBelowHeight = itemBelow.getBoundingClientRect().height

    // Ничего не делать если курсор находится над перемещаемым элементом
    if (itemBelowId === itemData.id) return

    // Данные элемента
    const itemBelowData = getItemDataById(items, itemBelowId)

    // Если это папка
    if (itemBelowData.type === 'folder') {
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
