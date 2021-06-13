// import React, {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import {AppState} from 'src/store/rootReducer'
// import HeaderPage from 'common/HeaderPage/HeaderPage'
// import SettingsUserTabContent from '../SettingsUserTabContent/SettingsUserTabContent'
// import SettingsEditorTabContent from '../SettingsEditorTabContent/SettingsEditorTabContent'
// import messages from '../messages'
// import './RightPart-3.scss'


/*type RightPart3PropType = {
    display?: boolean
}*/

/** Правая часть третьей главной вкладки */
/*
export default function RightPart3(props: RightPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppState) => store.settings.settingsPanelTab)

    // Возвращаемые компоненты
    const [partComponents, setPartComponents] = useState(<></>)

    useEffect(function () {
        // Составление массива из двух элементов. Элементу, который соответствует вкладке, задаётся видимость.
        const parts = ['user', 'editor'].map((tabName) => {
            if (tabName === 'user') {
                return (
                    <HeaderPage
                        headerText={messages.UserTabContent.header[lang]}
                        display={tabName === activeTab}
                        key={tabName}
                    >
                        <SettingsUserTabContent />
                    </HeaderPage>
                )
            }
            else if (tabName === 'editor') {
                return (
                    <HeaderPage
                        headerText={messages.EditorTabContent.header[lang]}
                        display={tabName === activeTab}
                        key={tabName}
                    >
                        <SettingsEditorTabContent />
                    </HeaderPage>
                )
            }
        })

        // Поставить элементы в Местное состояние чтобы компонент их вернул
        setPartComponents( <>{parts}</> )
    }, [activeTab, lang])

    const CN = 'right-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {partComponents}
        </div>
    )
}*/
