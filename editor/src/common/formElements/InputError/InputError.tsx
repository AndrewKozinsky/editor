import React, {ReactNode} from 'react'
import makeClasses from './InputError-classes'
import SvgIcon from 'common/icons/SvgIcon'


export type InputErrorPropType = {
    text?: ReactNode
}

/** Сообщение об ошибке в поле ввода */
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
