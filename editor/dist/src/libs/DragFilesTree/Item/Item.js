import React from 'react';
import SvgIcon from 'common/icons/SvgIcon';
import makeClasses from './DnDItem-classes';
import { createNewFile, createNewFolder, useGetToggleFolder, useMarkItemElemWhenItHovered, useGetOnClickHandler, removeItem } from './Item-func';
import Loader from 'common/misc/Loader/Loader';
import { handleDragStart, handleDrag, handleDragOver, handleDragEnd, } from './dragAndDrop';
/** Папка или файл в структуре папок */
export default function Item(props) {
    const { items, setItems, itemData, offset, after } = props;
    const CN = makeClasses(itemData);
    // Обработчик наведения и увода мыши на интерактивные элементы
    // При наведении ставится свойство data-ft-hover="1". При уводе удаляется
    // Элементы с таким свойством подсвечиваются при наведении
    const markItemElem = useMarkItemElemWhenItHovered();
    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, setItems, itemData, after);
    return (React.createElement("div", { style: { paddingLeft: offset * 20 }, className: CN.root, "data-ft-item": itemData.id, draggable: 'true', onClick: onItemClickHandler, onMouseOver: markItemElem, onMouseOut: markItemElem, onDragStart: handleDragStart, onDrag: (e) => {
            handleDrag(e, itemData, items, setItems);
        }, onDragOver: handleDragOver, onDragEnd: (e) => {
            handleDragEnd(e, itemData, items, setItems, after);
        } },
        React.createElement("div", { className: CN.innerWrapper, "data-ft-inner": 'true' },
            React.createElement(PlaceArrow, { itemData: itemData }),
            React.createElement(Triangle, { items: items, setItems: setItems, itemData: itemData, after: after }),
            React.createElement(Icon, { itemData: itemData }),
            itemData.name,
            React.createElement(Loading, { itemData: itemData }),
            React.createElement(RightButtons, { items: items, setItems: setItems, itemData: itemData, after: after }))));
}
/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props) {
    const { items, setItems, itemData, after } = props;
    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    // @ts-ignore
    const toggleFolder = useGetToggleFolder(itemData.id, items, setItems, after);
    const CN = makeClasses(itemData);
    if (itemData.type === 'file') {
        return React.createElement("div", { className: CN.triangleBtn });
    }
    return (React.createElement("button", { className: CN.triangleBtn, onClick: toggleFolder, "data-ft-item-btn": 'true' },
        React.createElement(SvgIcon, { type: 'filesTreeTriangle' })));
}
/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props) {
    const { itemData } = props;
    const CN = makeClasses(itemData);
    if (itemData.type === 'file')
        return null;
    return React.createElement(SvgIcon, { type: 'filesTreeFolder', extraClass: CN.folderSign });
}
/** Значок загрузки. */
function Loading(props) {
    const { itemData } = props;
    const CN = makeClasses(itemData);
    if (itemData.type !== 'file' || !itemData.loading)
        return null;
    return (React.createElement("div", { className: CN.loaderWrapper },
        React.createElement(Loader, { className: CN.loader })));
}
/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props) {
    const { items, setItems, itemData, after, } = props;
    const CN = makeClasses(itemData);
    const createFile = (React.createElement("button", { className: CN.rightBtn, "data-ft-item-btn": 'true', onClick: (e) => createNewFile(e, itemData, items, setItems, after) },
        React.createElement(SvgIcon, { type: 'filesTreePlus' })));
    const createFolder = (React.createElement("button", { className: CN.rightBtn, "data-ft-item-btn": 'true', onClick: (e) => createNewFolder(e, itemData, items, setItems, after) },
        React.createElement(SvgIcon, { type: 'filesTreeFolderPlus' })));
    const deleteItem = (React.createElement("button", { className: CN.rightBtn, "data-ft-item-btn": 'true', onClick: (e) => removeItem(e, items, setItems, itemData, after) },
        React.createElement(SvgIcon, { type: 'filesTreeTrash' })));
    if (itemData.type === 'file' && itemData.loading) {
        return null;
    }
    else if (itemData.type === 'file') {
        return (React.createElement("div", { className: CN.rightPart }, deleteItem));
    }
    else {
        return (React.createElement("div", { className: CN.rightPart },
            createFile,
            createFolder,
            deleteItem));
    }
}
/** Полоска указывающая на место, куда будет поставлен перетаскиваемый элемент */
function PlaceArrow(props) {
    const { placeMark } = props.itemData;
    const CN = makeClasses(props.itemData);
    if (!placeMark || placeMark === 'inside')
        return null;
    return (React.createElement("div", { className: CN.placeArrow },
        React.createElement(SvgIcon, { type: 'filesTreePlaceMark', extraClass: CN.placeArrowPointer }),
        React.createElement("div", { className: CN.placeArrowLine })));
}
//# sourceMappingURL=Item.js.map