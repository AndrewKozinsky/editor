
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
        confirmEmailUserNotFound: {
            eng: 'Wrong email confirmation token was sent.',
            rus: 'Передан неверный токен подтверждения почты.'
        },
        confirmEmailIsConfirmed: {
            eng: 'Email is confirmed!',
            rus: 'Передан неверный токен подтверждения почты.'
        }
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