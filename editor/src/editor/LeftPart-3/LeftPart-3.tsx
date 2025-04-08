import React from 'react'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import settingsPanelMsg from 'messages/settingsPanelMessages'
import ItemsList from 'common/ItemsList/ItemsList'
import { useGetSettingsItemsListProps } from './LeftPart-3-func'
import './LeftPart-3.scss'


type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть третьей главной вкладки */
export default function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Аргументы для компонента выводящий список пунктов настроек
    const itemsListProps = useGetSettingsItemsListProps()

    const CN = 'left-part-3'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <NameSection header={settingsPanelMsg.header}>
                <ItemsList {...itemsListProps}/>
            </NameSection>
        </div>
    )
}
