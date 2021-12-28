import React from 'react'
import makeClasses from './SectionsTabs-classes'
import MainTab, { MainTabDataType } from '../MainTab/MainTab'
import { useGetTabData } from './SectionsTabs-func'
import ArticleMenuButton from '../ArticleMenu/ArticleMenu'


/** Компонент вкладок переключающих разделы редактора */
export default function SectionsTabs() {
    const CN = makeClasses()

    // Данные для генерирования вкладок
    const tabsDataArr: MainTabDataType[] = useGetTabData()

    return (
        <div className={CN.root}>
            <div>
                {tabsDataArr.map(tabData => {
                    return <MainTab tabData={tabData} key={tabData.title} />
                })}
            </div>
            <ArticleMenuButton />
        </div>
    )
}
