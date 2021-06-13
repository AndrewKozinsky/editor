import React from 'react'
import {getIcon} from './js/getIcon'
import { getIconSize } from './js/getIconSize'
import './css/SvgIcon.scss'

type BaseClasses = '-color-fill'

export type SvgIconPropType = {
    type: string // Тип значка
    baseClass?: BaseClasses // Класс значка из готового набора классов
    extraClass?: string // Класс значка если нужного нет в готовом наборе
}

/** Значёк */
export default function SvgIcon(props: SvgIconPropType) {

    let {
        type, // Тип значка
        baseClass, // Класс значка
        extraClass, // Класс значка
    } = props

    // Значёк
    const Icon = getIcon(type)
    // Размеры
    const iconSizes = getIconSize(type)

    // Класс
    let className = ''
    if (baseClass) className = baseClass
    else if (extraClass) className = extraClass
    if (!baseClass && !extraClass) className = '-color-fill'


    return (
        <svg {...iconSizes} className={className}>
            {/*@ts-ignore*/}
            <Icon />
        </svg>
    )
}