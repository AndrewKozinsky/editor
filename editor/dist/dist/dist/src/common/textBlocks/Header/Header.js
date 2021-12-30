import React from 'react';
import makeClasses from './Header-classes';
/** Заголовок */
export default function Header(props) {
    const { text, // Текст заголовка
    type = 'h1' // Тип заголовка: h1. Позже будут добавлены другие типы
     } = props;
    const CN = makeClasses(type);
    return (React.createElement("h1", { className: CN.root }, text));
}
//# sourceMappingURL=Header.js.map
//# sourceMappingURL=Header.js.map
//# sourceMappingURL=Header.js.map