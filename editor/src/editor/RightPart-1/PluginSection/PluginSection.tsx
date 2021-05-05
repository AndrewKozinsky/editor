import React from 'react'


type PluginSectionPropType = {
    display?: boolean
}

export default function PluginSection(props: PluginSectionPropType) {

    const {
        display // Показывать ли компонент
    } = props

    const CN = 'plugin-section'
    const style = display ? {} : {display: 'none'}

    return (
        <div className={CN} style={style}>
            PluginSection
        </div>
    )
}