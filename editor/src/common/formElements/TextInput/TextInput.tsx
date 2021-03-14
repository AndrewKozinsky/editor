import React from 'react'
import './css/TextInput.scss'
import {makeCN} from '../../../utils/StringUtils';


type TextInputPropType = {
    label?: string // Подпись текстового поля
    size?: 'small' | 'middle' // Размер поля
    placeholder?: string, // Заполнитель
    autoFocus?: boolean, // Нужно ли ставить фокус при загрузке
}


/** Текстовый компонент */
function TextInput(props: TextInputPropType) {

    const {
        size = 'small', // Размер поля. Варианты: small (маленькое), middle (среднего размера)
        placeholder, // Заполнитель
        autoFocus = false, // Нужно ли ставить фокус при загрузке
    } = props

    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    if (size === 'small') classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)


    return (
        <div>
            <Label {...props} />
            <input type='text' className={makeCN(classes)} placeholder={placeholder} autoFocus={autoFocus} />
        </div>
    )
}


/** Подпись текстового компонента */
function Label(props: TextInputPropType) {
    const {
        label // Подпись текстового поля
    } = props

    const CN = 'text-input-label'

    if (!label) return null
    return <label className={CN}>{label}</label>
}


export default TextInput