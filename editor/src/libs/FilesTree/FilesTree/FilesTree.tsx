import React, {Fragment, ReactNode } from 'react'
import Wrapper from 'common/Wrapper/Wrapper'
import Button from 'common/formElements/Button/Button'
import Item from '../Item/Item'
import {addNewItem} from '../Item/Item-func'
import {useManageState} from './useManageState'
import FilesTreeType from '../types'


type FilesTreePropType = {
    // Массив данных списка папок и файлов
    items: FilesTreeType.Items
    // id папок, которые должны быть изначально открыты
    openFolderIds?: FilesTreeType.OpenFolderIds,
    // Название новой папки (текст на кнопке и название новой папки)
    newFolderName?: string
    // Название нового файла (текст на кнопке и название нового файла)
    newFileName?: string
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

    return (
        <div style={{width: 260}} data-file-tree='true'>
            <Wrapper b={10}>
                <Button
                    text={newFolderName}
                    icon='btnSignFolder'
                    onClick={(e: any) => addNewItem(e, 'folder', null, items, setItems, newFolderName)}
                />
            </Wrapper>
            <Wrapper b={10}>
                <Button
                    text={newFileName}
                    icon='btnSignAdd'
                    onClick={(e: any) => addNewItem(e, 'file', null, items, setItems, newFileName)}
                />
            </Wrapper>
            {generateItems(items, items, 0, setItems, newFolderName, newFileName)}
        </div>
    )
}

/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Function} setItems — функция устанавливающая новые данные в Состояние FilesTree
 * @param {String} newFolderName — название новой папки
 * @param {String} newFileName — название нового файла
 */
function generateItems(
    allItems: FilesTreeType.Items,
    innerItems: FilesTreeType.Items,
    offset: number,
    setItems: FilesTreeType.SetItemsFn,
    newFolderName: string,
    newFileName: string,
): ReactNode {
    return innerItems.map(itemData => {

        // Массив файлов и папок вложенный в эту папку
        let innerItems: null | ReactNode = null
        if (itemData.open && itemData.content) {
            innerItems = generateItems(
                allItems,
                itemData.content,
                offset + 1,
                setItems,
                newFolderName,
                newFileName,
            )
        }

        return (
            <Fragment key={itemData.id}>
                <Item
                    items={allItems}
                    itemData={itemData}
                    offset={offset}
                    setItems={setItems}
                    newFolderName={newFolderName}
                    newFileName={newFileName}
                />
                {innerItems}
            </Fragment>
        )
    })
}
