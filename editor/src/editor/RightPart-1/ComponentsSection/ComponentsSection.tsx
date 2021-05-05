import React from 'react'


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
            ComponentsSection
        </div>
    )
}