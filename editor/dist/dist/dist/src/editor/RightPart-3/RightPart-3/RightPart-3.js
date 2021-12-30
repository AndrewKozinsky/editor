import React, { useEffect, useState } from 'react';
import useGetSettingsSelectors from 'store/settings/settingsSelectors';
import HeaderPage from 'common/HeaderPage/HeaderPage';
import SettingsUserTabContent from '../SettingsUserTabContent/SettingsUserTabContent';
import SettingsEditorTabContent from '../SettingsEditorTabContent/SettingsEditorTabContent';
import { userTabContentMessages } from 'messages/userTabContentMessages';
import { editorTabContentMessages } from 'messages/editorTabContentMessages';
import './RightPart-3.scss';
/** Правая часть третьей главной вкладки */
export default function RightPart3(props) {
    const { display // Показывать ли обёртку
     } = props;
    // Язык и активная вкладка панели настроек
    const { editorLanguage, settingsPanelTab } = useGetSettingsSelectors();
    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(React.createElement(React.Fragment, null));
    useEffect(function () {
        // Составление массива из двух элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = ['user', 'editor'].map((tabName) => {
            if (tabName === 'user') {
                return (React.createElement(HeaderPage, { headerText: userTabContentMessages.header[editorLanguage], display: tabName === settingsPanelTab, key: tabName }, React.createElement(SettingsUserTabContent, null)));
            }
            else if (tabName === 'editor') {
                return (React.createElement(HeaderPage, { headerText: editorTabContentMessages.header[editorLanguage], display: tabName === settingsPanelTab, key: tabName }, React.createElement(SettingsEditorTabContent, null)));
            }
        });
        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents(React.createElement(React.Fragment, null, parts));
    }, [settingsPanelTab, editorLanguage]);
    const CN = 'right-part-3';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }, partComponents));
}
//# sourceMappingURL=RightPart-3.js.map
//# sourceMappingURL=RightPart-3.js.map
//# sourceMappingURL=RightPart-3.js.map