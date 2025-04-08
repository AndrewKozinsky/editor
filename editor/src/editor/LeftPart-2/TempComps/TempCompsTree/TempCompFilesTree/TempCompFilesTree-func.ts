import { useMemo } from 'react'
import { getMaxDeep } from '../StoreManage/manageState'
import TempCompsTreeType from '../types'

/**
 * Хук возвращает минимальную ширину обёртки FilesTree в зависимости от количества вложенных элементов
 * @param {Array} items — массив данных по папкам и файлам.
 */
export function useGetFilesTreeMinWidth(items: TempCompsTreeType.Items) {
    return useMemo(function () {
        const maxDeep = getMaxDeep(items)
        return maxDeep * 20 + 180
    }, [items])
}
