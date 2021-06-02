import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { MiscTypes } from 'types/miscTypes'
import {AppState} from 'store/rootReducer'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {MainTabDataType} from 'editor/special/MainTab/MainTab'
import actions from 'store/rootAction'
import messages from '../messages';


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)
    // Размер элементов интерфейса
    const { editorSize } = useSelector((store: AppState) => store.settings)
    // Текущая вкладка
    const { rightMainTab, currentSiteId } = useSelector((store: AppState) => store.sites)

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Если нажали на кнопку «Новый сайт», то все вкладки кроме первой должны быть заблокированы
        const isTabsDisabled = !currentSiteId

        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(editorSize, lang, dispatch, rightMainTab, isTabsDisabled) )
    }, [editorSize, lang, rightMainTab, currentSiteId])

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
 * @param {String} size —размер элементов интерфейса
 * @param {String} lang — язык интерфейса
 * @param {Function} dispatch — диспетчер
 * @param {Number} rightMainTab — номер активной вкладки
 * @param {Boolean} isTabsDisabled — должны ли все вкладки кроме первой быть заблокированы
 */
function getTabData(
    size: StoreSettingsTypes.EditorSize,
    lang: StoreSettingsTypes.EditorLanguage,
    dispatch: MiscTypes.AppDispatch,
    rightMainTab: number,
    isTabsDisabled: boolean
): MainTabDataType[] {
    // Сгенеривать данные четырёх вкладок
    return tabsData.map((tabData, i) => {
        return {
            title: messages.Tabs[tabData.titleIndex][lang],
            iconType: tabData.iconType,
            active: i === rightMainTab,
            position: <'top'|'left'>'left',
            disabled: (i !== 0 && isTabsDisabled),
            onClick: () => dispatch(actions.sites.setRightMainTab(i))
        }
    })
}
