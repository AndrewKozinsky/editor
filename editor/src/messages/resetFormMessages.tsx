import React from 'react'
import getMsgProxy from './fn/msgProxy'

// Тексты формы ResetFormBlock
const resetFormMessages = {
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

const resetFormMsg = getMsgProxy<typeof resetFormMessages>(resetFormMessages)
export default resetFormMsg