import React from 'react';
import makeClasses from './ItemsList-classes';
// TODO Что делает эта функция?
export default function ItemsList(props) {
    const { items, activeItemId } = props;
    return (React.createElement("div", null, items.map(item => {
        return item.id === activeItemId
            ? React.createElement(Item, { item: item, key: item.id, isActive: true })
            : React.createElement(Item, { item: item, key: item.id });
    })));
}
/** Кнопка списка */
function Item(props) {
    const { item, isActive, } = props;
    // Формирование классов кнопки
    const CN = makeClasses(isActive);
    return (React.createElement("button", { className: CN.item, onClick: item.onClick }, item.name));
}
//# sourceMappingURL=ItemsList.js.map
//# sourceMappingURL=ItemsList.js.map