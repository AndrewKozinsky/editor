import React from 'react'

type RightPart1PropType = {
    display?: boolean
}

function RightPart1(props: RightPart1PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>RightPart1</p>
        </div>
    )
}

export default RightPart1