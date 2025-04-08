import { MiscTypes } from 'types/miscTypes'


const addresses: MiscTypes.ObjStringKey<any> = {
    // ВХОД, РЕГИСТРАЦИЯ И ПРОЧЕЕ СВЯЗАННОЕ С АВТОРИЗАЦИЕЙ
    // Получение токена пользователя
    getUserToken: 'users/getTokenData',
    // Вход пользователя. В ответ сервер отправляет токен авторизации.
    login: 'users/login',
    // Регистрация
    signup: 'users',
    // Отправка письма со ссылкой на подтверждение почты
    sendConfirmLetter: 'users/sendConfirmLetter',
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
    site: function (siteId: number) {
        return 'sites/' + siteId
    },

    // Шаблоны подключаемых файлов
    siteTemplates: function (siteId: number) {
        return 'sites/' + siteId + '/siteTemps'
    },
    createSiteTemplate: 'siteTemplates',
    siteTemplate: function (siteTemplateId: number) {
        return 'siteTemplates/' + siteTemplateId
    },

    // Шаблоны метаданных
    metaTemplates: function (siteId: number) {
        return 'sites/' + siteId + '/metaTemps'
    },
    createMetaTemplate: 'metaTemplates',
    metaTemplate: function (metaTemplateId: number) {
        return 'metaTemplates/' + metaTemplateId
    },

    // Папка шаблонов компонентов
    compFoldersBySite: function (siteId: number) {
        return `sites/${siteId}/compFolders`
    },
    compFolder: function (compFolderId: number) {
        return compFolderId
            ? 'compFolders/' + compFolderId
            : 'compFolders/'
    },
    // Шаблон компонента
    components: 'components',
    component: function (compId: number) {
        return 'components/' + compId
    },
    // Компоненты сайта
    componentsBySite: function (siteId: number) {
        return 'sites/' + siteId + '/components'
    },
    // Папки статей
    artFoldersBySite: function (siteId: number) {
        return `sites/${siteId}/artFolders`
    },
    artFolder: function (artFolderId?: number) {
        return artFolderId
            ? 'artFolders/' + artFolderId
            : 'artFolders/'
    },
    // Статья
    articles: 'articles',
    article: function (artId: number) {
        return 'articles/' + artId
    },
}


// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
export default function getApiUrl(url: string, ...args: any[]): string {

    if (addresses[url]) {
        if (typeof addresses[url] === 'string') {
            return '/api2/' + addresses[url]
        }
        else {
            return '/api2/' + addresses[url](...args)
        }
    }

    // @ts-ignore
    const x: never = null
}
