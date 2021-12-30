import React, { useEffect, useState } from 'react';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import SiteSection from '../SiteSection/SiteSection/SiteSection';
import HeaderPage from 'common/HeaderPage/HeaderPage';
import { NewTemplateButton, TemplatesList } from '../SiteTemplateList/SiteTemplateList';
import SiteTemplateForm from '../SiteTemplateForm/TemplateSection/siteTemplateForm';
import FoldersList from '../ComponentsOrArticles/FoldersList/FoldersList';
import ComponentFormProvider from '../ComponentsOrArticles/ComponentFormProvider';
import ArticleFormProvider from '../ComponentsOrArticles/ArticleFormProvider';
import { rightTabsMessages } from 'messages/rightTabsMessages';
import useGetMessages from 'messages/fn/useGetMessages';
/**
 * Компонент возвращает компоненты, которые должны быть показаны в правой части выбранного сайта
 * в зависимости от выбранной вкладки
 */
export default function SitePartProvider() {
    // Current site id and active tab number
    const { currentSiteId, rightMainTab } = useGetSitesSelectors();
    // id выделенного шаблона сайта
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection;
    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(null);
    // Тексты названий вкладок на первой правой вкладке
    const rightTabsMsg = useGetMessages(rightTabsMessages);
    useEffect(function () {
        // Составление массива из четырёх элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = [0, 1, 2, 3].map((num) => {
            if (num === 0) {
                return (React.createElement(HeaderPage, { headerText: rightTabsMsg.sites, display: num === rightMainTab, key: num },
                    React.createElement(SiteSection, null)));
            }
            else if (num === 1) {
                return (React.createElement(HeaderPage, { headerText: rightTabsMsg.siteTemplates, display: num === rightMainTab, key: num },
                    React.createElement(React.Fragment, null,
                        React.createElement(NewTemplateButton, null),
                        React.createElement(TemplatesList, null)),
                    currentTemplateId !== null && React.createElement(SiteTemplateForm, null)));
            }
            else if (num === 2) {
                return (React.createElement(HeaderPage, { headerText: rightTabsMsg.components, display: num === rightMainTab, key: num },
                    React.createElement(FoldersList, { type: 'components' }),
                    React.createElement(ComponentFormProvider, null)));
            }
            else if (num === 3) {
                return (React.createElement(HeaderPage, { headerText: rightTabsMsg.articles, display: num === rightMainTab, key: num },
                    React.createElement(FoldersList, { type: 'articles' }),
                    React.createElement(ArticleFormProvider, null)));
            }
        });
        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents(React.createElement(React.Fragment, null, parts));
    }, [currentSiteId, rightMainTab, currentTemplateId]);
    return partComponents;
}
//# sourceMappingURL=SitePartProvider.js.map