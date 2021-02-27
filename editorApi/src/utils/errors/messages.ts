
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

export const messages: messagesType = {
    // Модель User
    user: {
        emailRequired: {
            eng: 'Please provide a email.',
            rus: 'Укажите адрес почты.'
        },
        emailValidate: {
            eng: 'Please provide a valid email.',
            rus: 'Укажите правильный адрес почты.'
        },
        passwordRequired: {
            eng: 'Please provide a password.',
            rus: 'Укажите пароль.'
        },
        passwordMinLength: {
            eng: 'Password should be at least four characters.',
            rus: 'Пароль должен быть не короче 4 символов.'
        },
        passwordConfirmRequired: {
            eng: 'Please confirm your password.',
            rus: 'Повторно введите пароль.'
        },
        passwordConfirmValidate: {
            eng: 'Passwords are not equal.',
            rus: 'Ввели разные пароли.'
        },
        langRequired: {
            eng: 'Please provide your language.',
            rus: 'Укажите язык интерфейса.'
        }
    },
    // Контроллер авторизации
    authController: {
        // getTokenData
        getTokenDataNoCorrectToken: {
            eng: 'Authorization token is either not transferred or is invalid.',
            rus: 'Токен авторизации или не передан или неправилен.'
        },
        // confirmEmail
        confirmEmailUserNotFound: {
            eng: 'Wrong email confirmation token was sent.',
            rus: 'Передан неверный токен подтверждения почты.'
        },
        confirmEmailIsConfirmed: {
            eng: 'Email is confirmed!',
            rus: 'Передан неверный токен подтверждения почты.'
        },
        // login
        loginNoEmailOrPassword: {
            eng: 'Please provide email and password.',
            rus: 'Не передана почта или пароль'
        },
        loginWrongEmailOrPassword: {
            eng: 'Incorrect email or password',
            rus: 'Неверная почта или пароль'
        },
        loginConfirmEmail: {
            eng: 'Please, confirm your email.',
            rus: 'Пожалуйста, подтвердите почту перед тем, как войти'
        },
        // protect
        protectNoToken: {
            eng: 'You are not logged in! Please log in to to get access',
            rus: 'Авторизуйтесь чтобы просматривать эти данные.'
        },
        protectNoUser: {
            eng: 'The user belonging to this token does not longer exists.',
            rus: 'Пользователя с таким токеном не существует.'
        },
        protectPasswordChanged: {
            eng: 'User recently changed password! Please log in again.',
            rus: 'Пользователя недавно изменил пароль. Снова авторизуйтесь.'
        },
        // forgotPassword
        forgotPasswordNoUser: {
            eng: 'There is no user with this email address.',
            rus: 'Не найдено пользователя с такой почтой.'
        },
        forgotPasswordCanNotSendEmail: {
            eng: 'There was an error sending the email. Try again later.',
            rus: 'Не удалось отправить письмо. Попробуйте позже.'
        },
        forgotPasswordEmailHasBeenSent: {
            eng: 'Email has been sent!',
            rus: 'Письмо со ссылкой на сброс пароля было отправлено.'
        },
        // resetPassword
        resetPasswordPasswordIsNotProvided: {
            eng: 'Password or Confirm Password is not provided',
            rus: 'Не передан пароль или подтверждение пароля.'
        },
        resetPasswordTokenIsInvalid: {
            eng: 'Token is invalid or has expired',
            rus: 'Токен сброса пароля неверный или просроченный.'
        },
    }
}



/**
 * Функция получает строку типа "Invalid input data: {{user.emailValidate}}"
 * где в фигурных скобках написан адрес настоящего текста ошибки
 * @param {String} errMessage — сообщение об ошибке
 * @param {String} lang — язык
 */
export function getMessageDependingOnTheLang(errMessage: string, lang: string) {

    // Регулярное выражение ищущее слова заключённые в двойные фигурные скобки
    const wordsInCurlyBraces = /{{(.*?)}}/g

    let wordsArr = errMessage.match(wordsInCurlyBraces) || []
    wordsArr = wordsArr.map(word => {
        return changeTemplatedError(word, lang)
    })

    return wordsArr.join(' ')
}

/**
 * Функция получает строку вида 'authController.confirmEmailUserNotFound' и язык
 * и на этих данных возвращает сообщение из объекта messages
 * @param {String} propPath — строка вида 'authController.confirmEmailUserNotFound'
 * @param {String} lang — язык сообщения (rus или eng)
 */
function changeTemplatedError(propPath: string, lang: string): string {
    // Обрезать двойные фигурные скобки слева и справа
    const clearedPropPath = propPath.slice(2, -2)

    // Получить ключи первого и второго свойства
    let [prop1, prop2] = clearedPropPath.split('.')

    // Вернуть сообщения в зависимости от переданного языка
    return messages[prop1][prop2][lang] || '< -ERROR NOT FOUND ->'
}