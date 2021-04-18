

const addresses = {
    // ВХОД, РЕГИСТРАЦИЯ И ПРОЧЕЕ СВЯЗАННОЕ С АВТОРИЗАЦИЕЙ
    // Получение токена пользователя
    getUserToken: 'users/getTokenData',
    // Вход пользователя. В ответ сервер отправляет токен авторизации.
    login: 'users/login',
    signup: 'users/signup',
    resetPassword: 'users/resetPassword',
    // Подтверждение почты
    /*confirmEmail: (confirmEmailToken: string) => {
        return 'users/confirmEmail'
    },*/
    // Отправка письма со ссылкой на подтверждение почты
    sendAnotherConfirmLetter: 'users/sendAnotherConfirmLetter',
}

// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
const apiUrls = new Proxy(addresses, {
    get(url, prop: PropertyKey): string {
        // @ts-ignore
        if (url[prop]) {
            // @ts-ignore
            return '/api/' + url[prop]
        }
        // @ts-ignore
        const x: never = null
        return ''
    }
})

export default apiUrls