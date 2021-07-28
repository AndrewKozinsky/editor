import React from 'react'
import {getMessagesJSXObject, getMessagesObject} from 'messages/fn/getMessagesObject'
// @ts-ignore
import { Link } from 'react-router-dom'

// Форма ChangeResetPasswordFormBlock
const obj = {
    // Заголовок формы ввода нового пароля
    formHeader: {
        eng: 'Password change',
        rus: 'Смена пароля'
    },
    tokenField: {
        eng: 'Token *',
        rus: 'Токен *'
    },
    passwordField: {
        eng: 'Password *',
        rus: 'Пароль *'
    },
    passwordConfirmField: {
        eng: 'Repeat password *',
        rus: 'Повторите пароль *'
    },
    submitBtnText: {
        eng: 'Change password',
        rus: 'Изменить пароль'
    },
    passwordsMustMatch: {
        eng: 'Passwords must match',
        rus: 'Пароли должны совпадать'
    },
}

export const changeResetPasswordFormMessages = getMessagesObject(obj)


const JSXObj = {
    passwordChanged: {
        eng: <>Password has been changed. Log into <Link to='/'>the editor</Link>.</>,
        rus: <>Пароль изменён. Войти <Link to='/'>в редактор</Link>.</>
    },
}

export const changeResetPasswordFormJSXMessages = getMessagesJSXObject(JSXObj)
