import React from 'react'
import NameSection from 'editor/wrappers/NameSection/NameSection'
import { componentsPanelMessages } from 'messages/componentsPanelMessages'
import useGetMessages from 'messages/fn/useGetMessages'
import TempCompList from '../TempCompList/TempCompList'
import './LeftPart-2.scss'
import BottomButtons from '../BottomButtons/BottomButtons'
import Adjust from '../AdjustPanel/AdjustPanel'

type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть второй главной вкладки */
export default function LeftPart2(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const componentsPanelMsg = useGetMessages(componentsPanelMessages)

    const CN = 'left-part-2'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <div className={`${CN}__top`} >
                <NameSection header={componentsPanelMsg.header}>
                    <TempCompList />
                </NameSection>
                <Adjust />
            </div>
            <div className={`${CN}__bottom`} >
                <BottomButtons />
            </div>
        </div>
    )
}
