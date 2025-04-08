import React, {ReactNode} from 'react'
import makeClasses from './Notice-classes'
import SvgIcon from 'common/icons/SvgIcon'


export type NoticePropType = {
    icon?: 'info' | 'error' | 'success' // Тип значка: info (информация), error (ошибка), success (успех)
    bg?: boolean // If there is a background
    children?: ReactNode
}

/** Компонент уведомления. */
export default function Notice(props: NoticePropType) {
    const { children, bg = false } = props

    const CN = makeClasses(bg)

    return (
        <div className={ CN.bg }>
            <Sign {...props} />
            <div className={ CN.content }>{children}</div>
        </div>
    )
}


/** Значок левее содержимого */
function Sign(props: NoticePropType) {
    const { icon } = props

    const CN = makeClasses()

    if (icon === 'info') {
        return <SvgIcon type='noticeInfo' baseClass='-icon-fill' extraClass={CN.icon} />
    }
    else if (icon === 'error') {
        return <SvgIcon type='noticeError' baseClass='-icon-fill' extraClass={CN.icon} />
    }
    else if (icon === 'success') {
        return <SvgIcon type='noticeSuccess' baseClass='-icon-fill' extraClass={CN.icon} />
    }

    return null
}
