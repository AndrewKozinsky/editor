import { useCallback } from 'react'
import {
    getOpenedFoldersId,
    toggleFolder
} from '../StoreManage/manageState'
import TempCompsTreeType from '../types'


/**
 * Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
 * @param itemData
 * @param {Array} items — массив с данными по папкам и файлам
 * @param {Object} after — с различными свойствами и методами переданными в параметрах FilesTree.
 */
export function useGetToggleFolder(
    itemData: TempCompsTreeType.Item,
    items: TempCompsTreeType.Items,
    after: TempCompsTreeType.After
) {
    return useCallback(function (e) {
        e.stopPropagation()

        if (itemData.type === 'file') return

        // Свернуть/развернуть папку и возвратить новый массив папок и файлов
        const newItems = toggleFolder(items, itemData.id)

        // Получить id раскрытых папок
        const openedFoldersId = getOpenedFoldersId(newItems)

        after.afterCollapseFolder(newItems, openedFoldersId)
    }, [items, itemData])
}
