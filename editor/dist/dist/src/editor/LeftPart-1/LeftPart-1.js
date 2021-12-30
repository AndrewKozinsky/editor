import React from 'react';
import NameSection from 'editor/wrappers/NameSection/NameSection';
import Button from 'common/formElements/Button/Button';
import { useFetchSites, useGetNewSiteOnClickHandler, useGetSitesItemsListProps } from './LeftPart1-func';
import ItemsList from 'common/ItemsList/ItemsList';
import Wrapper from 'common/Wrapper/Wrapper';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import useGetMessages from 'messages/fn/useGetMessages';
import { sitesPanelMessages } from 'messages/sitesPanelMessages';
import './LeftPart-1.scss';
/** Левая часть первой главной вкладки */
export default function LeftPart1(props) {
    const { display // Показывать ли компонент
     } = props;
    const sitesPanelMsg = useGetMessages(sitesPanelMessages);
    // Атрибуты обёртки панели
    const CN = 'left-part-1';
    const style = display ? {} : { display: 'none' };
    return (React.createElement("div", { className: CN, style: style }, React.createElement(NameSection, { header: sitesPanelMsg.header }, React.createElement(NewSiteButton, null), React.createElement(SitesButtons, null))));
}
/** Кнопка создания нового сайта */
function NewSiteButton() {
    // id выделенного сайта
    const { currentSiteId } = useGetSitesSelectors();
    // Обработчик щелчка по кнопке
    const onClickHandler = useGetNewSiteOnClickHandler();
    const sitesPanelMsg = useGetMessages(sitesPanelMessages);
    // Атрибуты кнопки
    const attrs = {
        text: sitesPanelMsg.newSiteBtn,
        icon: 'btnSignAdd',
        block: true,
        onClick: onClickHandler
    };
    if (currentSiteId === '') {
        attrs.color = 'accent';
    }
    return React.createElement(Button, Object.assign({}, attrs));
}
/** Компонент списка сайтов */
function SitesButtons() {
    // Получить с сервера список сайтов и поставить в Хранилище
    useFetchSites();
    // Аргументы для компонента выводящий список сайтов
    const itemsListProps = useGetSitesItemsListProps();
    return (React.createElement(Wrapper, { t: 10 }, React.createElement(ItemsList, Object.assign({}, itemsListProps))));
}
//# sourceMappingURL=LeftPart-1.js.map
//# sourceMappingURL=LeftPart-1.js.map