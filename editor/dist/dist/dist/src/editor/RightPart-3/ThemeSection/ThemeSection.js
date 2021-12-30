import React from 'react';
import { useDispatch } from 'react-redux';
import actions from 'store/rootAction';
import FieldGroup from 'common/formElements/FieldGroup/FieldGroup';
import SvgIcon from 'common/icons/SvgIcon';
import Wrapper from 'common/Wrapper/Wrapper';
import { themeSectionMessages } from 'messages/themeSectionMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import useGetSettingsSelectors from 'store/settings/settingsSelectors';
// TODO Что делает эта функция?
export default function ThemeSection() {
    const themeSectionMsg = useGetMessages(themeSectionMessages);
    // Тема интерфейса
    const { editorTheme } = useGetSettingsSelectors();
    // Обработчик изменения переключателя темы интерфейса
    const onChangeHandler = useGetOnChangeHandler();
    return (React.createElement(FieldGroup, { label: themeSectionMsg.themeRadiosHeader, inputType: 'radio', groupName: 'theme', value: [editorTheme], gap: 20, vertical: true, onChange: onChangeHandler, inputsArr: [
            {
                value: 'light',
                label: (React.createElement(React.Fragment, null, themeSectionMsg.lightLabel, React.createElement(Wrapper, { t: 5 }, React.createElement(SvgIcon, { type: 'editorLightTheme' }))))
            },
            {
                value: 'dark',
                label: (React.createElement(React.Fragment, null, themeSectionMsg.darkLabel, React.createElement(Wrapper, { t: 5 }, React.createElement(SvgIcon, { type: 'editorDarkTheme' }))))
            }
        ] }));
}
// Обработчик изменения переключателя темы интерфейса
function useGetOnChangeHandler() {
    const dispatch = useDispatch();
    return function (e) {
        const value = e.target.value;
        dispatch(actions.settings.setEditorTheme(value));
    };
}
//# sourceMappingURL=ThemeSection.js.map
//# sourceMappingURL=ThemeSection.js.map
//# sourceMappingURL=ThemeSection.js.map