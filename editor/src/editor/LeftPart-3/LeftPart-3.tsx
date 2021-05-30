import React from 'react'
import messages from '../messages'
import {useSelector} from 'react-redux'
import {AppState} from 'src/store/rootReducer'
import NameSection from '../wrappers/NameSection/NameSection'
import ItemsList from 'src/common/ItemsList/ItemsList'
import { useGetSettingsItemsListProps } from './LeftPart-3-func'
import './LeftPart-3.scss'


type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть третьей главной вкладки */
function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Язык интерфейса
    const lang = useSelector((store: AppState) => store.settings.editorLanguage)

    // Аргументы для компонента выводящий список пунктов настроек
    const itemsListProps = useGetSettingsItemsListProps()

    const CN = 'left-part-3'
    const style = display ? {} : {display: 'none'}


    return (
        <div className={CN} style={style}>
            <NameSection header={messages.SettingsPanel.header[lang]}>
                <ItemsList {...itemsListProps}/>
            </NameSection>
        </div>
    )
}

export default LeftPart3