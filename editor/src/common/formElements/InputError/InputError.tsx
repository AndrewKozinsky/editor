import React, {ReactNode} from 'react'
import makeClasses from './InputError-classes'
import SvgIcon from 'common/icons/SvgIcon'


export type InputErrorPropType = {
    text?: ReactNode
}

/**
 * Компонент текстового уведомления.
 * Если передать тип, то это будет или сообщение об ошибке или об успехе.
 */
export default function InputError(props: InputErrorPropType) {
    const { text } = props

    const CN = makeClasses()

    if (!text) return null

    return (
        <div className={CN.root}>
            <SvgIcon type='errorTriangle' extraClass={CN.icon} />
            <p className={CN.paragraph}>{text}</p>
        </div>
    )
}
