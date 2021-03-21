import React, {ReactNode} from 'react'
import {makeCN} from 'utils/StringUtils'
import './Wrapper.scss'
import {EditorSizeType} from 'store/settings/settingsTypes'
import {useGetComponentSize} from '../../utils/MiscUtils';
import {getWrapperClasses} from './Wrapper-func';


export type WrapperPropType = {
    children: ReactNode, // Дети компонента
    align?: 'right' | 'center' // Выравнивание
    t?: 5 | 10 | 15 | 20 | 30, // Отступ сверху
    b?: 10 | 25 // Отступ снизу
    size?: EditorSizeType // Размер элемента
}



/** Компонент дающий отступ оборачиваемому элементу */
const Wrapper = (props: WrapperPropType) => {
    const {
        children, // Дети компонента
    } = props

    // Размер элемента': tiny (крошечный), small (маленький), middle (средний), big (большой)
    const size = useGetComponentSize(props.size)

    return (
        <div className={getWrapperClasses(props, size)}>
            {children}
        </div>
    )
}

export default Wrapper