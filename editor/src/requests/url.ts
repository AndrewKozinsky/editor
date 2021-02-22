

const addresses = {
    // Получение токена пользователя
    getUserToken: 'users/getTokenInfo'
}

const url = new Proxy(addresses, {
    get(url, prop: PropertyKey): string {
        if (url[prop]) {
            return '/api/' + url[prop]
        }
        // @ts-ignore
        const x: never = null
        return ''
    }
})

export default url