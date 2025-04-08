
export const config = {
    // Режим работы (development или production)
    workMode: String(process.env.MODE),
    // Порт сервиса
    port: Number(process.env.PORT),

    // Домен опубликованного сервиса
    publishedSiteURL: 'http://e.editorium.net',
    // Домен разрабатываемого сервиса
    devSiteURL: 'http://e.editorium.local',

    // Из какого адреса будут приходить письма от сервиса
    // YOU DON'T HAVE TO CHANGE EMAIL BECAUSE SENDPULSE REFUSED TO WORK
    emailFrom: 'mail@andrewkozinsky.ru',

    // Адрес сервиса для ложных писем
    fakeEmailDomain: 'smtp.mailtrap.io',
    // Номер порта сервиса для ложных писем
    fakeEmailPort: 2525,
    // Имя пользователя сервиса для ложных писем
    fakeEmailUsername: 'd025be73c2e110',
    // Пароль пользователя сервиса для ложных писем
    fakeEmailPassword: '14ae61d46bc329',

    // SendPulse
    sendpulseApiUserId: 'a18cbff386759d5fbd86713d152dd2cd',
    sendpulseApiSecret: '1d4f6afe38fd377a0ac46ff2233d96a3',
    sendpulseTokenStorage: '/tmp/',

    // JWT
    jwtSecret: 'geuAFR83_IXfpwx742$QQwfgiut45_cs',
    jwtExpiresIn: 90
}
