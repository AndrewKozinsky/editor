import {useCallback, useEffect, useState} from 'react'
import FilesTreeType from '../types'

/**
 * Хук возвращает объект со свойством items где хранится массив папок
 * и файлов и функцию setItems() для изменения этого массива.
 * @param {Array} initialItems — изначальные данные по папка и файлам
 * @param {Array} openFolderIds — массив строк с идентификорами папок,
 * которые должны быть изначально раскрыты
 */
export function useManageState(
    initialItems: FilesTreeType.Items,
    openFolderIds: FilesTreeType.UuIdArr,
) {
    // Массив папок и файлов
    const [items, setItems] = useState<FilesTreeType.Items>([])

    useEffect(function () {
        if (!initialItems) return

        // Если папка должна быть открыта, то поставить туда свойство open в true
        // чтобы она отрисовывалась раскрытой
        if (openFolderIds && openFolderIds.length) {
            const supplementedItems = addOpenPropToFolders(initialItems, openFolderIds)
            setItems( supplementedItems )
        } else {
            setItems( initialItems )
        }

    }, [initialItems])

    return {
        items,
        setItems,
    }
}

/**
 * Функция получает массив с данными по папкам и файлам и массив
 * с идентификаторами папок, которые должны быть открыты,
 * и формирует массив где в данных папок, которые должны быть открыты,
 * ставит свойство open в true. Возвращается новый массив.
 * @param {Array} items — массив данных по папкам и файлам
 * @param {Array} openFolderIds — id папок, которые должны быть изначально открыты
 */
function addOpenPropToFolders(
    items: FilesTreeType.Items, openFolderIds: FilesTreeType.UuIdArr
): FilesTreeType.Items {
    return items.map(item => {
        const newItem: FilesTreeType.Item = {...item}

        if (newItem.type === 'folder' && openFolderIds.includes(newItem.uuid)) {
            newItem.open = true
        }

        if (newItem.content) {
            newItem.content = addOpenPropToFolders(item.content, openFolderIds)
        }

        return newItem
    })
}
