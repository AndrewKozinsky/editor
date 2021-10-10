import { useEffect, useState } from 'react'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import {MainTabDataType} from 'editor/special/MainTab/MainTab'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import { rightTabsMessages } from 'messages/rightTabsMessages'
import useGetMessages from 'messages/fn/useGetMessages'


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {

    // Текущая вкладка
    const { rightMainTab, currentSiteId } = useGetSitesSelectors()

    const rightTabsMsg = useGetMessages(rightTabsMessages)

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Если нажали на кнопку «Новый сайт», то все вкладки кроме первой должны быть заблокированы
        const isTabsDisabled = !currentSiteId

        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(rightMainTab, isTabsDisabled, rightTabsMsg) )
    }, [rightMainTab, currentSiteId])

    return tabsData
}

// Массив с данными вкладок
const tabsData = [
    {
        iconType: 'siteTabSite', // тип значка
        titleIndex: 'sites' // название свойства для получения названия в messages
    },
    {
        iconType: 'siteTabPlugins',
        titleIndex: 'incFilesTemplates'
    },
    {
        iconType: 'siteTabComponents',
        titleIndex: 'components',
    },
    {
        iconType: 'siteTabArticle',
        titleIndex: 'articles',
    },
]

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} rightMainTab — номер активной вкладки
 * @param {Boolean} isTabsDisabled — должны ли все вкладки кроме первой быть заблокированы
 * @param {Object} rightTabsMsg — объкт с текстами подсказок при наведение на вкладки
 */
function getTabData(
    rightMainTab: number,
    isTabsDisabled: boolean,
    rightTabsMsg: any
): MainTabDataType[] {
    // Сгенеривать данные четырёх вкладок
    return tabsData.map((tabData, i) => {
        return {
            title: rightTabsMsg[tabData.titleIndex],
            iconType: tabData.iconType,
            active: i === rightMainTab,
            position: <'top'|'left'>'left',
            disabled: (i !== 0 && isTabsDisabled),
            onClick: () => store.dispatch(actions.sites.setRightMainTab(i))
        }
    })
}
