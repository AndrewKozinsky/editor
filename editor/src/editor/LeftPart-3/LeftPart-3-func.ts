import { MiscTypes } from 'types/miscTypes'
import {useDispatch, useSelector} from 'react-redux'
import { ItemsListPropType, ItemType } from 'common/ItemsList/ItemsList'
import {AppState} from 'store/rootReducer'
import { settingsPanelMessages } from 'messages/settingsPanelMessages'
import actions from 'store/rootAction'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
export function useGetSettingsItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppState) => store.settings.settingsPanelTab)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(dispatch), // Список пунктов
        activeItemId: activeTab // id активного пункта
    }
}

/**
 * Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки»
 * @param {Object} dispatch — диспетчер экшенов
 */
function getItemsListProps(dispatch: MiscTypes.AppDispatch): ItemType[] {
    return [
        {
            id: 'user',
            name: settingsPanelMessages.leftMenuItemUser,
            onClick: () => dispatch( actions.settings.setSettingsPanelTab('user') )
        },
        {
            id: 'editor',
            name: settingsPanelMessages.leftMenuItemEditor,
            onClick: () => dispatch( actions.settings.setSettingsPanelTab('editor') )
        }
    ]
}
