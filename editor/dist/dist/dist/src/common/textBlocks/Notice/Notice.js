import React from 'react';
import makeClasses from './Notice-classes';
import SvgIcon from 'common/icons/SvgIcon';
/** Компонент уведомления. */
export default function Notice(props) {
    const { children, bg = false } = props;
    const CN = makeClasses(bg);
    return (React.createElement("div", { className: CN.bg }, React.createElement(Sign, Object.assign({}, props)), React.createElement("div", { className: CN.content }, children)));
}
/** Значок левее содержимого */
function Sign(props) {
    const { icon } = props;
    const CN = makeClasses();
    if (icon === 'info') {
        return React.createElement(SvgIcon, { type: 'noticeInfo', baseClass: '-icon-fill', extraClass: CN.icon });
    }
    else if (icon === 'error') {
        return React.createElement(SvgIcon, { type: 'noticeError', baseClass: '-icon-fill', extraClass: CN.icon });
    }
    else if (icon === 'success') {
        return React.createElement(SvgIcon, { type: 'noticeSuccess', baseClass: '-icon-fill', extraClass: CN.icon });
    }
    return null;
}
//# sourceMappingURL=Notice.js.map
//# sourceMappingURL=Notice.js.map
//# sourceMappingURL=Notice.js.map