import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import StoreSitesTypes from 'store/site/sitesTypes'
import sitesActions from 'store/site/sitesActions'
import { ItemsListPropType } from 'common/ItemsList/ItemsList'
import {getState} from 'utils/miscUtils'
import { setGroupSettings } from 'common/App/app-fn/localStorageProxy'


// Хук скачивает с сервера массив сайтов и ставит в Хранилище
export function useFetchSites() {
    const dispatch = useDispatch()

    // При загрузке компонента...
    useEffect(function () {
        // Сделать запрос на получение сайтов и установить в Хранилище
        dispatch( sitesActions.requestSites() )
    }, [])
}


/** Хук возвращает атрибуты для компонента ItemsList для формирования списка сайтов */
export function useGetSitesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного сайта и список сайтов
    const { currentSiteId, sites } = useGetSitesSelectors()

    // Сформировать и вернуть объект с атрибутами списка пунктов
    return {
        // Список пунктов
        items: sites.map((site: StoreSitesTypes.Site) => {
            return {
                id: site.id,
                name: site.name,
                onClick: () => {
                    // Поставить id этой группы в качестве выделенной группы
                    dispatch( sitesActions.setCurrentSiteIdOuter(site.id) )

                    // Найти в Хранилище настройки этой группы.
                    // Это какой шаблон выделен и прочие настройки касающиеся выделенных элементов.
                    const groupPermanentSettings = getState().localStorageProxy.groups.find(group => {
                        return group.groupId === site.id
                    })
                    // Если настройки найдены
                    if (groupPermanentSettings) {
                        // Выделить элементы, которые выделяли когда активной была эта группа
                        setGroupSettings(groupPermanentSettings, dispatch)
                    }
                }
            }
        }),
        activeItemId: currentSiteId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового сайта */
export function useGetNewSiteOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id выбранного сайта
    // чтобы программа понимала, что нужно показать форму создания нового сайта
    return useCallback(function () {
        // Поставить id сайта. Пустая строка обозначает id нового сайта.
        dispatch( sitesActions.setCurrentSiteIdOuter('') )
        // Поставить на первую правую вкладку
        dispatch( sitesActions.setRightMainTabOuter(0) )
    }, [])
}
