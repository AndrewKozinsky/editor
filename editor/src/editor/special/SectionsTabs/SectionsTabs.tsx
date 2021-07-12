import React from 'react'
import ArticleMenu from '../ArticleMenu/ArticleMenu'
import MainTab, {MainTabDataType} from '../MainTab/MainTab'
import { useGetTabData } from './SectionsTabs-func'
import './SectionsTabs.scss'
import ArticleMenuButton from '../ArticleMenu/ArticleMenu'


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
            <ArticleMenuButton />
        </div>
    )
}

