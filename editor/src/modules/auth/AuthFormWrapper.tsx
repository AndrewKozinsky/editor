import React, {ReactNode} from 'react'
import './css/AuthFormWrapper.scss'


type PropType = {
    children: ReactNode
}

/** Обёртка форм регистрации, входа пользователя и сброса пароля */
function AuthFormWrapper(props: PropType) {
    return (
        <section className='auth-form-wrapper'>
            {props.children}
        </section>
    )
}

export default AuthFormWrapper