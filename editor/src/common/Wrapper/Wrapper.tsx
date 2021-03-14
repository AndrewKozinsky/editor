import React, {ReactNode} from 'react'
import {makeCN} from 'utils/StringUtils'
import './css/Wrapper.scss'


type WrapperPropType = {
    children: ReactNode,
    align?: 'right' | 'center'
    t?: number,
    b?: number
}

/** Компонент дающий отступ оборачиваемому элементу */
const Wrapper = (props: WrapperPropType) => {
    const {
        children, // Дети компонента
        align,
        t,        // Отступ сверху
        b         // Отступ снизу
    } = props

    const CN = 'margin'
    let cls = [CN]

    // Добавление класса дающую выравнивание
    if (align === 'center') cls.push(CN + '__align-center')
    if (align === 'right')  cls.push(CN + '__align-right')

    // Добавление класса дающего верхний оступ
    if (t === 15) cls.push(CN + '__t15')
    if (t === 20) cls.push(CN + '__t20')

    // Добавление класса дающего нижний оступ
    if (b === 10) cls.push(CN + '__b10')
    if (b === 25) cls.push(CN + '__b25')

    return (
        <div className={makeCN(cls)}>
            {children}
        </div>
    )
}

export default Wrapper