import React from 'react';
import './RightPart-4.scss';
/** Правая часть четвёртой главной вкладки */
export default function RightPart4(props) {
    const { display // Показывать ли обёртку
     } = props;
    const CN = 'right-part-4';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }));
}
//# sourceMappingURL=RightPart-4.js.map
//# sourceMappingURL=RightPart-4.js.map