import React, {ReactNode} from 'react'
import { getHeaderClasses } from './NameSection-func'
import {useSelector} from 'react-redux'
import {AppState} from 'store/rootReducer'
import './NameSection.scss'


type NameSectionPropType = {
    type?: number // Размер компонента: 1 (больше) или 2 (меньше)
    header: string // Текст заголовка
    children?: ReactNode // Дети компонента
}

/* Компонент блока с заголовком */
function NameSection(props: NameSectionPropType) {

    const {
        type = 1,
        header,
        children,
    } = props

    // Размер интерфейса
    const editorSize = useSelector((store: AppState) => store.settings.editorSize)

    const CN = 'name-section'

    // Классы обёртки
    const headerClasses = getHeaderClasses(editorSize, type)

    return (
        <div>
            <h3 className={headerClasses}>
                <span className={`${CN}__header-bg`}>{header}</span>
            </h3>
            {children}
        </div>
    )
}

export default NameSection