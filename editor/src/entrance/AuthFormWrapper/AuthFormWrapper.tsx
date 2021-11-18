import React, { ReactNode } from 'react'
import SvgIcon from 'common/icons/SvgIcon'
import makeClasses from './AuthFormWrapper-classes'

type AuthFormWrapperPropType = {
    children: ReactNode
}

/** Обёртка форм регистрации, входа пользователя и сброса пароля */
export default function AuthFormWrapper(props: AuthFormWrapperPropType) {
    const CN = makeClasses()

    return (
        <section className={CN.root}>
            <div className={CN.logoWrapper}>
                <SvgIcon type='logo' baseClass='-black-fill' />
            </div>
            {props.children}
        </section>
    )
}
