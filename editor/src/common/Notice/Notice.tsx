import React, {ReactNode} from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import {EditorSizeMultiplyType, EditorSizeType} from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'
import {useGetComponentSize} from 'utils/MiscUtils'
import {getNoticeWrapperClasses} from './Notice-func'
import './Notice.scss'


const CN = 'notice'

export type NoticePropType = {
    type?: 'standard' | 'error' | 'success' // Тип сообщения: standard (обычный текст), error (ошибка), success (успех)
    relativeSize?: EditorSizeMultiplyType
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

    // Размер компонента относительно размера всего интерфейса
    const relativeSize = useGetComponentSize(props.relativeSize)

    // Классы абзаца с текстом
    const paragraphCls = [CN + '__paragraph']

    return (
        <div className={getNoticeWrapperClasses(props, relativeSize)}>
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