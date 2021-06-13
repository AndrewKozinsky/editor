import React, {ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {getNoticeWrapperClasses} from './Notice-func'
import './Notice.scss'


const CN = 'notice'

export type NoticePropType = {
    type?: 'standard' | 'error' | 'success' // Тип сообщения: standard (обычный текст), error (ошибка), success (успех)
    children?: ReactNode
}

/**
 * Компонент текстового уведомления.
 * Если передать тип, то это будет или сообщение об ошибке или об успехе.
 */
export default function Notice(props: NoticePropType) {
    const {
        type = 'standard', // Тип сообщения: standard (обычный текст), error (ошибка), success (успех)
        children
    } = props

    return (
        <div className={getNoticeWrapperClasses(props)}>
            <Sign {...props} />
            <p className={CN + '__paragraph'}>{children}</p>
        </div>
    )
}


/** Значёк левее содержимого */
function Sign(props: NoticePropType) {
    const {
        type
    } = props

    if (type === 'error') {
        return <SvgIcon type='errorTriangle' extraClass={CN + '__icon'} />
    }
    else if (type === 'success') {
        return <SvgIcon type='successCircle' extraClass={CN + '__icon'} />
    }

    return null
}
