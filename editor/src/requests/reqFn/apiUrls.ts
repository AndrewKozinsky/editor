import { MiscTypes } from 'src/types/miscTypes'


const addresses: MiscTypes.ObjStringKeyAnyVal = {
    // ВХОД, РЕГИСТРАЦИЯ И ПРОЧЕЕ СВЯЗАННОЕ С АВТОРИЗАЦИЕЙ
    // Получение токена пользователя
    getUserToken: 'users/getTokenData',
    // Вход пользователя. В ответ сервер отправляет токен авторизации.
    login: 'users/login',
    // Регистрация
    signup: 'users/signup',
    // Отправка письма со ссылкой на подтверждение почты
    sendAnotherConfirmLetter: 'users/sendAnotherConfirmLetter',
    // Подтверждение почты
    confirmEmail: function (confirmEmailToken: string) {
        return 'users/confirmEmail/' + confirmEmailToken
    },
    // Изменение почты
    changeEmail: 'users/changeEmail',
    // Изменение пароля
    changePassword: 'users/changePassword',
    // Сброс пароля
    resetPassword: 'users/resetPassword',
    // Отправка нового пароля вместо сброшенного
    changeResetPassword: function (resetPasswordToken: string) {
        return 'users/resetPassword/' + resetPasswordToken
    },
    // Текущий пользователь
    me: 'users/me',

    // САЙТЫ
    // Сайты
    sites: 'sites',
    // Конкретный сайт
    site: function (siteId: string) {
        return 'sites/' + siteId
    },
    // Шаблоны подключаемых файлов
    incFilesTemplates: 'incFilesTemplate',
    // Конкретный шаблон подключаемых файлов
    incFilesTemplate: function (templateId: string) {
        return 'incFilesTemplate/' + templateId
    },
    // Папки шаблонов компонентов
    componentsFolders: function (siteId: string) {
        return 'componentsFolders/' + siteId
    },
    // Шаблон компонента
    component: function (uuid?: string) {
        if (uuid) return 'component/' + uuid
        else return 'component/'
    },
    // Папки статей
    articlesFolders: function (siteId: string) {
        return 'articlesFolders/' + siteId
    },
    // Статья
    article: function (uuid?: string) {
        if (uuid) return 'article/' + uuid
        else return 'article/'
    },
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