import React from 'react'
import {useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import SettingsUserTabContent from '../SettingsUserTabContent/SettingsUserTabContent';
import SettingsEditorTabContent from '../SettingsEditorTabContent/SettingsEditorTabContent';
import './RightPart-3.scss'


type RightPart3PropType = {
    display?: boolean
}

function RightPart3(props: RightPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Активная вкладка панели настроек
    const activeTab = useSelector((store: AppState) => store.settings.settingsPanelTab)

    const CN = 'right-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            {activeTab === 'user' && <SettingsUserTabContent />}
            {activeTab === 'editor' && <SettingsEditorTabContent />}
        </div>
    )
}

export default RightPart3