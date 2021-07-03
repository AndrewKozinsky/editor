//@ts-ignore
// import { v4 as uuid } from 'uuid'
import makeImmutableCopy from 'src/libs/makeImmutableCopy/makeImmutableCopy'
import TempCompFilesTreeType from '../types'


/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно расвернуть/свернуть
 */
export function toggleFolder(items: TempCompFilesTreeType.Items, folderId: TempCompFilesTreeType.UuId) {
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
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} itemId — id папки или файла, которую нужно найти
 */
export function getItemDataById(items: TempCompFilesTreeType.Items, itemId: TempCompFilesTreeType.UuId): null | TempCompFilesTreeType.Item {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.uuid === itemId) {
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
/*export function hasFolderAnItem(folderData: TempCompFilesTreeType.Item, itemId: TempCompFilesTreeType.UuId) {
    if (folderData.content) {
        return Boolean(
            getItemDataById(folderData.content, itemId)
        )
    }

    return false
}*/


/**
 * Функция возвращает uuid раскрытых папок
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} arr — массив с uuid открытых папок (требуется внутри работы функции, в саму функцию передавать не нужно)
 */
export function getOpenedFoldersUuid(items: TempCompFilesTreeType.Items, arr: TempCompFilesTreeType.UuIdArr = []) {
    items.forEach((item: TempCompFilesTreeType.Item) => {
        if (item.open) {
            arr.push(item.uuid)

            if (item.content) {
                getOpenedFoldersUuid(item.content, arr)
            }
        }
    })

    return arr
}


/**
 * Функция возвращает максимальную глубину вложенности файлов
 * @param {Array} items — массив с данными по папкам и файлам
 */
export function getMaxDeep(items: TempCompFilesTreeType.Items) {
    let maxDeep = 0

    function crawler(items: TempCompFilesTreeType.Items, prevDeep = -1) {
        items.forEach((item: TempCompFilesTreeType.Item) => {
            const currentDeep = prevDeep + 1
            if (maxDeep < currentDeep) maxDeep = currentDeep

            if (item.content) {
                crawler(item.content, currentDeep)
            }
        })
    }

    if (items) {
        crawler(items)
    }

    return maxDeep
}


/**
 * Функция получает массив с данными по папкам и файлам
 * и массив с идентификаторами папок, которые должны быть открыты,
 * и формирует массив где в данных папок, которые должны быть открыты,
 * ставит свойство open в true. Возвращает новый массив.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Array} openFolderIds — id папок, которые должны быть изначально открыты
 */
export function addOpenPropToFolders(
    items: TempCompFilesTreeType.Items, openFolderIds: TempCompFilesTreeType.UuIdArr
): TempCompFilesTreeType.Items {
    return items.map(item => {
        const newItem: TempCompFilesTreeType.Item = {...item}

        if (newItem.type === 'folder' && openFolderIds.includes(newItem.uuid)) {
            newItem.open = true
        }

        if (newItem.content) {
            newItem.content = addOpenPropToFolders(item.content, openFolderIds)
        }

        return newItem
    })
}
