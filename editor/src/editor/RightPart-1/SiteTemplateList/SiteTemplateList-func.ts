import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import StoreSitesTypes from 'store/site/sitesTypes'
import { ItemsListPropType } from 'common/ItemsList/ItemsList'
import sitesActions from 'store/site/sitesActions'


/** Хук скачивает с сервера массив шаблонов подключаемых файлов и ставит в Хранилище */
export function useFetchSiteTemplates() {
    const dispatch = useDispatch()

    const { currentSiteId } = useGetSitesSelectors()

    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        if (!currentSiteId) return

        // Запрос на получение шаблонов подключаемых файлов и установка в Хранилище
        dispatch( sitesActions.requestSiteTemplates() )
    }, [currentSiteId])
}


/** Хук возвращает атрибуты для компонента ItemsList для формирования списка шаблонов сайта */
export function useGetTemplatesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного шаблона сайта и массив всех шаблонов
    const { currentSiteId } = useGetSitesSelectors()
    const { currentTemplateId, templates } = useGetSitesSelectors().siteTemplatesSection

    // Сформировать и вернуть объект с атрибутами списка шаблонов
    return {
        // Список пунктов
        items: templates.map((template: StoreSitesTypes.SiteTemplateType) => {
            return {
                id: template.id,
                name: template.name,
                onClick: () => {
                    dispatch( sitesActions.setCurrentSiteTemplateIdOuter(currentSiteId, template.id) )
                }
            }
        }),
        activeItemId: currentTemplateId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового шаблона сайта */
export function useGetNewTemplateOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id шаблона файлов
    // чтобы программа понимала, что нужно показать форму создания нового шаблона подключаемых файлов
    return function () {
        // Поставить id шаблона подключаемых файлов. Пустая строка обозначает id нового шаблона.
        dispatch( sitesActions.setCurrentSiteTemplateIdOuter(null, '') )
    }
}
