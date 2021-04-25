import React from 'react'

type RightPart2PropType = {
    display?: boolean
}

function RightPart2(props: RightPart2PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>RightPart2</p>
        </div>
    )
}

export default RightPart2