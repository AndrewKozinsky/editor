import React from 'react';
import ArticleFrame from '../ArticleFrame/ArticleFrame';
import './RightPart-2.scss';
/** Правая часть второй главной вкладки */
export default function RightPart2(props) {
    const { display // Показывать ли обёртку
     } = props;
    const CN = 'right-part-2';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style },
        React.createElement(ArticleFrame, null)));
}
//# sourceMappingURL=RightPart-2.js.map