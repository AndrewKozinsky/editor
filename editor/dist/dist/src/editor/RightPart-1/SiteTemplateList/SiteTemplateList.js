import React from 'react';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import Button from 'common/formElements/Button/Button';
import Wrapper from 'common/Wrapper/Wrapper';
import { siteTemplateSectionMessages } from 'messages/siteTemplateSectionMessages';
import useGetMessages from 'messages/fn/useGetMessages';
import ItemsList from 'common/ItemsList/ItemsList';
import { useFetchSiteTemplates, useGetNewTemplateOnClickHandler, useGetTemplatesItemsListProps } from './SiteTemplateList-func';
/** Компонент кнопки создания нового сайта */
export function NewTemplateButton() {
    // id выделенного сайта
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection;
    const siteTemplateSectionMsg = useGetMessages(siteTemplateSectionMessages);
    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewTemplateOnClickHandler();
    // Атрибуты кнопки
    const attrs = {
        text: siteTemplateSectionMsg.newTemplateBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    };
    if (currentTemplateId === '') {
        attrs.color = 'accent';
    }
    return React.createElement(Button, Object.assign({}, attrs));
}
/** Компонент списка шаблонов сайта */
export function TemplatesList() {
    // Получить с сервера список шаблонов подключаемых файлов и поставить в Хранилище
    useFetchSiteTemplates();
    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetTemplatesItemsListProps();
    return (React.createElement(Wrapper, { t: 10 }, React.createElement(ItemsList, Object.assign({}, itemsListProps))));
}
//# sourceMappingURL=SiteTemplateList.js.map
//# sourceMappingURL=SiteTemplateList.js.map