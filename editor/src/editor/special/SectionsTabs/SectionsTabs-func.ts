import {useEffect, useState} from 'react'
import { AppDispatchType } from 'types/miscTypes'
import { useDispatch, useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import actions from 'store/rootAction'
import { MainTabDataType } from '../MainTab/MainTab'
import StoreSettingsTypes from 'store/settings/settingsTypes'

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
    dispatch: AppDispatchType,
    activeTabNum: number
): MainTabDataType[] {

    // Сгенеривать данные трёх вкладок
    return [0, 1, 2].map(i => {
        return {
            num: i + 1,
            title: titles[i][lang],
            iconType: getIconType(i),
            active: i === activeTabNum,
            position: <'top'|'left'>'top',
            onClick: () => dispatch(actions.settings.setMainTab(i))
        }
    })
}

/**
 * Функция возвращает тип значка вкладки в зависимости от индекса вкладки и размера интерфейса
 * @param {Number} index — индекс вкладки
 */
function getIconType(index: number) {
    const iconsTypes = [
        'mainTabMaterials',
        'mainTabEditor',
        'mainTabSettings'
    ]

    return iconsTypes[index]
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