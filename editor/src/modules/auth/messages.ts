
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Меню форм
    menu: {
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
    enterForm: {
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
    }
}

export default messages