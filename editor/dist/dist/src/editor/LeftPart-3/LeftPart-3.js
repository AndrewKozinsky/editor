import React from 'react';
import NameSection from 'editor/wrappers/NameSection/NameSection';
import ItemsList from 'common/ItemsList/ItemsList';
import { useGetSettingsItemsListProps } from './LeftPart-3-func';
import { settingsPanelMessages } from 'messages/settingsPanelMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import './LeftPart-3.scss';
/** Левая часть третьей главной вкладки */
export default function LeftPart3(props) {
    const { display // Показывать ли обёртку
     } = props;
    const settingsPanelMsg = useGetMessages(settingsPanelMessages);
    // Аргументы для компонента выводящий список пунктов настроек
    const itemsListProps = useGetSettingsItemsListProps();
    const CN = 'left-part-3';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }, React.createElement(NameSection, { header: settingsPanelMsg.header }, React.createElement(ItemsList, Object.assign({}, itemsListProps)))));
}
//# sourceMappingURL=LeftPart-3.js.map
//# sourceMappingURL=LeftPart-3.js.map