import React from 'react';
import NameSection from 'editor/wrappers/NameSection/NameSection';
import { componentsPanelMessages } from 'messages/componentsPanelMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import TempCompList from '../TempCompList/TempCompList';
import './LeftPart-2.scss';
/** Левая часть второй главной вкладки */
export default function LeftPart2(props) {
    const { display // Показывать ли обёртку
     } = props;
    const componentsPanelMsg = useGetMessages(componentsPanelMessages);
    const CN = 'left-part-2';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }, React.createElement("div", { className: `${CN}__top` }, React.createElement(NameSection, { header: componentsPanelMsg.header }, React.createElement(TempCompList, null))), React.createElement("div", { className: `${CN}__bottom` }, "2")));
}
//# sourceMappingURL=LeftPart-2.js.map
//# sourceMappingURL=LeftPart-2.js.map