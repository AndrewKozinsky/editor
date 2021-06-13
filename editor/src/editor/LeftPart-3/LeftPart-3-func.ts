// import { MiscTypes } from 'types/miscTypes'
// import {useDispatch, useSelector} from 'react-redux'
// import { ItemsListPropType, ItemType } from 'src/common/ItemsList/ItemsList'
// import {AppState} from 'src/store/rootReducer'
// import messages from '../messages'
// import actions from 'src/store/rootAction'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
/*export function useGetSettingsItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)
    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppState) => store.settings.settingsPanelTab)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(dispatch, lang), // Список пунктов
        activeItemId: activeTab // id активного пункта
    }
}*/

/**
 * Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки»
 * @param {Object} dispatch
 * @param {String} lang — язык интерфейса
 */
/*function getItemsListProps(dispatch: MiscTypes.AppDispatch, lang: StoreSettingsTypes.EditorLanguage): ItemType[] {
    return [
        {
            id: 'user',
            name: messages.SettingsPanel.leftMenuItemUser[lang],
            onClick: () => dispatch( actions.settings.setSettingsPanelTab('user') )
        },
        {
            id: 'editor',
            name: messages.SettingsPanel.leftMenuItemEditor[lang],
            onClick: () => dispatch( actions.settings.setSettingsPanelTab('editor') )
        }
    ]
}*/
