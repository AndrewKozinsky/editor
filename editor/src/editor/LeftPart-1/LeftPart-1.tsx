import React from 'react'
import NameSection from '../wrappers/NameSection/NameSection'
import './LeftPart-1.scss'


type LeftPart1PropType = {
    display?: boolean // Показывать ли компонент
}

function LeftPart1(props: LeftPart1PropType) {
    const {
        display // Показывать ли компонент
    } = props

    const CN = 'left-part-1'

    if (!display) return null

    return (
        <div className={CN}>
            <NameSection header='Сайты'>

            </NameSection>
        </div>
    )
}

export default LeftPart1;