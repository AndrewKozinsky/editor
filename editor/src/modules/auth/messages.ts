
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
    // Форма EnterForm
    enterForm: {
        // Заголовок формы входа
        formHeader: {
            eng: 'Log in',
            rus: 'Вход'
        },
        emailField: {
            eng: 'E-Mail *',
            rus: 'Электронная почта *'
        },
        emailPlaceholder: {
            eng: 'For example: mail@gmail.com',
            rus: 'Например: mail@gmail.com'
        },
        passwordField: {
            eng: 'Password *',
            rus: 'Пароль *'
        },
        submitBtnText: {
            eng: 'Sign In',
            rus: 'Войти'
        },
    }
}

export default messages