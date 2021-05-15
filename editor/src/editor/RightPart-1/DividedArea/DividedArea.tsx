import React, {ReactChild} from 'react'
import './DividedArea.scss'


type DividedAreaPropType = {
    children: ReactChild[]
}

/** Компонент отрисовывающий двух переданных детей в области разделённой вертикальной чертой */
export default function DividedArea(props: DividedAreaPropType) {

    const {
        children
    } = props

    const CN = 'site-divided-area'

    return (
        <div className={CN}>
            <div className={`${CN}__left-part`}>
                {children[0]}
            </div>
            <div className={`${CN}__divider`} />
            <div className={`${CN}__right-part`}>
                {children[1]}
            </div>
        </div>
    )
}