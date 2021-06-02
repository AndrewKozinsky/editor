import React, {Fragment, ReactNode, useState} from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import Item from '../Item/Item'
import {createNewItem} from '../Item/Item-func'
import {useManageState} from './useManageState'
import FilesTreeType from '../types'
import { useGetFilesTreeMinWidth } from './FilesTree-func'


type FilesTreePropType = {
    // Массив данных списка папок и файлов
    items: null | FilesTreeType.Items
    // id папок, которые должны быть изначально открыты
    openFolderIds?: FilesTreeType.UuIdArr,
    // Название новой папки (текст на кнопке и название новой папки)
    newFolderName?: string
    // Название нового файла (текст на кнопке и название нового файла)
    newFileName?: string
    // Функция запускаемая после добавления нового файла
    outAfterAddingNewFile?: FilesTreeType.OutAfterAddingNewFileFn
    // Функция запускаемая после щелчка по папке или файлу
    outSelectItem?: FilesTreeType.OutSelectItemFn
    // Функция запускаемая после разворачивания/сворачивания папки
    outCollapseFolder?: FilesTreeType.OutCollapseFolderFn
    // Функция запускаемая после добавления новой папки
    outAfterChangingTree?: FilesTreeType.OutAfterChangingTreeFn
    // Функция запускаемая после щелчка по папке или файлу
    outOnItemClick?: FilesTreeType.OutOnItemClick
}

/** Список папок и файлов */
export default function FilesTree(props: FilesTreePropType) {

    const {
        newFolderName = 'New folder', // Название новой папки
        newFileName = 'New file', // Название нового файла
    } = props

    const {
        items, // Массив данных для отрисовки разметки
        setItems, // Функция устанавливающая новые данные в Состояние
    } = useManageState(props.items, props.openFolderIds)

    // Uuid выделенной папки или файла и его изменение
    const [activeItemId, setActiveItemId] = useState<null | FilesTreeType.UuId>(null)

    const out: FilesTreeType.Out = {
        newFolderName,
        newFileName,
        afterAddingNewFile: props.outAfterAddingNewFile,
        selectItem: props.outSelectItem,
        collapseFolder: props.outCollapseFolder,
        afterChangingTree: props.outAfterChangingTree,
        onItemClick: props.outOnItemClick
    }

    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(items)

    return (
        <div data-file-tree='true' style={{minWidth: minWidth}}>
            <Wrapper b={10}>
                <Button
                    text={newFolderName}
                    icon='btnSignFolder'
                    onClick={(e: any) => {
                        createNewItem(e, 'folder', null, items, setItems, out, setActiveItemId)
                    }}
                />
            </Wrapper>
            <Wrapper b={10}>
                <Button
                    text={newFileName}
                    icon='btnSignAdd'
                    onClick={(e: any) => {
                        createNewItem(e, 'file', null, items, setItems, out, setActiveItemId)
                    }}
                />
            </Wrapper>
            {generateItems(items, items, setItems, activeItemId, setActiveItemId, 0, out)}
        </div>
    )
}

/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree.
 * @param {String} activeItemId — Uuid выделенной папки или файла.
 * @param {Function} setActiveItemId — функция изменяющая uuid выделенной папки или файла.
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} out — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
function generateItems(
    allItems: FilesTreeType.Items,
    innerItems: FilesTreeType.Items,
    setItems: FilesTreeType.SetItemsFn,
    activeItemId: FilesTreeType.UuId,
    setActiveItemId: FilesTreeType.SetActiveItemIdFn,
    offset: number,
    out: FilesTreeType.Out
): ReactNode {
    if (!allItems) return null

    return innerItems.map(itemData => {

        // Массив файлов и папок вложенный в эту папку
        let innerItems: null | ReactNode = null
        if (itemData.open && itemData.content) {
            innerItems = generateItems(
                allItems,
                itemData.content,
                setItems,
                activeItemId,
                setActiveItemId,
                offset + 1,
                out
            )
        }

        return (
            <Fragment key={itemData.uuid}>
                <Item
                    items={allItems}
                    setItems={setItems}
                    itemData={itemData}
                    offset={offset}
                    activeItemId={activeItemId}
                    setActiveItemId={setActiveItemId}
                    out={out}
                />
                {innerItems}
            </Fragment>
        )
    })
}
