import React from 'react';
import SvgIcon from 'common/icons/SvgIcon';
import makeClasses from './MainTab-classes';
// TODO Что делает эта функция?
export default function MainTab(props) {
    const { title = null, iconType, active = false, disabled = false, position = 'top', onClick } = props.tabData;
    const CN = makeClasses(active, position);
    const buttonAttrs = {
        title,
        className: CN.tab,
        onClick
    };
    if (disabled)
        buttonAttrs.disabled = true;
    return (React.createElement("button", Object.assign({}, buttonAttrs), React.createElement(SvgIcon, { type: iconType, baseClass: '-icon-fill' }), React.createElement(SvgIcon, { type: 'mainTabRoundScion', extraClass: CN.scion }), React.createElement(SvgIcon, { type: 'mainTabRoundScion', extraClass: CN.scion })));
}
//# sourceMappingURL=MainTab.js.map
//# sourceMappingURL=MainTab.js.map
//# sourceMappingURL=MainTab.js.map