import React from 'react'
import ArticleFrame from '../ArticleFrame/ArticleFrame'
import './RightPart-2.scss'


type RightPart2PropType = {
    display?: boolean
}

/** Правая часть второй главной вкладки */
export default function RightPart2(props: RightPart2PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'right-part-2'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <ArticleFrame />
        </div>
    )
}
