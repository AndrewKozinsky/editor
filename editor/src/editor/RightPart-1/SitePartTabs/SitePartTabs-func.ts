import { useEffect, useState } from 'react'
import { store } from 'store/rootReducer'
import sitesActions from 'store/site/sitesActions'
import { MainTabDataType } from 'editor/special/MainTab/MainTab'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import rightTabsMsg from 'messages/rightTabsMessages'
import iconsCollector from 'common/icons/js/getIcon'


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {

    // Текущая вкладка
    const { rightMainTab, currentSiteId } = useGetSitesSelectors()

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Если нажали на кнопку «Новый сайт», то все вкладки кроме первой должны быть заблокированы
        const isTabsDisabled = !currentSiteId

        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(rightMainTab, isTabsDisabled) )
    }, [rightMainTab, currentSiteId])

    return tabsData
}

type TabDataType = {
    iconType: keyof typeof iconsCollector,
    titleIndex: keyof typeof rightTabsMsg
}
type TabDataTypeArr = TabDataType[]

// Массив с данными вкладок
const tabsData: TabDataTypeArr = [
    {
        iconType: 'groupTabGroup', // тип значка
        titleIndex: 'groups' // название свойства для получения названия в messages
    },
    {
        iconType: 'groupTabTemplates',
        titleIndex: 'groupTemplates'
    },
    {
        iconType: 'groupTabMeta',
        titleIndex: 'meta'
    },
    {
        iconType: 'groupTabComponents',
        titleIndex: 'components',
    },
    {
        iconType: 'groupTabArticle',
        titleIndex: 'articles',
    },
]

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} rightMainTab — номер активной вкладки
 * @param {Boolean} isTabsDisabled — должны ли все вкладки кроме первой быть заблокированы
 */
function getTabData(
    rightMainTab: number,
    isTabsDisabled: boolean,
): MainTabDataType[] {
    // Сгенерировать данные четырёх вкладок
    return tabsData.map((tabData, i) => {
        return {
            title: rightTabsMsg[tabData.titleIndex],
            iconType: tabData.iconType,
            active: i === rightMainTab,
            position: <'top'|'left'>'left',
            disabled: (i !== 0 && isTabsDisabled),
            onClick: () => store.dispatch(sitesActions.setRightMainTabOuter(i))
        }
    })
}
