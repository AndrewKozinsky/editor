import React, {ReactElement} from 'react'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import { useGetComponentSize } from 'utils/MiscUtils'
import { MiscTypes } from '../../../types/miscTypes'
import { getLabelClasses } from './Label-func'
import './Label.scss'


type LabelPropType = {
    label?: string | ReactElement // Подпись
    id?: string // id для связи подписи с другим элементом. id будет задаваться как атрибут for.
    size?: StoreSettingsTypes.EditorSizeMultiply
    bold?: boolean // Должен ли текст быть жирным
    disabled?: boolean // Заблокировано ли поле
}

/** Подпись выпадающего списка */
function Label(props: LabelPropType) {
    const {
        label, // Подпись поля ввода
        id, // id поля ввода
        bold = false, // Должен ли текст быть жирным
        disabled = false // Заблокировано ли поле
    } = props

    // Размер компонента относительно размера всего интерфейса
    const size = useGetComponentSize(props.size)

    if (!label) return null

    // Атрибуты label
    const labelAttrs: MiscTypes.ObjStringKeyStringVal = {}
    // Классы подписи
    labelAttrs.className = getLabelClasses(size, disabled, bold)
    // Добавить атрибут for равный id поля к которому должна быть привязана подпись
    if (id) labelAttrs.htmlFor = id

    return <label {...labelAttrs}>{label}</label>
}


export default Label