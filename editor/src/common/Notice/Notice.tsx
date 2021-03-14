import React, {ReactElement, ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {makeCN} from 'utils/StringUtils'
import './css/Notice.scss'


const CN = 'notice'

type NoticePropType = {
    type?: 'standard' | 'error' | 'success'
    children?: ReactNode
}

/**
 * Компонент текстового уведомления.
 * Если передать тип, то это будет или сообщение об ошибке или об успехе.
 */
function Notice(props: NoticePropType) {
    const {
        type = 'standard', // Тип сообщения: standard (обычный текст), error (ошибка), success (успех)
        children
    } = props

    // Классы обёртки
    const wrapperCls = [CN]
    if (type === 'standard') wrapperCls.push(CN + '--standard')
    if (type === 'error') wrapperCls.push(CN + '--error')
    if (type === 'success') wrapperCls.push(CN + '--success')

    // Классы абзаца с текстом
    const paragraphCls = [CN + '__paragraph']

    return (
        <div className={makeCN(wrapperCls)}>
            <Sign {...props} />
            <p className={makeCN(paragraphCls)}>{children}</p>
        </div>
    )
}

export default Notice


/** Значёк левее содержимого */
function Sign(props: NoticePropType) {
    const {
        type
    } = props

    if (type === 'error') {
        return <SvgIcon type='errorTriangle' className={CN + '__icon'} />
    }
    if (type === 'success') {
        return <SvgIcon type='successCircle' className={CN + '__icon'} />
    }

    return null
}