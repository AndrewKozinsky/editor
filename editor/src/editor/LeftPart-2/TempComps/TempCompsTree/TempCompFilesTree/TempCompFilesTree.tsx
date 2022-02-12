import React, { Fragment, ReactNode } from 'react'
import Item from '../Item/Item'
import { useGetFilesTreeMinWidth } from './TempCompFilesTree-func'
import TempCompsTreeType from '../types'


type TempCompFilesTreePropType = {
    // Массив данных списка папок и файлов
    items: null | TempCompsTreeType.Items
    btnInsideAllowed: boolean
    // Функция запускаемая после разворачивания/сворачивания папки
    afterCollapseFolder: TempCompsTreeType.AfterCollapseFolder
    // Обработчики щелчков по кнопкам вставки компонента до, после и внутрь выделенного компонента
    afterClickBeforeBtn: TempCompsTreeType.AfterClickBeforeBtn
    afterClickAfterBtn: TempCompsTreeType.AfterClickAfterBtn
    afterClickInsideBtn: TempCompsTreeType.AfterClickInsideBtn
}

/** Список папок и файлов */
export default function TempCompFilesTree(props: TempCompFilesTreePropType) {

    const after: TempCompsTreeType.After = {
        afterCollapseFolder: props.afterCollapseFolder,
        afterClickBeforeBtn: props.afterClickBeforeBtn,
        afterClickAfterBtn: props.afterClickAfterBtn,
        afterClickInsideBtn: props.afterClickInsideBtn
    }

    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(props.items)

    if (!props.items?.length ) return null

    return (
        <div style={{minWidth: minWidth}}>
            {generateItems(props.items, props.items, 0, after, props.btnInsideAllowed)}
        </div>
    )
}

/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 * @param btnInsideAllowed
 */
function generateItems(
    allItems: TempCompsTreeType.Items,
    innerItems: TempCompsTreeType.Items,
    offset: number,
    after: TempCompsTreeType.After,
    btnInsideAllowed: boolean
): ReactNode {
    if (!allItems) return null

    return innerItems.map(itemData => {

        // Массив файлов и папок вложенный в эту папку
        let innerItems: null | ReactNode = null

        if (itemData.type === 'folder' && itemData.open && itemData.content) {
            innerItems = generateItems(
                allItems,
                itemData.content,
                offset + 1,
                after,
                btnInsideAllowed
            )
        }

        return (
            <Fragment key={itemData.id}>
                <Item
                    items={allItems}
                    itemData={itemData}
                    offset={offset}
                    after={after}
                    btnInsideAllowed={btnInsideAllowed}
                />
                {innerItems}
            </Fragment>
        )
    })
}
