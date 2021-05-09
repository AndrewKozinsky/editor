import React from 'react'
import DividedArea from '../DevidedArea/DividedArea'
import './PluginSection.scss'


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
            <DividedArea>
                <p>PluginSection</p>
                <p>2</p>
            </DividedArea>
        </div>
    )
}