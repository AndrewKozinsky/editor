import { useEffect, useState } from 'react'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import { MainTabDataType } from '../MainTab/MainTab'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import mainTabsMsg from 'messages/mainTabsMessages'


/** Хук возвращает данные для генерирования вкладок разделов */
export function useGetTabData(): MainTabDataType[] {

    // Номер активной вкладки
    const { mainTab } = useGetSettingsSelectors()

    // Возвращаемые функцией данные по вкладкам
    const [tabsData, setTabsData] = useState<MainTabDataType[]>([])

    useEffect(function () {
        // Сгенерировать данные и поставить в Местное состояние
        setTabsData( getTabData(mainTab, mainTabsMsg) )
    }, [mainTab])

    return tabsData
}

/**
 * Функция возвращает данные для генерирования вкладок разделов
 * @param {Number} activeTabNum — номер активной вкладки
 * @param {Object} mainTabsMsg — номер активной вкладки
 */
function getTabData( activeTabNum: number, mainTabsMsg: any ): MainTabDataType[] {
    // Сгенеривать данные трёх вкладок
    return ['mainTabMaterials', 'mainTabEditor', 'mainTabSettings', 'mainTabHelp']
        .map((type, i) => {
            return {
                title: mainTabsMsg[type],
                iconType: type,
                active: i === activeTabNum,
                position: <'top'|'left'>'top',
                onClick: () => store.dispatch(actions.settings.setMainTab(i))
            }
        }
    )
}
