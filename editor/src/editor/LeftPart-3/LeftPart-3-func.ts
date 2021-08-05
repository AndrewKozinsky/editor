// import { useDispatch, useSelector } from 'react-redux'
// import { ItemsListPropType, ItemType } from 'common/ItemsList/ItemsList'
// import { AppState } from 'store/rootReducer'
// import actions from 'store/rootAction'
// import store from 'store/store'
// import { settingsPanelMessages } from 'messages/settingsPanelMessages'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
/*export function useGetSettingsItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppState) => store.settings.settingsPanelTab)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(), // Список пунктов
        activeItemId: activeTab // id активного пункта
    }
}*/

/** Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки» */
/*function getItemsListProps(): ItemType[] {
    return [
        {
            id: 'user',
            name: settingsPanelMessages.leftMenuItemUser,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTab('user') )
        },
        {
            id: 'editor',
            name: settingsPanelMessages.leftMenuItemEditor,
            onClick: () => store.dispatch( actions.settings.setSettingsPanelTab('editor') )
        }
    ]
}*/
