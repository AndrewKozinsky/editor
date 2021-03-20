import React from 'react'
import './Label.scss'


type LabelPropType = {
    label?: string // Подпись
    id?: string
}

/** Подпись выпадающего списка */
function Label(props: LabelPropType) {
    const {
        label, // Подпись поля ввода
        id // id поля ввода
    } = props

    const CN = 'label'

    if (!label || !id) return null
    return <label className={CN} htmlFor={id}>{label}</label>
}


export default Label