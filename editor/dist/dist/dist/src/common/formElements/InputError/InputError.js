import React from 'react';
import makeClasses from './InputError-classes';
import SvgIcon from 'common/icons/SvgIcon';
/**
 * Компонент текстового уведомления.
 * Если передать тип, то это будет или сообщение об ошибке или об успехе.
 */
export default function InputError(props) {
    const { text } = props;
    const CN = makeClasses();
    if (!text)
        return null;
    return (React.createElement("div", { className: CN.root }, React.createElement(SvgIcon, { type: 'errorTriangle', extraClass: CN.icon }), React.createElement("p", { className: CN.paragraph }, text)));
}
//# sourceMappingURL=InputError.js.map
//# sourceMappingURL=InputError.js.map
//# sourceMappingURL=InputError.js.map