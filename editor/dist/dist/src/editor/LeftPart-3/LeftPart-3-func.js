import useGetSettingsSelectors from 'store/settings/settingsSelectors';
import actions from 'store/rootAction';
import { store } from 'store/rootReducer';
import { settingsPanelMessages } from 'messages/settingsPanelMessages';
import useGetMessages from 'messages/fn/useGetMessages';
/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
export function useGetSettingsItemsListProps() {
    const settingsPanelMsg = useGetMessages(settingsPanelMessages);
    // Активная вкладка панели настроек
    const { settingsPanelTab } = useGetSettingsSelectors();
    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(settingsPanelMsg),
        activeItemId: settingsPanelTab // id активного пункта
    };
}
/** Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки» */
function getItemsListProps(settingsPanelMsg) {
    return [
        {
            id: 'user',
            name: settingsPanelMsg.leftMenuItemUser,
            onClick: () => store.dispatch(actions.settings.setSettingsPanelTab('user'))
        },
        {
            id: 'editor',
            name: settingsPanelMsg.leftMenuItemEditor,
            onClick: () => store.dispatch(actions.settings.setSettingsPanelTab('editor'))
        }
    ];
}
//# sourceMappingURL=LeftPart-3-func.js.map
//# sourceMappingURL=LeftPart-3-func.js.map