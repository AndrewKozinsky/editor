import React from 'react'
import {getIcon} from './js/getIcon'
import { getIconClass } from './js/getIconClass'
import { getIconSizes } from './js/getIconSizes'
import {makeCN} from 'utils/StringUtils'
import { useSelector } from 'react-redux'
import { AppState } from 'store/rootReducer'
import './css/SvgIcon.scss'
import StoreSettingsTypes from '../../store/settings/settingsTypes';


export type SvgIconPropType = {
    type: string // Тип значка
    size?: StoreSettingsTypes.EditorSize // Размер значка
    className?: string // Дополнительный класс для значка
}

/** Значёк */
function SvgIcon(props: SvgIconPropType) {

    let {
        type, // Тип значка
        size, // Размер значка
        className = '', // Дополнительный класс для значка
        ...anotherProps // Остальные переданные свойства
    } = props

    // Размер интерфейса
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)
    // Если размер не передали, то взять размер интерфейса
    if (!size) size = editorSize

    // Значёк
    const Icon = getIcon(type, size)
    // Основной класс SVG
    const iconClass = getIconClass(type)
    // Добавление дополнительного класса SVG
    const iconClasses = [iconClass, className]
    // Размеры
    const iconSizes = getIconSizes(type, size)


    return (
        <svg {...iconSizes} className={makeCN(iconClasses)} {...anotherProps}>
            <Icon />
        </svg>
    );
}

export default SvgIcon