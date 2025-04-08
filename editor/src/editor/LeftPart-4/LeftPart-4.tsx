import React from 'react'
import ItemsList from 'common/ItemsList/ItemsList'
import settingsPanelMsg from '../../messages/settingsPanelMessages'
import NameSection from '../wrappers/NameSection/NameSection'
import { useGetHelpItemsListProps } from './LeftPart-4-func'
import './LeftPart-4.scss'


type LeftPart4PropType = {
    display?: boolean // Показывать ли компонент
}

/** Левая часть первой главной вкладки */
export default function LeftPart4(props: LeftPart4PropType) {
    const {
        display // Показывать ли компонент
    } = props

    // Аргументы для компонента выводящий список пунктов помощи
    const itemsListProps = useGetHelpItemsListProps()

    // Атрибуты обёртки панели
    const CN = 'left-part-4'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <NameSection header={settingsPanelMsg.header}>
                <ItemsList {...itemsListProps}/>
            </NameSection>
        </div>
    )
}
