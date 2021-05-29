//@ts-ignore
import { v4 as uuid } from 'uuid'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import FilesTreeType from '../types'


// Функция открывающая/сворачивающая папку
export function toggleFolder(items: FilesTreeType.Items, folderId: FilesTreeType.Id) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId)
    if(!folder) return

    // Перевернуть значение открыта ли папка
    const folderCopy = {...folder, open: !(folder.open)}

    // Создание нового массива папок и файлов
    return makeImmutableCopy(items, folder, folderCopy)
}


/**
 * Функция находит в массиве объект данных с переданным id.
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} itemId — id папки или файла, которую нужно найти
 */
export function getItemDataById(items: FilesTreeType.Items, itemId: FilesTreeType.Id): null | FilesTreeType.Item {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.id === itemId) {
            return item
        }
        else if (item.content) {
            const foundedItem = getItemDataById(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция возвращает булево значение имеет ли папка вложенный элемент
 * @param {Object} folderData — данные папки где возможно есть указанный вложенный элемент
 * @param {String} itemId — id элемента, который возможно есть в указанной папке
 */
export function hasFolderAnItem(folderData: FilesTreeType.Item, itemId: FilesTreeType.Id) {
    if (folderData.content) {
        return Boolean(
            getItemDataById(folderData.content, itemId)
        )
    }

    return false
}

/**
 * Функция показывающая указатель помещения перетаскиваемого элемента
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 * @param {Array} items — массив данных по папкам и файлам
 * @param {String} itemId — id элемента под которым находится курсор
 * @param {String} place — место, которое нужно подсветить. Три варианта: 'after' | 'inside' | 'before'
 */
export function showPlaceMark(
    setItems: FilesTreeType.SetItemsFn,
    items: FilesTreeType.Items,
    itemId: FilesTreeType.Id,
    place: 'after' | 'inside' | 'before'
) {
    // Стереть имеющиеся метки
    const itemsCopy = erasePlaceMarks(items)

    // Получение папки/файла с заданным идентификатором
    const item = getItemDataById(itemsCopy, itemId)
    if(!item) return

    // Поставить новое значение свойству placeMark
    const itemCopy = {...item, placeMark: place}

    // Создание и сохранение нового массива элементов
    const newItems = makeImmutableCopy(itemsCopy, item, itemCopy)
    setItems(newItems)
}

/**
 * Функция прячащая указатель помещения перетаскиваемого элемента
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 * @param {Array} items — массив данных по папкам и файлам
 */
// ПОХОЖЕ ЭТА ФУНКЦИЯ НЕ ТРЕБУЕТСЯ
/*export function hidePlaceMark(
    setItems: FilesTreeType.SetItemsFn,
    items: FilesTreeType.Items,
) {
    // Стереть имеющиеся метки
    const itemsCopy = erasePlaceMarks(items)
    // Сохранение нового массива элементов
    setItems(itemsCopy)
}*/

/**
 * Рекурсивная функция проходит по всем элементам массива items и у каждого элемента
 * удаляет свойство placeMark где написана позиция на которой должен быть подсвечивающая линия
 * @param {Array} items — массив данных по папкам и файлам
 */
function erasePlaceMarks(items: FilesTreeType.Items) {
    return items.map(item => {
        const newItem = {...item}
        delete newItem.placeMark

        if (newItem.content) {
            newItem.content = erasePlaceMarks(newItem.content)
        }

        return  newItem
    })
}


/**
 * Функция помещает указанный элемент в другую часть дерева папок и файлов и обновляет Состояние
 * @param {String} movedItemId — id перемещаемого элемента
 * @param {String} anchorItemId — id элемента относительно которого будет позиционироваться перемещаемый элемент
 * @param {String} position — позиция перемещаемого элемента относительно якорного
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 */
export function moveItemTo(
    movedItemId: string,
    anchorItemId: string,
    position: FilesTreeType.PlaceMark,
    items: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn
) {
    // Получение данных перемещаемого объекта по его id
    const movedItem = getItemDataById(items, movedItemId)
    if (!movedItem) return

    // Удалить перемещаемый элемент и возвратить массив папок без него
    let itemsCopy = deleteItem(items, movedItemId)

    // Поставить перемещаемый элемент в указанное место и возвратить новый массив
    itemsCopy = addItem(itemsCopy, movedItem, anchorItemId, position)

    // Стереть имеющиеся метки
    itemsCopy = erasePlaceMarks(itemsCopy)

    // Обновить Состояние
    setItems(itemsCopy)
}

/**
 * Функция удаляет папку или файл с переданным id из массива папок и файлов и возвращает новый массив
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла, который нужно найти и удалить
 */
function deleteItem(items: FilesTreeType.Items, itemId: string) {
    // Найду массив в котором находится удаляемая папка или файл
    let itemsArr = getParentArray(items, itemId)
    if (!itemsArr) return

    // Получить индекс удаляемого элемента в массиве parentArr
    const itemIdx = itemsArr.findIndex(elem => elem.id === itemId)
    if (itemIdx < 0) return

    const newItemsArr = [...itemsArr]
    newItemsArr.splice(itemIdx, 1)

    return makeImmutableCopy(items, itemsArr, newItemsArr)
}

/**
 * Функция добавляет папку или файл в указанное место в массиве папок и файлов
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Object} movedItem — данные элемента, который нужно добавить в другое место
 * @param {String} anchorItemId — id элемента относительно которого будет вставлен новый элемент
 * @param {String} position — в какую позицию относительно якорного элемента поставить новый элемент
 */
function addItem(
    items: FilesTreeType.Items,
    movedItem: FilesTreeType.Item,
    anchorItemId: string,
    position: FilesTreeType.PlaceMark
) {
    // Найду массив в котором находится якорная папка или файл
    let itemsArr = getParentArray(items, anchorItemId)
    if (!itemsArr) return

    // Получить индекс якорного элемента в массиве parentArr
    const anchorIdx = itemsArr.findIndex(elem => elem.id === anchorItemId)
    if (anchorIdx < 0) return

    if (position === 'before') {
        const newItemsArr = [...itemsArr]
        newItemsArr.splice(anchorIdx, 0, movedItem)
        return makeImmutableCopy(items, itemsArr, newItemsArr)
    }
    else if(position === 'after') {
        const newItemsArr = [...itemsArr]
        newItemsArr.splice(anchorIdx + 1, 0, movedItem)
        return makeImmutableCopy(items, itemsArr, newItemsArr)
    }
    else if(position === 'inside') {
        if (itemsArr[anchorIdx].content) {
            const contentArr = itemsArr[anchorIdx].content
            const contentArrCopy = [movedItem, ...contentArr]
            return makeImmutableCopy(items, contentArr, contentArrCopy)
        }
        else {
            const anchorObj = itemsArr[anchorIdx]
            const anchorObjCopy = {...anchorObj}
            anchorObjCopy.content = [movedItem]
            return makeImmutableCopy(items, anchorObj, anchorObjCopy)
        }
    }

    return items
}

/**
 * Функция возвращает массив, в котором содержится папка или файл с переданным id
 * @param {Array} items — массив папок и файлов
 * @param {String} itemId — id папки или файла у которого нужно найти родительскую папку
 */
export function getParentArray(items: FilesTreeType.Items, itemId: string): null | FilesTreeType.Items {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (items[i].id === itemId) {
            return items
        }
        else if (item.content) {
            const foundedItem = getParentArray(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция создаёт новую пустую папку или файл
 * @param {String} type — тип создаваемого элемента
 * @param {String} name — имя создаваемого элемента
 */
export function createNewItem(type: FilesTreeType.ItemType, name: string) {
    const newItem: FilesTreeType.Item = {
        id: uuid(),
        type, // Тип элемента: файл или папка
        name // Имя файла или папки
    }

    return newItem
}