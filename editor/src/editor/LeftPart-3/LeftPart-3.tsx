import React from 'react'
import messages from '../messages'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import NameSection from '../wrappers/NameSection/NameSection'
import ItemsList from 'common/ItemsList/ItemsList'
import './LeftPart-3.scss'
import { useGetSettingsItemsListProps } from './LeftPart-3-func'


type LeftPart3PropType = {
    display?: boolean
}

function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Аргументы для компонента выводящий список пунктов настроек
    const itemsListProps = useGetSettingsItemsListProps()

    const CN = 'left-part-3'

    if (!display) return null


    return (
        <div className={CN}>
            <NameSection header={messages.SettingsPanel.header[lang]}>
                <ItemsList {...itemsListProps}/>
            </NameSection>
        </div>
    )
}

export default LeftPart3