import React from 'react'

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
            <p>RightPart2</p>
        </div>
    )
}