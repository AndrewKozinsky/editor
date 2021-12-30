import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import makeClasses from './Menu-classes';
import { makeCN } from 'utils/StringUtils';
/** Компонент меню. Сейчас используется на форме входа. */
export default function Menu(props) {
    const { items } = props;
    const CN = makeClasses();
    const $items = items.map((item, i) => {
        return (React.createElement("li", { className: CN.li, key: i },
            React.createElement(MenuLink, { to: item.to, label: item.label, key: i })));
    });
    return (React.createElement("nav", { className: CN.root },
        React.createElement("ul", { className: CN.ul }, $items)));
}
/** Компонент ссылки меню */
function MenuLink(props) {
    const { to, // Куда ведёт ссылка
    label // Текст ссылки
     } = props;
    // Соответствует ли текущей адрес переданной ссылке
    let match = useRouteMatch({
        path: to,
        exact: true
    });
    const classes = [];
    if (match)
        classes.push('menu--disabled-link');
    return React.createElement(Link, { to: to, className: makeCN(classes) }, label);
}
//# sourceMappingURL=Menu.js.map