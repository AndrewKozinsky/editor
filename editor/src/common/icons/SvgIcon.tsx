import React from 'react'
import {getIcon} from './js/getIcon'
import { getIconClass } from './js/getIconClass'
import { getIconSizes } from './js/getIconSizes'
import './css/SvgIcon.scss'
import {makeCN} from 'utils/StringUtils';


export type SvgIconPropType = {
    type: string
    className?: string
}

/** Значёк */
function SvgIcon(props: SvgIconPropType) {

    const {
        type, // Тип значка
        className = '', // Дополнительный класс для значка
        ...anotherProps // Остальные переданные свойства
    } = props


    // Значёк
    const Icon = getIcon(type)
    // Основной класс SVG
    const iconClass = getIconClass(type)
    // Добавление дополнительного класса SVG
    const iconClasses = [iconClass, className]
    // Размеры
    const iconSizes = getIconSizes(type)


    return (
        <svg {...iconSizes} className={makeCN(iconClasses)} {...anotherProps}>
            <Icon />
        </svg>
    );
}

export default SvgIcon