import React from 'react';
import makeClasses from './SectionsTabs-classes';
import MainTab from '../MainTab/MainTab';
import { useGetTabData } from './SectionsTabs-func';
import ArticleMenuButton from '../ArticleMenu/ArticleMenu';
/** Компонент вкладок переключающих разделы редактора */
export default function SectionsTabs() {
    const CN = makeClasses();
    // Данные для генерирования вкладок
    const tabsDataArr = useGetTabData();
    return (React.createElement("div", { className: CN.root }, React.createElement("div", null, tabsDataArr.map(tabData => {
        return React.createElement(MainTab, { tabData: tabData, key: tabData.title });
    })), React.createElement(ArticleMenuButton, null)));
}
//# sourceMappingURL=SectionsTabs.js.map
//# sourceMappingURL=SectionsTabs.js.map
//# sourceMappingURL=SectionsTabs.js.map