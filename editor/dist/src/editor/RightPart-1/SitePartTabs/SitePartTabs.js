import React from 'react';
import MainTab from 'editor/special/MainTab/MainTab';
import { useGetTabData } from './SitePartTabs-func';
import './SitePartTabs.scss';
/** Компонент 4-х вкладок в сайтах */
export default function SitePartTabs() {
    const CN = 'site-part-tabs';
    // Данные для генерирования вкладок
    const tabsDataArr = useGetTabData();
    return (React.createElement("div", { className: CN }, tabsDataArr.map((tabData, i) => {
        return React.createElement(MainTab, { tabData: tabData, key: tabData.title });
    })));
}
//# sourceMappingURL=SitePartTabs.js.map