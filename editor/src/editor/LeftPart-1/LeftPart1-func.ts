import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGetSites} from 'requests/authRequests'
import actions from 'store/rootAction'
import {ItemsListPropType} from 'common/ItemsList/ItemsList'
import {AppState} from 'store/rootReducer'
import StoreSitesTypes from 'store/site/sitesTypes'


// Хук скачивает с сервера массив сайтов и ставит в Хранилище
export function useFetchSites() {
    const dispatch = useDispatch()

    // Токен пользователя и функция для его запроса
    const { response, doFetch } = useGetSites()

    // При загрузке компонента...
    useEffect(function () {
        // Сделать запрос на получение массива сайтов
        doFetch()
    }, [])

    // При получении массива сайтов
    useEffect(function () {
        if (!response || response.status !== 'success') return

        // Формированое массива сайтов для установки в Хранилище
        const preparedSites = response.data.sites.map((site: any) => {
            return {
                id: site._id,
                name: site.name
            }
        })

        // Установка сайтов в Хранилище
        dispatch( actions.sites.setSites(preparedSites) )
    }, [response])
}


/** Хук возвращает атрибуты для компонента ItemsList для формирования списка сайтов */
export function useGetSitesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного сайта
    const {currentSiteId, sites} = useSelector((store: AppState) => store.sites)

    // Сформировать и вернуть объект с атрибутами списка пунктов панели «Настройки»
    return {
        items: sites.map((site: StoreSitesTypes.SiteType) => {
            return {
                id: site.id,
                name: site.name,
                onClick: () => dispatch( actions.sites.setCurrentSiteId(site.id) )
            }
        }), // Список пунктов
        activeItemId: currentSiteId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового сайта */
export function useGetNewSiteOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id выбранного сайта
    // чтобы программа понимала, что нужно показать форму создания нового сайта
    return function () {
        // Поставить id сайта. Пустая строка обозначает id нового сайта.
        dispatch( actions.sites.setCurrentSiteId('') )
        // Поставить на первую правую вкладку
        dispatch( actions.sites.setRightMainTab(0) )
    }
}
