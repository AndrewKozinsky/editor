import React from 'react';
import SvgIcon from 'common/icons/SvgIcon';
import makeClasses from './AuthFormWrapper-classes';
/** Обёртка форм регистрации, входа пользователя и сброса пароля */
export default function AuthFormWrapper(props) {
    const CN = makeClasses();
    return (React.createElement("section", { className: CN.root }, React.createElement("div", { className: CN.logoWrapper }, React.createElement(SvgIcon, { type: 'logo', baseClass: '-black-fill' })), props.children));
}
//# sourceMappingURL=AuthFormWrapper.js.map
//# sourceMappingURL=AuthFormWrapper.js.map