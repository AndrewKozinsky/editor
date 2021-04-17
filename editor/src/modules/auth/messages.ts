
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Меню форм
    Menu: {
        // Пункт «Регистрация»
        reg: {
            eng: 'Sign in',
            rus: 'Регистрация'
        },
        // Пункт «Вход»
        enter: {
            eng: 'Log in',
            rus: 'Вход'
        },
        // Пункт «Сброс пароля»
        reset: {
            eng: 'Reset password',
            rus: 'Сброс пароля'
        },
    },
    // Форма EnterFormBlock
    EnterForm: {
        // Заголовок формы входа
        formHeader: {
            eng: 'Log in',
            rus: 'Вход'
        },
        emailField: {
            eng: 'E-mail *',
            rus: 'Электронная почта *'
        },
        emailPlaceholder: {
            eng: 'For example: mail@gmail.com',
            rus: 'Например: mail@gmail.com'
        },
        emailErrRequired: {
            eng: 'Required',
            rus: 'Обязательное поле'
        },
        emailErrInvalid: {
            eng: 'Invalid email address',
            rus: 'Почта написана неправильно'
        },
        passwordField: {
            eng: 'Password *',
            rus: 'Пароль *'
        },
        passwordErrRequired: {
            eng: 'Required',
            rus: 'Обязательное поле'
        },
        passwordErrToShort: {
            eng: 'Must be 4 characters or more',
            rus: 'Минимально можно ввести 4 символа'
        },
        passwordErrToLong: {
            eng: 'Must be 15 characters or less',
            rus: 'Максимум можно ввести 15 символов'
        },
        submitBtnText: {
            eng: 'Sign in',
            rus: 'Войти'
        },
        sendAnotherLetter: {
            eng: 'Send another letter',
            rus: 'Послать письмо еще раз'
        },
        sentWrongData: {
            eng: 'Incorrect email or password',
            rus: 'Неправильная почта и пароль.'
        },
        failedToSendAnotherConfirmationLetter: {
            eng: 'Failed to send another email with a mail confirmation link. Try again after a while.',
            rus: 'Не удалось отправить еще одно письмо со ссылкой на подтверждение почты. Попробуйте еще раз через некоторое время.'
        },
        confirmationLetterWasSent: {
            eng: 'An email has been sent to you with a link to confirm your email. Confirm your email and then log in again.',
            rus: 'На вашу почту отправлено письмо со ссылкой на подтверждение почты. Подтвердите почту и затем зайдите в систему еще раз.'
        },
    }
}

export default messages