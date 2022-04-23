import { ItemsListPropType, ItemType } from 'common/ItemsList/ItemsList'
import settingsPanelMsg from 'messages/settingsPanelMessages'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import actions from 'store/rootAction'
import { store } from 'store/rootReducer'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
export function useGetSettingsItemsListProps(): ItemsListPropType {

    // Активная вкладка панели настроек
    const { settingsPanelTab } = useGetSettingsSelectors()

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(settingsPanelMsg), // Список пунктов
        activeItemId: settingsPanelTab // id активного пункта
    }
}

/** Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки» */
function getItemsListProps(settingsPanelMsg: any): ItemType[] {
    return [
        {
            id: 'user',
            name: settingsPanelMsg.leftMenuItemUser,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTabOuter('user') )
        },
        {
            id: 'editor',
            name: settingsPanelMsg.leftMenuItemEditor,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTabOuter('editor') )
        }
    ]
}
