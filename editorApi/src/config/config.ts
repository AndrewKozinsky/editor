// Тип объекта конфигурации
export type ConfigType = {
    workMode: string
    port: number
    db: string

    publishedSiteURL: string
    devSiteURL: string

    emailFrom: string
    fakeEmailHost: string
    fakeEmailPort: number
    fakeEmailUsername: string
    fakeEmailPassword: string

    jwtSecret: string
    jwtExpiresIn: number
    jwtExpiresUnit: string
}

export const config: ConfigType = {
    // Режим работы (development или production)
    workMode: String(process.env.MODE),
    // Порт сервиса
    port: Number(process.env.PORT),
    // Адрес базы данных редактора
    db: String(process.env.MONGO_URL),

    // Домен опубликованного сервиса
    publishedSiteURL: 'https://editorium.net',
    // Домен разрабатываемого сервиса
    devSiteURL: 'https://editorium.dev',

    // Из какого адреса будут приходить письма от сервиса
    emailFrom: 'mail@andrewkozinsky.ru',
    // Адрес сервиса для ложных писем
    fakeEmailHost: 'smtp.mailtrap.io',
    // Номер порта сервиса для ложных писем
    fakeEmailPort: 25,
    // Имя пользователя сервиса для ложных писем
    fakeEmailUsername: 'd025be73c2e110',
    // Пароль пользователя сервиса для ложных писем
    fakeEmailPassword: '14ae61d46bc329',

    // JWT
    jwtSecret: 'geuAFR83_IXfpwx742$QQwfgiut45_cs',
    jwtExpiresIn: 90,
    jwtExpiresUnit: 'd'
}



// exports.db_username = 'andrew'
// exports.db_password = '-E8XZ.bq_WAb.uU'

// exports.sendpulse_api_user_id = 'a18cbff386759d5fbd86713d152dd2cd'
// exports.sendpulse_api_secret = '1d4f6afe38fd377a0ac46ff2233d96a3'
// exports.sendpulse_token_storage = '/tmp/'