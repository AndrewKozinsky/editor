import React from 'react'
import {
    getMessagesJSXFnObject,
    getMessagesObject
} from 'messages/fn/getMessagesObject'
import { getDomainFromEmail } from 'utils/StringUtils'


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
        eng: 'Reset',
        rus: 'Сбросить'
    },
    retypePasswordLetter: {
        eng: 'An email was sent to you with a link to reset your password.',
        rus: 'На почту выслано письмо со ссылкой на страницу сброса пароля.'
    }
}

export const resetFormMessages = getMessagesObject(obj)

