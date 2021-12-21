import { SyntheticEvent, useCallback } from 'react'
import {
    getOpenedFoldersId,
    toggleFolder
} from '../StoreManage/manageState'
import TempCompFilesTreeType from '../types'


/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param {String} folderId — id папки которую нужно свернуть/развернуть
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Object} after — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    folderId: TempCompFilesTreeType.Id,
    items: TempCompFilesTreeType.Items,
    after: TempCompFilesTreeType.After
) {
    return useCallback(function (e) {
        e.stopPropagation()

        // Свернуть/развернуть папку и возвратить новый массив папок и файлов
        const newItems = toggleFolder(items, folderId)

        // Получить id раскрытых папок
        const openedFoldersId = getOpenedFoldersId(newItems)

        after.afterCollapseFolder(newItems, openedFoldersId)
    }, [items, folderId])
}

/**
 * Хук возвращает обработчик щелчка по папке или файлу.
 * В местное состояние ставит id этой папки или файла.
 * @param {Array} items — массив данных по папкам и файлам.
 * @param {Object} itemData — данные папки или файла.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetOnClickHandler(
    items: TempCompFilesTreeType.Items,
    itemData: TempCompFilesTreeType.Item,
    after: TempCompFilesTreeType.After
) {
    return useCallback(function (e: SyntheticEvent) {
        // Toggle folder opening
        if (itemData.type === 'folder') {
            const newItems = toggleFolder(items, itemData.id)

            // Получить id раскрытых папок
            const openedFoldersUuid = getOpenedFoldersId(newItems)

            after.afterCollapseFolder(newItems, openedFoldersUuid)
        }
    }, [itemData, after])
}
