import React from 'react'
import './LeftPart-3.scss'

type LeftPart3PropType = {
    display?: boolean
}

function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'left-part-3'

    if (!display) return null

    return (
        <div className={CN}>
            <p>LeftPart3</p>
        </div>
    )
}

export default LeftPart3