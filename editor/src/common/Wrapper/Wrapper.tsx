import React, {ReactNode} from 'react'
import './Wrapper.scss'
import {EditorSizeMultiplyType, EditorSizeType} from 'store/settings/settingsTypes'
import {useGetComponentSize} from '../../utils/MiscUtils';
import {getWrapperClasses} from './Wrapper-func';


export type WrapperPropType = {
    children: ReactNode, // Дети компонента
    align?: 'right' | 'center' // Выравнивание
    t?: 5 | 10 | 15 | 20 | 30, // Отступ сверху
    b?: 10 | 25 // Отступ снизу
    relativeSize?: EditorSizeMultiplyType // Размер элемента
}



/** Компонент дающий отступ оборачиваемому элементу */
const Wrapper = (props: WrapperPropType) => {
    const {
        children, // Дети компонента
    } = props

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    return (
        <div className={getWrapperClasses(props, relativeSize)}>
            {children}
        </div>
    )
}

export default Wrapper