
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
        emailErrInvalid: {
            eng: 'Invalid email address',
            rus: 'Почта написана неправильно'
        },
        passwordField: {
            eng: 'Password *',
            rus: 'Пароль *'
        },
        submitBtnText: {
            eng: 'Log in',
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
    },
    // Форма RegFormBlock
    RegForm: {
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
            rus: 'Войти'
        },
        somethingWentWrong: {
            eng: 'Something went wrong',
            rus: 'Произошла непредвиденная ошибка. Регистрация не выполнена.'
        },
    },
    // Форма ResetFormBlock
    ResetForm: {
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
    },
    // Форма ChangeResetPasswordFormBlock
    ChangeResetPasswordForm: {
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
    },
    // Форма ConfirmEmailFormBlock
    ConfirmEmailForm: {
        // Заголовок формы подтверждения почты
        formHeader: {
            eng: 'Email confirm',
            rus: 'Подтверждение почты'
        },
        tokenField: {
            eng: 'Token',
            rus: 'Токен'
        },
        submitBtnText: {
            eng: 'Confirm email',
            rus: 'Подтвердить почту'
        },
        tokenIsInvalid: {
            eng: 'This token is invalid',
            rus: 'Вы ввели неправильный токен'
        },
        tokenIsWrong: {
            eng: 'Token is invalid or has expired',
            rus: 'Токен неправильный или с истёкшим сроком действия'
        },
    },
    Common: {
        emailPlaceholder: {
            eng: 'For example: mail@gmail.com',
            rus: 'Например: mail@gmail.com'
        },
        requiredField: {
            eng: 'Required field',
            rus: 'Обязательное поле'
        },
        passwordToShort: {
            eng: 'Must be 6 characters or more',
            rus: 'Минимально нужно ввести 6 символов'
        },
        passwordToLong: {
            eng: 'Must be 50 characters or less',
            rus: 'Максимум можно ввести 50 символов'
        },
    }
}

export default messages