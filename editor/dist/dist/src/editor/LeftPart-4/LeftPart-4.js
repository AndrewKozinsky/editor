import React from 'react';
import './LeftPart-4.scss';
/** Левая часть первой главной вкладки */
export default function LeftPart4(props) {
    const { display // Показывать ли компонент
     } = props;
    // Атрибуты обёртки панели
    const CN = 'left-part-4';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }));
}
//# sourceMappingURL=LeftPart-4.js.map
//# sourceMappingURL=LeftPart-4.js.map