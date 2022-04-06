import { ItemsListPropType, ItemType } from 'common/ItemsList/ItemsList'
import { store } from 'store/rootReducer'
import helpActions from 'store/help/helpActions'
import useGetHelpSelectors from 'store/help/helpSelectors'
import helpPanelMsg from 'messages/helpPanelMessages'

/** Хук возвращает атрибуты для компонента ItemsList для формирования списка пунктов панели «Настройки» */
export function useGetHelpItemsListProps(): ItemsListPropType {

    // Активная вкладка панели помощи
    const { helpPanelTab } = useGetHelpSelectors()

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: getItemsListProps(), // Список пунктов
        activeItemId: helpPanelTab // id активного пункта
    }
}

/** Функция формирует и возвращает объект с атрибутами списка пунктов панели «Настройки» */
function getItemsListProps(): ItemType[] {
    return [
        {
            id: 'reg',
            name: helpPanelMsg.leftMenuItemReg,
            onClick: () => store.dispatch( helpActions.setHelpPanelTab('reg') )
        }
    ]
}
