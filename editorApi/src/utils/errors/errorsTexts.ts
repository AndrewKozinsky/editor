
type errorsTextsType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

export const errorsTexts: errorsTextsType = {
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
    }
}



/**
 * Функция получает строку типа "Invalid input data: {{user.emailValidate}}"
 * где в фигурных скобках написан адрес настоящего текста ошибки
 * @param {String} errMessage — сообщение об ошибке
 * @param {String} lang — язык
 */
export function getErrorTextDependingOnTheLang(errMessage: string, lang: string) {

    // Регулярное выражение ищущее слова заключённые в двойные фигурные скобки
    const wordsInCurlyBraces = /{{(.*?)}}/g

    let wordsArr = errMessage.match(wordsInCurlyBraces) || []
    wordsArr = wordsArr.map(word => {
        return changeTemplatedError(word, lang)
    })

    return wordsArr.join(' ')
}


function changeTemplatedError(propPath: string, lang: string): string {
    const clearedPropPath = propPath.slice(2, -2)

    let [prop1, prop2] = clearedPropPath.split('.')

    return errorsTexts[prop1][prop2][lang] || '< -ERROR NOT FOUND ->'
}