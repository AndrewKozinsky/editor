import React from 'react'
import {
    getMessagesJSXFnObject,
    getMessagesObject
} from 'messages/fn/getMessagesObject'
import {getDomainFromEmail} from 'utils/StringUtils'


// Форма ResetFormBlock
const obj = {
    // Заголовок формы сброса пароля
    formHeader: {
        eng: 'Reset password',
        rus: 'Сброс пароля'
    },
    emailField: {
        eng: 'E-mail *',
        rus: 'Электронная почта *'
    },
    submitBtnText: {
        eng: 'Sign in',
        rus: 'Войти'
    },
    somethingWentWrong: {
        eng: 'Something went wrong',
        rus: 'Произошла непредвиденная ошибка. Форма не отправлена.'
    },
}

export const resetFormMessages = getMessagesObject(obj)



// Форма ResetFormBlock
const JSXFnObj = {
    retypePasswordLetter: (email: string) => {
        const domain = 'https://' + getDomainFromEmail(email)

        return {
            eng: <>An <a href={domain}>email</a> was sent to you with a link to reset your password.</>,
            rus: <>На <a href={domain}>почту</a> выслано письмо со ссылкой на страницу сброса пароля.</>
        }
    },
}

export const resetFormJSXFnMessages = getMessagesJSXFnObject(JSXFnObj)
