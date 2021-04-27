import React from 'react'
import {getIcon} from './js/getIcon'
import { getIconClass } from './js/getIconClass'
import { getIconSizes } from './js/getIconSizes'
import {makeCN} from 'utils/StringUtils'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import './css/SvgIcon.scss'


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

    // Размер интерфейса
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    // Значёк
    const Icon = getIcon(type, editorSize)
    // Основной класс SVG
    const iconClass = getIconClass(type)
    // Добавление дополнительного класса SVG
    const iconClasses = [iconClass, className]
    // Размеры
    const iconSizes = getIconSizes(type, editorSize)


    return (
        <svg {...iconSizes} className={makeCN(iconClasses)} {...anotherProps}>
            <Icon />
        </svg>
    );
}

export default SvgIcon