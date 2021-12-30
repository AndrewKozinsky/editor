import React from 'react';
import makeClasses from './NameSection-classes';
/* Компонент блока с заголовком */
export default function NameSection(props) {
    const { type = 1, header, children, } = props;
    // Классы
    const CN = makeClasses(type);
    return (React.createElement("div", null, React.createElement("h3", { className: CN.header }, React.createElement("span", { className: CN.bg }, header)), children));
}
//# sourceMappingURL=NameSection.js.map
//# sourceMappingURL=NameSection.js.map
//# sourceMappingURL=NameSection.js.map