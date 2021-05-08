import { AppDispatchType } from 'types/miscTypes'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {MainTabDataType} from 'editor/special/MainTab/MainTab'
import {AppState} from 'store/rootReducer'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import actions from 'store/rootAction'


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
        iconType: 'siteTabSite',
        title: {
            eng: 'Site',
            rus: 'Сайт'
        }
    },
    {
        iconType: 'siteTabPlugins',
        title: {
            eng: 'Templates of plug-in files',
            rus: 'Шаблоны подключаемых файлов'
        }
    },
    {
        iconType: 'siteTabComponents',
        title: {
            eng: 'Component templates',
            rus: 'Шаблоны компонентов'
        },
    },
    {
        iconType: 'siteTabArticle',
        title: {
            eng: 'Articles',
            rus: 'Статьи'
        },
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
    dispatch: AppDispatchType,
    rightMainTab: number,
    isTabsDisabled: boolean
): MainTabDataType[] {
    // Сгенеривать данные четырёх вкладок
    return tabsData.map((tabData, i) => {
        return {
            title: tabData.title[lang],
            iconType: tabData.iconType,
            active: i === rightMainTab,
            position: <'top'|'left'>'left',
            disabled: (i !== 0 && isTabsDisabled),
            onClick: () => dispatch(actions.sites.setRightMainTab(i))
        }
    })
}
