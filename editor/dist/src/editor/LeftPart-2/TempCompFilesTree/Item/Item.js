import React from 'react';
import makeClasses from './Item-classes';
import SvgIcon from 'common/icons/SvgIcon';
import { useGetToggleFolder, useGetOnClickHandler } from './Item-func';
import { componentsPanelMessages } from 'messages/componentsPanelMessages';
import useGetMessages from 'messages/fn/useGetMessages';
/** Папка или файл в структуре папок */
export default function Item(props) {
    const { items, itemData, offset, after } = props;
    const CN = makeClasses();
    // Хук возвращает обработчик щелчка по элементу
    const onItemClickHandler = useGetOnClickHandler(items, itemData, after);
    return (React.createElement("div", { style: { paddingLeft: offset * 20 }, className: CN.root, onClick: onItemClickHandler },
        React.createElement("div", { className: CN.inner },
            React.createElement(Triangle, { items: items, itemData: itemData, after: after }),
            React.createElement(Icon, { itemData: itemData }),
            React.createElement(Circles, { itemData: itemData }),
            React.createElement("p", { className: `${CN}__item-name` }, itemData.name),
            React.createElement(RightButtons, { itemData: itemData, after: after }))));
}
/** Кнопка сворачивания/разворачивания папки. Для файла возвращается пустой элемент. */
function Triangle(props) {
    const { items, itemData, after } = props;
    const CN = makeClasses(itemData);
    // Обработчик щелчка по треугольной кнопке сворачивания/разворачивания содержимого папки
    const toggleFolder = useGetToggleFolder(itemData.id, items, after);
    if (itemData.type === 'file') {
        return React.createElement("div", { className: CN.triangleBtn });
    }
    return (React.createElement("button", { className: CN.triangleBtn, onClick: toggleFolder, "data-ft-item-btn": 'true' },
        React.createElement(SvgIcon, { type: 'filesTreeTriangle' })));
}
/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function Icon(props) {
    const { itemData } = props;
    const CN = makeClasses();
    if (itemData.type === 'file')
        return null;
    return React.createElement(SvgIcon, { type: 'filesTreeFolder', extraClass: CN.folderSign });
}
// TODO Что делает эта функция?
function Circles(props) {
    const { itemData } = props;
    const CN = makeClasses(itemData);
    return (React.createElement("div", { className: CN.circles },
        React.createElement("div", { className: CN.afterCircle }),
        React.createElement("div", { className: CN.afterCircle }),
        React.createElement("div", { className: CN.insideCircle })));
}
/** Значок типа элемента. Если файл, то ничего не отрисовывается. */
function RightButtons(props) {
    const { itemData, after, } = props;
    const CN = makeClasses(itemData);
    const componentsPanelMsg = useGetMessages(componentsPanelMessages);
    if (itemData.type === 'folder' || !itemData.afterButtonAllowed && !itemData.insideButtonAllowed) {
        return null;
    }
    const afterButtons = [];
    if (itemData.afterButtonAllowed) {
        afterButtons.push(React.createElement("button", { className: CN.afterBtn, onClick: (e) => after.afterClickBeforeBtn(itemData.id), title: componentsPanelMsg.beforeButton.toString(), key: 1 },
            React.createElement(SvgIcon, { type: 'filesTreeUp' })));
        afterButtons.push(React.createElement("button", { className: CN.afterBtn, onClick: (e) => after.afterClickAfterBtn(itemData.id), title: componentsPanelMsg.afterButton.toString(), key: 2 },
            React.createElement(SvgIcon, { type: 'filesTreeDown' })));
    }
    const insideButton = (React.createElement("button", { className: CN.insideBtn, onClick: (e) => after.afterClickInsideBtn(itemData.id), title: componentsPanelMsg.insideButton.toString(), key: 3 },
        React.createElement(SvgIcon, { type: 'filesTreeTorus' })));
    return (React.createElement("div", { className: CN.rightPart },
        afterButtons,
        insideButton));
}
//# sourceMappingURL=Item.js.map