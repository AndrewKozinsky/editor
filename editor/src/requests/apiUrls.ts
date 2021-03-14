

const addresses = {
    // Получение токена пользователя
    getUserToken: 'users/getTokenData'
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