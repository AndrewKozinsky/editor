import React from 'react';
import Wrapper from 'common/Wrapper/Wrapper';
import LanguageSection from '../LanguageSection/LanguageSection';
import ThemeSection from '../ThemeSection/ThemeSection';
/* Вкладка с настройками редактора */
export default function SettingsEditorTabContent() {
    return (React.createElement("div", null,
        React.createElement(Wrapper, null,
            React.createElement(LanguageSection, null)),
        React.createElement(Wrapper, { t: 20 },
            React.createElement(ThemeSection, null))));
}
//# sourceMappingURL=SettingsEditorTabContent.js.map