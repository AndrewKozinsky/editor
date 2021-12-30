import React from 'react';
import makeClasses from './NotFound-classes';
import SvgIcon from 'common/icons/SvgIcon';
import Wrapper from 'common/Wrapper/Wrapper';
import { notFoundMessages } from 'messages/notFoundMessages';
import useGetMessages from 'messages/fn/useGetMessages';
/* Компонент «Страница не найдена» */
export default function NotFound() {
    const notFoundMsg = useGetMessages(notFoundMessages);
    // Классы компонента
    const CN = makeClasses();
    return (React.createElement("div", { className: CN.root }, React.createElement(SvgIcon, { type: 'logo' }), React.createElement(Wrapper, { t: 15 }, React.createElement("h1", { className: CN.header }, notFoundMsg.header)), React.createElement(Wrapper, { t: 15 }, React.createElement("p", null, notFoundMsg.p1)), React.createElement(Wrapper, { t: 5 }, React.createElement("p", null, notFoundMsg.p2))));
}
//# sourceMappingURL=NotFound.js.map
//# sourceMappingURL=NotFound.js.map