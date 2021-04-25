import React from 'react';

type LeftPart3PropType = {
    display?: boolean
}

function LeftPart3(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    if (!display) return null

    return (
        <div>
            <p>LeftPart3</p>
        </div>
    )
}

export default LeftPart3