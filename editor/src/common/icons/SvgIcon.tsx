import React from 'react'
import {getIcon} from './js/getIcon'
import { getIconClass } from './js/getIconClass'
import { getIconSizes } from './js/getIconSizes'
import './css/SvgIcon.scss'


export type SvgIconPropType = {
    type: string
}

/** Значёк */
function SvgIcon(props: SvgIconPropType) {

    const {
        type, // Тип значка
        ...anotherProps // Остальные переданные свойства
    } = props


    // Значёк
    let Icon = getIcon(type)
    // Класс SVG
    let iconClass = getIconClass(type)
    // Размеры
    let iconSizes = getIconSizes(type)


    return (
        <svg {...iconSizes} className={iconClass} {...anotherProps}>
            <Icon />
        </svg>
    );
}

export default SvgIcon