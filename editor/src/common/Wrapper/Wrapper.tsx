import React, {ReactNode} from 'react'
import makeClasses from './Wrapper-classes'


export type WrapperPropType = {
    children?: ReactNode, // Дети компонента
    align?: 'right' | 'center' | 'justify' // Выравнивание
    t?: TType // Отступ сверху
    b?: BType // Отступ снизу
    gap?: GapType // Отступы между элементами внутри обёртки
    style?: object // Дополнительный стиль обёртке
}

export type TType = 5 | 10 | 15 | 20 | 25 | 30
export type BType = 5 | 10 | 15 | 25
export type GapType = 10

/** Компонент-обёртка. Можно указать отступ и выключку */
export default function Wrapper(props: WrapperPropType) {
    const {
        children, // Дети компонента
        style = {}
    } = props

    const CN = makeClasses(props)

    return (
        <div className={CN.root} style={style}>
            {children}
        </div>
    )
}
