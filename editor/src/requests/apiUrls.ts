

const addresses = {
    // Получение токена пользователя
    getUserToken: 'users/getTokenData'
}

// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
const apiUrls = new Proxy(addresses, {
    get(url, prop: PropertyKey): string {
        if (url[prop]) {
            return '/api/' + url[prop]
        }
        // @ts-ignore
        const x: never = null
        return ''
    }
})

export default apiUrls