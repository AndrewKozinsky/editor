import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store/rootReducer'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import SitePartTabs from '../SitePartTabs/SitePartTabs'
import './RightPart-1.scss'


type RightPart1PropType = {
    display?: boolean
}

export default function RightPart1(props: RightPart1PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Выделенный сайт
    const {currentSiteId} = useSelector((store: AppState) => store.sites)

    const CN = 'right-part-1'
    const style = display ? {} : {display: 'none'}

    // Ничего не отрисовывать если сайт не выделен
    if (currentSiteId === null) return null

    return (
        <div className={CN} style={style}>
            <SitePartTabs />
            <SectionWrapper />
        </div>
    )
}