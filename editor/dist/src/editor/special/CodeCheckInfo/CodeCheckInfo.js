import React from 'react';
import Notice from 'common/textBlocks/Notice/Notice';
import makeClasses from './CodeCheckInfo-classes';
/** Плашка с сообщениями о доработках кода или примером кода */
export default function CodeCheckInfo(props) {
    const CN = makeClasses();
    // Значок на плашке
    const icon = props.checkStatus || 'info';
    return (React.createElement(Notice, { icon: icon, bg: true },
        React.createElement("h4", { className: CN.header }, props.header),
        props.type === 'codeCheck' && React.createElement(CodeCheck, Object.assign({}, props)),
        props.type === 'codeExample' && React.createElement(CodeExample, Object.assign({}, props))));
}
/** Плашка с сообщениями о доработках кода */
function CodeCheck(props) {
    const { items, checkStatus } = props;
    const CN = makeClasses();
    // Если успешный статус, то не нужно отрисовать список ошибок
    if (checkStatus === 'success')
        return null;
    return (React.createElement("ul", { className: CN.itemsUl }, items.map((point, i) => {
        return React.createElement("li", { className: CN.itemsLi, key: i }, point);
    })));
}
/** Плашка с примером кода */
function CodeExample(props) {
    const { code } = props;
    const CN = makeClasses();
    return (React.createElement("div", { className: CN.code },
        React.createElement("pre", null, code)));
}
//# sourceMappingURL=CodeCheckInfo.js.map