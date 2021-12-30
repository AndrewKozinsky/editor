import { useEffect, useState } from 'react';
import { store } from 'store/rootReducer';
import actions from 'store/rootAction';
import { mainTabsMessages } from 'messages/mainTabsMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import useGetSettingsSelectors from 'store/settings/settingsSelectors';
/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData() {
    const mainTabsMsg = useGetMessages(mainTabsMessages);
    // Номер активной вкладки
    const { mainTab } = useGetSettingsSelectors();
    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState([]);
    useEffect(function () {
        // Сгенерировать данные и поставить в Местное состояние
        setTabsData(getTabData(mainTab, mainTabsMsg));
    }, [mainTab]);
    return tabsData;
}
/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} activeTabNum — номер активной вкладки
 * @param {Object} mainTabsMsg — номер активной вкладки
 */
function getTabData(activeTabNum, mainTabsMsg) {
    // Сгенеривать данные трёх вкладок
    return ['mainTabMaterials', 'mainTabEditor', 'mainTabSettings', 'mainTabHelp']
        .map((type, i) => {
        return {
            title: mainTabsMsg[type],
            iconType: type,
            active: i === activeTabNum,
            position: 'top',
            onClick: () => store.dispatch(actions.settings.setMainTab(i))
        };
    });
}
//# sourceMappingURL=SectionsTabs-func.js.map