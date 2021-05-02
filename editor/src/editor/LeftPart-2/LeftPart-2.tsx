import React from 'react'

type LeftPart3PropType = {
    display?: boolean
}

function LeftPart2(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>LeftPart2</p>
        </div>
    )
}

export default LeftPart2