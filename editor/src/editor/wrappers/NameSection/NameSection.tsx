import React, { ReactElement, ReactNode, RefObject } from 'react'
import makeClasses from './NameSection-classes'


type NameSectionPropType = {
    type?: 1 | 2 // Размер компонента: 1 (больше) или 2 (меньше)
    header: string | ReactElement // Текст заголовка
    children?: ReactNode // Дети компонента
    contentId?: string
}

/* Компонент блока с заголовком */
export default function NameSection(props: NameSectionPropType) {
    const {
        type = 1,
        header,
        children,
        contentId
    } = props

    // Классы
    const CN = makeClasses(type)

    return (
        <div className={CN.root}>
            <h3 className={CN.header}>
                <span className={CN.bg}>{header}</span>
            </h3>
            <div className={CN.content} id={contentId}>
                {children}
            </div>
        </div>
    )
}
