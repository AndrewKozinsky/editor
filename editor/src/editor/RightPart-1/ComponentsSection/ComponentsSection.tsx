import React from 'react'
import DividedArea from '../DevidedArea/DividedArea'
import './ComponentsSection.scss'


type ComponentsSectionPropType = {
    display?: boolean
}

export default function ComponentsSection(props: ComponentsSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    const CN = 'components-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            <DividedArea>
                <p>ComponentsSection</p>
                <p>2</p>
            </DividedArea>
        </div>
    )
}