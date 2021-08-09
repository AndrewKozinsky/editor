import {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import store from 'store/store'
import actions from 'store/rootAction'
import { mainTabsMessages } from 'messages/mainTabsMessages'
import { MainTabDataType } from '../MainTab/MainTab'


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {

    // Номер активной вкладки
    const { mainTab } = useSelector((store: AppState) => store.settings)

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(mainTab) )
    }, [mainTab])

    return tabsData
}

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} activeTabNum — номер активной вкладки
 */
function getTabData( activeTabNum: number ): MainTabDataType[] {

    // Сгенеривать данные трёх вкладок
    return ['mainTabMaterials', 'mainTabEditor', 'mainTabSettings', 'mainTabHelp']
        .map((type, i) => {
        return {
            // num: i + 1, // I think I can delete it
            title: mainTabsMessages[type],
            iconType: type,
            active: i === activeTabNum,
            position: <'top'|'left'>'top',
            onClick: () => store.dispatch(actions.settings.setMainTab(i))
        }
    })
}
