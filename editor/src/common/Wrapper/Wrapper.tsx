import React, {ReactNode} from 'react'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {useGetComponentSize} from 'utils/MiscUtils'
import {getWrapperClasses} from './Wrapper-func'
import './Wrapper.scss'


export type WrapperPropType = {
    children: ReactNode, // Дети компонента
    align?: 'right' | 'center' // Выравнивание
    t?: TType // Отступ сверху
    b?: BType // Отступ снизу
    gap?: GapType // Отступы между элементами внутри обёртки
    relativeSize?: StoreSettingsTypes.EditorSizeMultiply // Размер элемента
}

export type TType = 5 | 10 | 15 | 20 | 25 | 30
export type BType = 10 | 15 | 25
export type GapType = 10

/** Компонент дающий отступ оборачиваемому элементу */
const Wrapper = (props: WrapperPropType) => {
    const {
        children, // Дети компонента
        gap
    } = props

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    return (
        <div className={getWrapperClasses(props, relativeSize, gap)}>
            {children}
        </div>
    )
}

export default Wrapper