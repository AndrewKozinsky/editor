import React, { useEffect, useState } from 'react'
import useGetSettingsSelectors from 'store/settings/settingsSelectors'
import HeaderPage from 'common/HeaderPage/HeaderPage'
import SettingsUserTabContent from '../SettingsUserTabContent/SettingsUserTabContent'
import SettingsEditorTabContent from '../SettingsEditorTabContent/SettingsEditorTabContent'
import userTabContentMsg from 'messages/userTabContentMessages'
import editorTabContentMsg from 'messages/editorTabContentMessages'
import './RightPart-3.scss'


type RightPart3PropType = {
    display?: boolean
}

/** Правая часть третьей главной вкладки */
export default function RightPart3(props: RightPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Активная вкладка панели настроек
    const { settingsPanelTab } = useGetSettingsSelectors()

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(<></>)

    useEffect(function () {
        // Составление массива из двух элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = ['user', 'editor'].map((tabName) => {
            if (tabName === 'user') {
                return (
                    <HeaderPage
                        headerText={userTabContentMsg.header}
                        display={tabName === settingsPanelTab}
                        key={tabName}
                    >
                        <SettingsUserTabContent />
                    </HeaderPage>
                )
            }
            else if (tabName === 'editor') {
                return (
                    <HeaderPage
                        headerText={editorTabContentMsg.header}
                        display={tabName === settingsPanelTab}
                        key={tabName}
                    >
                        <SettingsEditorTabContent />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [settingsPanelTab])

    const CN = 'right-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {partComponents}
        </div>
    )
}
