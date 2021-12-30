import React, { Fragment } from 'react';
import Item from '../Item/Item';
import { useGetFilesTreeMinWidth } from './TempCompFilesTree-func';
/** Список папок и файлов */
export default function TempCompFilesTree(props) {
    var _a;
    const after = {
        afterCollapseFolder: props.afterCollapseFolder,
        afterClickBeforeBtn: props.afterClickBeforeBtn,
        afterClickAfterBtn: props.afterClickAfterBtn,
        afterClickInsideBtn: props.afterClickInsideBtn
    };
    // Минимальная ширина главной обёртки
    const minWidth = useGetFilesTreeMinWidth(props.items);
    if (!((_a = props.items) === null || _a === void 0 ? void 0 : _a.length))
        return null;
    return (React.createElement("div", { "data-file-tree": 'true', style: { minWidth: minWidth } }, generateItems(props.items, props.items, 0, after)));
}
/**
 * Рекурсивная функция генерирующая разметку дерева файлов
 * @param {Array} allItems — массив всех данных по папкам и файлам. Он требуется для передачи в компоненты файлов и папок
 * @param {Array} innerItems — массив данных по папкам и файлам, которые генерируются на текущем цикле.
 * Так как функция рекурсивная, то сюда будут поступать разные массивы.
 * @param {Number} offset — на каком уровне вложенности находится элемент. От этого зависит величина отступа слева.
 * @param {Object} after — объект с различными свойствами и методами переданными в параметрах FilesTree.
 */
function generateItems(allItems, innerItems, offset, after) {
    if (!allItems)
        return null;
    return innerItems.map(itemData => {
        // Массив файлов и папок вложенный в эту папку
        let innerItems = null;
        if (itemData.type === 'folder' && itemData.open && itemData.content) {
            innerItems = generateItems(allItems, itemData.content, offset + 1, after);
        }
        return (React.createElement(Fragment, { key: itemData.id }, React.createElement(Item, { items: allItems, itemData: itemData, offset: offset, after: after }), innerItems));
    });
}
//# sourceMappingURL=TempCompFilesTree.js.map
//# sourceMappingURL=TempCompFilesTree.js.map
//# sourceMappingURL=TempCompFilesTree.js.map