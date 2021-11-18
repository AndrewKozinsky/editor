import React, { ReactElement, ReactNode } from 'react'
import makeClasses from './NameSection-classes'


type NameSectionPropType = {
    type?: 1 | 2 // Размер компонента: 1 (больше) или 2 (меньше)
    header: string | ReactElement // Текст заголовка
    children?: ReactNode // Дети компонента
}

/* Компонент блока с заголовком */
function NameSection(props: NameSectionPropType) {
    const {
        type = 1,
        header,
        children,
    } = props

    // Классы
    const CN = makeClasses(type)

    return (
        <div>
            <h3 className={CN.header}>
                <span className={CN.bg}>{header}</span>
            </h3>
            {children}
        </div>
    )
}

export default NameSection