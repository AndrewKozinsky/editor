// import {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import actions from 'src/store/rootAction'
// import {ItemsListPropType} from 'src/common/ItemsList/ItemsList'
// import {AppState} from 'src/store/rootReducer'
// import StoreSitesTypes from 'src/store/site/sitesTypes'


// Хук скачивает с сервера массив шаблонов подключаемых файлов и ставит в Хранилище
/*export function useFetchIncFilesTemplates() {
    const dispatch = useDispatch()

    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        if (!currentSiteId) return

        // Запрос на получение шаблонов подключаемых файлов и установка в Хранилище
        dispatch( actions.sites.requestIncFilesTemplates() )
    }, [currentSiteId])
}*/


/** Хук возвращает атрибуты для компонента ItemsList
 * для формирования списка шаблонов подключаемый файлов */
/*export function useGetTemplatesItemsListProps(): ItemsListPropType {
    const dispatch = useDispatch()

    // id выбранного шаблона подключаемых файлов
    const {currentTemplateId, templates} = useSelector((store: AppState) => store.sites.incFilesTemplatesSection)

    // Сформировать и вернуть объект с атрибутами списка шаблонов
    return {
        items: templates.map((template: StoreSitesTypes.IncFilesTemplateType) => {
            return {
                id: template.id,
                name: template.name,
                onClick: () => dispatch( actions.sites.setCurrentIncFilesTemplateId(template.id) )
            }
        }), // Список пунктов
        activeItemId: currentTemplateId // id активного пункта
    }
}*/

/** Хук возвращает обработчик щелчка по кнопке создания нового сайта */
/*export function useGetNewTemplateOnClickHandler() {
    const dispatch = useDispatch()

    // Функция ставит в Хранилище пустое значение в качестве id выбранного сайта
    // чтобы программа понимала, что нужно показать форму создания нового сайта
    return function () {
        // Поставить id шаблона подключаемых файлов. Пустая строка обозначает id нового сайта.
        dispatch( actions.sites.setCurrentIncFilesTemplateId('') )
    }
}*/
