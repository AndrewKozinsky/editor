import React from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import Notice from 'common/textBlocks/Notice/Notice';
/** Common error component */
export default function CommonNotice(props) {
    const { type, text } = props;
    if (!type)
        return null;
    return (React.createElement(Wrapper, { t: 15 },
        React.createElement(Notice, { icon: type, bg: true }, text)));
}
//# sourceMappingURL=CommonNotice.js.map