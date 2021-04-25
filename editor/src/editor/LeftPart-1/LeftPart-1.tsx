import React from 'react'

type LeftPart1PropType = {
    display?: boolean
}

function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>LeftPart1</p>
        </div>
    )
}

export default LeftPart1;