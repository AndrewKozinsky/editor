import React from 'react';
import Header from '../textBlocks/Header/Header';
import makeClasses from './HeaderPage-classes';
// TODO Что делает эта функция?
export default function HeaderPage(props) {
    const { headerText, display = false, // Показывать ли компонент
    children } = props;
    const CN = makeClasses();
    let content;
    if (Array.isArray(children)) {
        content = (React.createElement("div", { className: CN.contentDivided },
            React.createElement("div", { className: CN.contentDividedLeft }, children[0]),
            React.createElement("div", { className: CN.contentDividedCenter }),
            React.createElement("div", { className: CN.contentDividedRight }, children[1])));
    }
    else {
        content = (React.createElement("div", { className: CN.contentSingle }, children));
    }
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN.root, style: style },
        React.createElement("div", { className: CN.headerWrapper },
            React.createElement(Header, { text: headerText, type: 'h2' })),
        content));
}
//# sourceMappingURL=HeaderPage.js.map