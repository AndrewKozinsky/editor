import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import TempCompsTreeType from '../types'


/**
 * Функция разворачивающая/сворачивающая папку.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {String} folderId — id папки, которую нужно развернуть/свернуть
 */
export function toggleFolder(items: TempCompsTreeType.Items, folderId: TempCompsTreeType.FolderItemId) {
    // Получение папки с заданным идентификатором
    const folder = getItemDataById(items, folderId) as TempCompsTreeType.FolderItem
    if (!folder) return

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
export function getItemDataById(
    items: TempCompsTreeType.Items, itemId: TempCompsTreeType.ItemId
): null | TempCompsTreeType.Item {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.id === itemId) {
            return item
        }
        else if (item.type === 'folder' && item.content) {
            const foundedItem = getItemDataById(item.content, itemId)
            if (foundedItem) return foundedItem
        }
    }

    return null
}

/**
 * Функция возвращает id раскрытых папок
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} arr — массив с id открытых папок (требуется внутри работы функции, в саму функцию передавать не нужно)
 */
export function getOpenedFoldersId(
    items: TempCompsTreeType.Items, arr: TempCompsTreeType.FolderItemId[] = []
) {
    items.forEach((item: TempCompsTreeType.Item) => {
        if (item.type === 'folder' && item.open) {
            arr.push(item.id)

            if (item.content) {
                getOpenedFoldersId(item.content, arr)
            }
        }
    })

    return arr
}


/**
 * Функция возвращает максимальную глубину вложенности файлов
 * @param {Array} items — массив с данными по папкам и файлам
 */
export function getMaxDeep(items: TempCompsTreeType.Items) {
    let maxDeep = 0

    function crawler(items: TempCompsTreeType.Items, prevDeep = -1) {
        items.forEach((item: TempCompsTreeType.Item) => {
            const currentDeep = prevDeep + 1
            if (maxDeep < currentDeep) maxDeep = currentDeep

            if (item.type === 'folder' && item.content) {
                crawler(item.content, currentDeep)
            }
        })
    }

    if (items) {
        crawler(items)
    }

    return maxDeep
}
