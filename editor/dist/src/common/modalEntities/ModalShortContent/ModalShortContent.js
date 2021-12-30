import React from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import Header from '../../textBlocks/Header/Header';
import useMakeClasses from './ModalShortContent-classes';
/* Modal content component with header, text and any number of buttons */
export default function ModalShortContent(props) {
    const { header, text, bottomElems } = props;
    const CN = useMakeClasses();
    return (React.createElement("section", { className: CN.root },
        header &&
            React.createElement(Wrapper, { b: 10 },
                React.createElement(Header, { text: header, type: 'h2' })),
        text &&
            React.createElement("div", { className: CN.content },
                React.createElement("p", null, text)),
        bottomElems &&
            React.createElement(Wrapper, { t: 15, align: 'right', gap: 10, extraClass: CN.bottom }, bottomElems)));
}
//# sourceMappingURL=ModalShortContent.js.map