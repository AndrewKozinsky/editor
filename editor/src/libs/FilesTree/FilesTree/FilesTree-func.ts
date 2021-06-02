import FilesTreeType from '../types'
import {useMemo} from 'react';

/**
 * Хук возвращает минимальную ширину обёртки FilesTree в зависимости от количества вложенных элементов
 * @param {Array} items — массив данных по папкам и файлам.
 */
export function useGetFilesTreeMinWidth(items: FilesTreeType.Items) {
    return useMemo(function () {
        const maxDeep = getMaxDeep(items)
        return maxDeep * 20 + 180
    }, [items])
}

function getMaxDeep(items: FilesTreeType.Items) {
    let maxDeep = 0

    function crawler(items: FilesTreeType.Items, prevDeep = -1) {
        items.forEach((item: FilesTreeType.Item) => {
            const currentDeep = prevDeep + 1
            if (maxDeep < currentDeep) maxDeep = currentDeep

            if (item.content) {
                crawler(item.content, currentDeep)
            }
        })
    }

    crawler(items)

    return maxDeep
}