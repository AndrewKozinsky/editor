import React from 'react'
import MainTab, {MainTabDataType} from '../MainTab/MainTab'
import { useGetTabData } from './SectionsTabs-func'
import './SectionsTabs.scss'


/** Компонент вкладок переключающих разделы радактора */
export default function SectionsTabs() {

    const CN = 'section-tabs'

    // Данные для генерирования вкладок
    const tabsDataArr: MainTabDataType[] = useGetTabData()

    return (
        <div className={CN}>
            {tabsDataArr.map(tabData => {
                return <MainTab tabData={tabData} key={tabData.title} />
            })}
        </div>
    )
}



