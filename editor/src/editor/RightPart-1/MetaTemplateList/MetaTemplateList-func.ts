import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import StoreSitesTypes from 'store/site/sitesTypes'
import sitesActions from 'store/site/sitesActions'
import { ItemsListPropType } from 'common/ItemsList/ItemsList'
import {getState} from 'utils/miscUtils'


/** Хук скачивает с сервера массив шаблонов метаданных и ставит в Хранилище */
export function useFetchMetaTemplates() {
    const dispatch = useDispatch()

    const { currentSiteId } = useGetSitesSelectors()

    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        if (!currentSiteId) return

        // Запрос на получение шаблонов подключаемых файлов и установка в Хранилище
        dispatch( sitesActions.requestMetaTemplates() )
    }, [currentSiteId])
}


/** Хук возвращает атрибуты для компонента ItemsList для формирования списка шаблонов сайта */
export function useGetTemplatesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного шаблона сайта и массив всех шаблонов
    const { currentTemplateId, templates } = useGetSitesSelectors().metaTemplatesSection

    // Сформировать и вернуть объект с атрибутами списка шаблонов
    return {
        // Список пунктов
        items: templates.map((template: StoreSitesTypes.MetaTemplateType) => {
            const { currentSiteId } = getState().sites

            return {
                id: template.id,
                name: template.name,
                onClick: () => dispatch( sitesActions.setCurrentMetaTemplateIdOuter(currentSiteId, template.id) )
            }
        }),
        activeItemId: currentTemplateId // id активного пункта
    }
}

/** Хук возвращает обработчик щелчка по кнопке создания нового шаблона сайта */
export function useGetNewTemplateOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id шаблона метаданных
    // чтобы программа понимала, что нужно показать форму создания нового шаблона метаданных
    return function () {
        const { currentSiteId } = getState().sites

        // Поставить id шаблона подключаемых файлов. Пустая строка обозначает id нового шаблона.
        dispatch( sitesActions.setCurrentMetaTemplateIdOuter(currentSiteId, '') )
    }
}
