import React from 'react'
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

    const CN = 'right-part-1'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <SitePartTabs />
            <SectionWrapper />
        </div>
    )
}