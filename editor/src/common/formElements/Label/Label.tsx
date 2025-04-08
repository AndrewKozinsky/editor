import React, {ReactElement} from 'react'
import { MiscTypes } from 'types/miscTypes'
import makeClasses from './Label-classes'


type LabelPropType = {
    label?: string | ReactElement // Подпись
    grayText?: string // Серый текст
    id?: string // id для связи подписи с другим элементом. id будет задаваться как атрибут for.
    bold?: boolean // Должен ли текст быть жирным
    disabled?: boolean // Заблокировано ли поле
}

/** Компонент подписи полей формы */
export default function Label(props: LabelPropType) {
    const {
        label, // Подпись поля ввода
        grayText,
        id, // id поля ввода
        bold = false, // Должен ли текст быть жирным
        disabled = false // Заблокировано ли поле
    } = props

    if (!label) return null

    const CN = makeClasses(disabled, bold)

    // Атрибуты label
    const labelAttrs: MiscTypes.ObjStringKey<string> = {}
    // Классы подписи
    labelAttrs.className = CN.root
    // Добавить атрибут for равный id поля к которому должна быть привязана подпись
    if (id) labelAttrs.htmlFor = id

    return (
        <label {...labelAttrs}>
            {label}
            <span className={CN.gray}>{grayText}</span>
        </label>
    )
}
