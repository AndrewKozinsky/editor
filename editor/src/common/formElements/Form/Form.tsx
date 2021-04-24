import React, { ReactNode } from 'react'
import FHTypes from 'libs/formHandler/types'
import './Form.scss'
import {makeCN} from 'utils/StringUtils'


type FormPropType = {
    name: string
    formHandlers: FHTypes.FormHandlers
    children: ReactNode
}

/** Компонент формы оборачивающий поля */
export default function Form(props: FormPropType) {

    const {
        name,
        formHandlers,
        children
    } = props

    // Классы формы
    const CN = 'form'
    const classes = [CN]

    return (
        <form name={name} {...formHandlers} className={makeCN(classes)}>
            {children}
        </form>
    );
}