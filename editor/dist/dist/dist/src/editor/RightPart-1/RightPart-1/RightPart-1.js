import React from 'react';
import SitePartProvider from '../SitePartProvider/SitePartProvider';
import SitePartTabs from '../SitePartTabs/SitePartTabs';
import useGetSitesSelectors from 'store/site/sitesSelectors';
import './RightPart-1.scss';
/** Правая часть первой главной вкладки */
export default function RightPart1(props) {
    const { display // Показывать ли обёртку
     } = props;
    // Выделенный сайт
    const { currentSiteId } = useGetSitesSelectors();
    const CN = 'right-part-1';
    const style = display ? {} : { display: 'none' };
    // Ничего не отрисовать если сайт не выделен
    if (currentSiteId === null)
        return null;
    return (React.createElement("div", { className: CN, style: style }, React.createElement(SitePartTabs, null), React.createElement(SitePartProvider, null)));
}
//# sourceMappingURL=RightPart-1.js.map
//# sourceMappingURL=RightPart-1.js.map
//# sourceMappingURL=RightPart-1.js.map