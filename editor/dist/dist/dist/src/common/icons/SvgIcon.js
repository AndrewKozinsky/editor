import React from 'react';
import { getIcon } from './js/getIcon';
import { getIconSize } from './js/getIconSize';
import { makeCN } from 'utils/StringUtils';
import './css/SvgIcon.scss';
/** Значок */
export default function SvgIcon(props) {
    let { type, // Тип значка
    baseClass, // Класс значка
    extraClass, // Класс значка
     } = props;
    // Значок
    const Icon = getIcon(type);
    // Размеры
    const iconSizes = getIconSize(type);
    // Классы
    const CN = 'icon';
    let className = '';
    if (!baseClass && !extraClass)
        className = `${CN}-black-fill`;
    else if (baseClass && !extraClass)
        className = `${CN}${baseClass}`;
    else if (!baseClass && extraClass)
        className = extraClass;
    else
        className = makeCN([`${CN}${baseClass}`, extraClass]);
    return (React.createElement("svg", Object.assign({}, iconSizes, { className: className }), React.createElement(Icon, null)));
}
//# sourceMappingURL=SvgIcon.js.map
//# sourceMappingURL=SvgIcon.js.map
//# sourceMappingURL=SvgIcon.js.map