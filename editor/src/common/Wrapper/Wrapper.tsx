import React, {ReactNode} from 'react'
import makeClasses from './Wrapper-classes'


export type WrapperPropType = {
    children?: ReactNode, // Дети компонента
    align?: 'right' | 'center' | 'justify' // Выравнивание
    verticalAlign?: 'center' // Выравнивание по вертикали
    t?: TType // Отступ сверху
    b?: BType // Отступ снизу
    gap?: GapType // Отступы между элементами внутри обёртки
    extraClass?: string // Дополнительный класс обёртке
    style?: object // Дополнительный стиль обёртке
}

export type TType = 5 | 10 | 15 | 20 | 25 | 30
export type BType = 5 | 10 | 15 | 20 | 25
export type GapType = 10 | 20

/** Компонент-обёртка. Можно указать отступ и выключку */
export default function Wrapper(props: WrapperPropType) {
    const {
        children, // Дети компонента
        extraClass,
        style = {}
    } = props

    const CN = makeClasses(props, extraClass)

    return (
        <div className={CN.root} style={style}>
            {children}
        </div>
    )
}
