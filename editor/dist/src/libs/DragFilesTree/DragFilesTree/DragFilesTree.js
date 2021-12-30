import React, { Fragment } from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import Button from 'common/formElements/Button/Button';
import { useGetFilesTreeMinWidth } from './DragFilesTree-func';
import Item from '../Item/Item';
import { createNewFile, createNewFolder } from '../Item/Item-func';
/** Список папок и файлов */
export default function DragFilesTree(props) {
    const { newFolderName = 'New folder', // Название новой папки
    newFileName = 'New file', // Название нового файла
     } = props;
    const after = {
        newFolderName,
        newFileName,
        addingNewFile: props.afterAddingNewFile,
        selectItem: props.afterSelectItem,
        collapseFolder: props.afterCollapseFolder,
        changingTree: props.afterChangingTree,
        deleteItem: props.afterDeleteItem
    };
    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(props.items);
    return (React.createElement("div", { "data-file-tree": 'true', style: { minWidth: minWidth } },
        React.createElement(Wrapper, { b: 10 },
            React.createElement(Button, { text: newFolderName, icon: 'btnSignFolder', onClick: (e) => {
                    createNewFolder(e, null, props.items, props.setItems, after);
                } })),
        React.createElement(Wrapper, { b: 10 },
            React.createElement(Button, { text: newFileName, icon: 'btnSignAdd', onClick: (e) => {
                    createNewFile(e, null, props.items, props.setItems, after);
                } })),
        generateItems(props.items, props.items, props.setItems, 0, after)));
}
/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Function} setItems — функция устанавливающая новый массив папок и файлов в Хранилище
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
function generateItems(allItems, innerItems, setItems, offset, after) {
    if (!allItems)
        return null;
    return innerItems.map(itemData => {
        // Массив файлов и папок вложенный в эту папку
        let innerItems = null;
        if (itemData.type === 'folder' && itemData.open && itemData.content) {
            innerItems = generateItems(allItems, itemData.content, setItems, offset + 1, after);
        }
        return (React.createElement(Fragment, { key: itemData.id },
            React.createElement(Item, { items: allItems, itemData: itemData, setItems: setItems, offset: offset, after: after }),
            innerItems));
    });
}
//# sourceMappingURL=DragFilesTree.js.map