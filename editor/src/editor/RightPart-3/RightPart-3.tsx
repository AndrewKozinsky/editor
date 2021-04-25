import React from 'react'

type RightPart3PropType = {
    display?: boolean
}

function RightPart3(props: RightPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>RightPart3</p>
        </div>
    )
}

export default RightPart3