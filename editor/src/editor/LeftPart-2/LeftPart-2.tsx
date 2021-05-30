import React from 'react'

type LeftPart3PropType = {
    display?: boolean
}

/** Левая часть второй главной вкладки */
function LeftPart2(props: LeftPart3PropType) {
    const {
        display // Показывать ли обёртку
    } = props

    const CN = 'left-part-2'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <p>LeftPart2</p>
        </div>
    )
}

export default LeftPart2