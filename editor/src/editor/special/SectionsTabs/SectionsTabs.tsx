import React from 'react'
// import ArticleMenu from '../ArticleMenu/ArticleMenu'
import MainTab, { MainTabDataType } from '../MainTab/MainTab'
import { useGetTabData } from './SectionsTabs-func'
// import ArticleMenuButton from '../ArticleMenu/ArticleMenu'
import './SectionsTabs.scss'


/** Компонент вкладок переключающих разделы радактора */
export default function SectionsTabs() {

    const CN = 'section-tabs'

    // Данные для генерирования вкладок
    const tabsDataArr: MainTabDataType[] = useGetTabData()

    return (
        <div className={CN}>
            <div>
                {tabsDataArr.map(tabData => {
                    return <MainTab tabData={tabData} key={tabData.title} />
                })}
            </div>
            {/*<ArticleMenuButton />*/}
        </div>
    )
}

