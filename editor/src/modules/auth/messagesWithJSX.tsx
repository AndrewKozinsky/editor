import React, { ReactElement } from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'

type messagesWithJSXType = {
    [key: string]: {
        [key: string]: {
            [key: string]: ReactElement
        }
    }
}

const messagesWithJSX: messagesWithJSXType = {

    // Форма EnterForm
    enterForm: {
        newUser: {
            eng: <>New User? <Link to='/reg'>Sign up</Link>.</>,
            rus: <>Новый пользователь? <Link to='/reg'>Зарегистрируйтесь</Link>.</>
        },
        forgotPassword: {
            eng: <>Can't remember your password? <Link to='/reset-password'>Reset it</Link>.</>,
            rus: <>Не помните пароль? <Link to='/reset-password'>Сбросьте</Link>.</>
        },
    }
}

export default messagesWithJSX