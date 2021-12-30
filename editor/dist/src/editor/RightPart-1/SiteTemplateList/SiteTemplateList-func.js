import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'store/rootAction';
import useGetSitesSelectors from 'store/site/sitesSelectors';
// Хук скачивает с сервера массив шаблонов подключаемых файлов и ставит в Хранилище
export function useFetchSiteTemplates() {
    const dispatch = useDispatch();
    const { currentSiteId } = useGetSitesSelectors();
    // При загрузке компонента и при изменении выбранного сайта...
    useEffect(function () {
        if (!currentSiteId)
            return;
        // Запрос на получение шаблонов подключаемых файлов и установка в Хранилище
        dispatch(actions.sites.requestSiteTemplates());
    }, [currentSiteId]);
}
/** Хук возвращает атрибуты для компонента ItemsList для формирования списка шаблонов сайта */
export function useGetTemplatesItemsListProps() {
    const dispatch = useDispatch();
    // id выбранного шаблона сайта и массив всех шаблонов
    const { currentTemplateId, templates } = useGetSitesSelectors().siteTemplatesSection;
    // Сформировать и вернуть объект с атрибутами списка шаблонов
    return {
        // Список пунктов
        items: templates.map((template) => {
            return {
                id: template.id,
                name: template.name,
                onClick: () => dispatch(actions.sites.setCurrentSiteTemplateId(template.id))
            };
        }),
        activeItemId: currentTemplateId // id активного пункта
    };
}
/** Хук возвращает обработчик щелчка по кнопке создания нового шаблона сайта */
export function useGetNewTemplateOnClickHandler() {
    const dispatch = useDispatch();
    // Функция ставит в Хранилище пустое значение в качестве id шаблона файлов
    // чтобы программа понимала, что нужно показать форму создания нового шаблона подключаемых файлов
    return function () {
        // Поставить id шаблона подключаемых файлов. Пустая строка обозначает id нового шаблона.
        dispatch(actions.sites.setCurrentSiteTemplateId(''));
    };
}
//# sourceMappingURL=SiteTemplateList-func.js.map