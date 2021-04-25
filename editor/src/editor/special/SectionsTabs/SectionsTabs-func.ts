import {useEffect, useState} from 'react'
//@ts-ignore
import {Dispatch} from 'redux'
import { useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import { MainTabDataType } from '../MainTab/MainTab'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import actions from '../../../store/rootAction';

/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {
    const dispatch = useDispatch()

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Размер элементов интерфейса и номер активной вкладки
    const { editorSize, mainTab } = useSelector((store: AppState) => store.settings)

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(editorSize, lang, dispatch, mainTab) )
    }, [editorSize, lang, mainTab])

    return tabsData
}

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {String} size —размер элементов интерфейса
 * @param {String} lang — язык интерфейса
 * @param {Function} dispatch — диспетчер
 * @param {Number} activeTabNum — номер активной вкладки
 */
function getTabData(
    size: StoreSettingsTypes.EditorSize,
    lang: StoreSettingsTypes.EditorLanguage,
    dispatch: Dispatch,
    activeTabNum: number
): MainTabDataType[] {

    // Сгенеривать данные трёх вкладок
    return [0, 1, 2].map(i => {
        return {
            num: i + 1,
            title: titles[i][lang],
            iconType: getIconType(i, size),
            active: i === activeTabNum,
            position: <'top'|'left'>'top',
            onClick: () => dispatch(actions.settings.setMainTab(i))
        }
    })
}

/**
 * Функция возвращает тип значка вкладки в зависимости от индекса вкладки и размера интерфейса
 * @param {Number} index — индекс вкладки
 * @param {String} size — размер интерфейса
 */
function getIconType(index: number, size: StoreSettingsTypes.EditorSize) {
    const iconsTypes: {[key: string]: string}[] = [
        {
            small: 'mainTabMaterialsSmall',
            middle: 'mainTabMaterialsMiddle',
            big: 'mainTabMaterialsBig',
        },
        {
            small: 'mainTabEditorSmall',
            middle: 'mainTabEditorMiddle',
            big: 'mainTabEditorBig',
        },
        {
            small: 'mainTabSettingsSmall',
            middle: 'mainTabSettingsMiddle',
            big: 'mainTabSettingsBig',
        },
    ]

    return iconsTypes[index][size]
}

// Массив с подсказками вкладок
const titles = [
    {
        eng: 'Materials',
        rus: 'Материалы'
    },
    {
        eng: 'Editor',
        rus: 'Редактор'
    },
    {
        eng: 'Settings',
        rus: 'Настройки'
    },
]