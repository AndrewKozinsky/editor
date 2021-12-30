import React from 'react';
import makeClasses from './Wrapper-classes';
/** Компонент-обёртка. Можно указать отступ и выключку */
export default function Wrapper(props) {
    const { children, // Дети компонента
    extraClass, style = {} } = props;
    const CN = makeClasses(props, extraClass);
    return (React.createElement("div", { className: CN.root, style: style }, children));
}
//# sourceMappingURL=Wrapper.js.map