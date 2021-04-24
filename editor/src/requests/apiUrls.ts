import { ObjStringKeyAnyValType } from "../types/miscTypes"


const addresses: ObjStringKeyAnyValType = {
    // ВХОД, РЕГИСТРАЦИЯ И ПРОЧЕЕ СВЯЗАННОЕ С АВТОРИЗАЦИЕЙ
    // Получение токена пользователя
    getUserToken: 'users/getTokenData',
    // Вход пользователя. В ответ сервер отправляет токен авторизации.
    login: 'users/login',
    signup: 'users/signup',
    resetPassword: 'users/resetPassword',
    // Подтверждение почты
    confirmEmail: function (confirmEmailToken: string) {
        return 'users/confirmEmail/' + confirmEmailToken
    },
    // Отправка письма со ссылкой на подтверждение почты
    sendAnotherConfirmLetter: 'users/sendAnotherConfirmLetter',
}


// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
function getApiUrl(url: string, ...args: any[]): string {
    if (addresses[url]) {
        if (typeof addresses[url] === 'string') {
            return '/api/' + addresses[url]
        }
        else {
            return '/api/' + addresses[url](...args)
        }
    }

    // @ts-ignore
    const x: never = null
}

export default getApiUrl