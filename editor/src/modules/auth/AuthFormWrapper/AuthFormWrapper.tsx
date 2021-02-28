import React, {ReactNode} from 'react'
import SvgIcon from '../../../common/icons/SvgIcon'
import './css/AuthFormWrapper.scss'


type PropType = {
    children: ReactNode
}

/** Обёртка форм регистрации, входа пользователя и сброса пароля */
function AuthFormWrapper(props: PropType) {
    const CN = 'auth-form-wrapper'

    return (
        <section className={CN}>
            <div className={`${CN}__logo-wrapper`}>
                <SvgIcon type='logo' />
            </div>
            {props.children}
        </section>
    )
}

export default AuthFormWrapper