import React from 'react'
import { EditorSizeType } from 'store/settings/settingsTypes'
import { useGetComponentSize } from 'utils/MiscUtils'
import { getLabelClasses } from './Label-func'
import './Label.scss'


type LabelPropType = {
    label?: string // Подпись
    id?: string // id для связи подписи с другим элементом. id будет задаваться как атрибут for.
    size?: EditorSizeType
}

/** Подпись выпадающего списка */
function Label(props: LabelPropType) {
    const {
        label, // Подпись поля ввода
        id // id поля ввода
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    if (!label || !id) return null
    return (
        <label
            className={getLabelClasses(size)}
            htmlFor={id}
        >
            {label}
        </label>
    )
}


export default Label