import React from 'react'

// Стрелочки выпадающего списка
export default function SelectInputArrows() {
    return (
        <g strokeWidth="1.4" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" fill='none'>
            <polyline points="1 4 4 1 7 4" />
            <polyline transform="translate(4, 11.5) scale(1, -1) translate(-4, -11.5) " points="1 13 4 10 7 13" />
        </g>
    )
}
