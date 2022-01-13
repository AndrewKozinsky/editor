import React from 'react'
import SitePartTabs from '../SitePartTabs/SitePartTabs'
import SitePartProvider from '../SitePartProvider/SitePartProvider'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import './RightPart-1.scss'


type RightPart1PropType = {
    display?: boolean
}

/** Правая часть первой главной вкладки */
export default function RightPart1(props: RightPart1PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    // Выделенный сайт
    const { currentSiteId } = useGetSitesSelectors()

    const CN = 'right-part-1'
    const style = display ? {} : {display: 'none'}

    // Ничего не отрисовать если сайт не выделен
    if (currentSiteId === null) return null

    return (
        <div className={CN} style={style}>
            <SitePartTabs />
            <SitePartProvider />
        </div>
    )
}
