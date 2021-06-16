import React from 'react'
//@ts-ignore
import { getDomainFromEmail } from 'utils/StringUtils'
//@ts-ignore
import { Link } from 'react-router-dom'
import {
    getMessagesJSXFnObject,
    getMessagesJSXObject,
    getMessagesObject
} from 'messages/fn/getMessagesObject'


// Форма RegFormBlock
const obj = {
    // Заголовок формы регистрации
    formHeader: {
        eng: 'Sign in',
        rus: 'Регистрация'
    },
    emailField: {
        eng: 'E-mail *',
        rus: 'Электронная почта *'
    },
    emailErrInvalid: {
        eng: 'Invalid email address',
        rus: 'Почта написана неправильно'
    },
    passwordField: {
        eng: 'Password *',
        rus: 'Пароль *'
    },
    passwordConfirmField: {
        eng: 'Repeat password *',
        rus: 'Повторите пароль *'
    },
    passwordsMustMatch: {
        eng: 'Passwords must match',
        rus: 'Пароли должны совпадать'
    },
    submitBtnText: {
        eng: 'Sign in',
        rus: 'Зарегистрироваться'
    },
    somethingWentWrong: {
        eng: 'Something went wrong',
        rus: 'Произошла непредвиденная ошибка. Регистрация не выполнена.'
    },
}

export const regFormMessages = getMessagesObject(obj)


// Форма RegFormBlock
const JSXObj = {
    doYouHaveAccount: {
        eng: <>Already have an account? <Link to='/enter'>Sign in</Link>.</>,
        rus: <>Уже есть учётная запись? <Link to='/enter'>Войдите</Link>.</>
    },
    legal: {
        eng: <>By registering on this site I accept <a href='https://google.com' target='_blank'>the terms of use</a> and consent to the newsletter, the <a href='https://google.com' target='_blank'>processing of personal data</a> and agree to <a href='https://google.com' target='_blank'>the privacy policy</a>.</>,
        rus: <>Регистрируясь на этом сайте я принимаю <a href='https://google.com' target='_blank'>условия использования</a> и даю согласие на рассылку, <a href='https://google.com' target='_blank'>обработку персональных данных</a> и соглашаюсь c <a href='https://google.com' target='_blank'>политикой конфиденциальности</a>.</>
    },
}

export const regFormJSXMessages = getMessagesJSXObject(JSXObj)


// Форма RegFormBlock
const JSXFnObj = {
    confirmRegistrationLetter: (email: string) => {
        const domain = 'https://' + getDomainFromEmail(email)

        return {
            eng: <>An email with a link to confirm your mailing address was sent to the specified <a href={domain}>email address</a>. Click on it to activate your account.</>,
            rus: <>На указанную <a href={domain}>почту</a> выслано письмо со ссылкой для подтверждения почтового адреса. Перейдите по ней чтобы активировать учётную запись.</>
        }
    },
}

export const regFormJSXFnMessages = getMessagesJSXFnObject(JSXFnObj)