import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import actions from 'store/rootAction'
import {ItemsListPropType} from 'common/ItemsList/ItemsList'
import {AppState} from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'


// Хук скачивает с сервера массив шаблонов подключаемых файлов и ставит в Хранилище
export function useFetchPlugins() {
    const dispatch = useDispatch()

    // При загрузке компонента...
    useEffect(function () {
        // Запрос на получение шаблонов подключаемых файлов и установка в Хранилище
        dispatch( actions.sites.requestPlugins() )
    }, [])
}


/** Хук возвращает атрибуты для компонента ItemsList
 * для формирования списка шаблонов подключаемый файлов */
export function useGetTemplatesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного шаблона подключаемых файлов
    const {currentPluginId, plugins} = useSelector((store: AppState) => store.sites.pluginsSection)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: plugins.map((plugin: StoreSitesTypes.PluginType) => {
            return {
                id: plugin.id,
                name: plugin.name,
                onClick: () => dispatch( actions.sites.setCurrentPluginsId(plugin.id) )
            }
        }), // Список пунктов
        activeItemId: currentPluginId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового сайта */
export function useGetNewTemplateOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id выбранного сайта
    // чтобы программа понимала, что нужно показать форму создания нового сайта
    return function () {
        // Поставить id шаблона подключаемых файлов. Пустая строка обозначает id нового сайта.
        dispatch( actions.sites.setCurrentPluginsId('') )
    }
}
