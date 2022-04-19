import { useEffect } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import StoreSitesTypes from 'store/site/sitesTypes'
import sitesActions from 'store/site/sitesActions'
import articleActions from 'store/article/articleActions'
import { ItemsListPropType } from 'common/ItemsList/ItemsList'


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
                    dispatch( sitesActions.setCurrentSiteId(site.id) )
                    dispatch( sitesActions.setCurrentSiteTemplateId(null) )
                    // Clear opened component item (folder or file)
                    dispatch( sitesActions.setCurrentComp(null, null) )
                    // Clear opened article item id (folder or file)
                    dispatch( sitesActions.setCurrentArt(null, null) )
                    // Очистить редактируемую статью
                    dispatch( articleActions.clearArticle() )


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
        dispatch( sitesActions.setCurrentSiteId('') )
        // Поставить на первую правую вкладку
        dispatch( sitesActions.setRightMainTab(0) )
    }, [])
}
