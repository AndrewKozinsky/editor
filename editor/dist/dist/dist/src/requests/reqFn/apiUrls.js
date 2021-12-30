const addresses = {
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
    confirmEmail: function (confirmEmailToken) {
        return 'users/confirmEmail/' + confirmEmailToken;
    },
    // Изменение почты
    changeEmail: 'users/changeEmail',
    // Изменение пароля
    changePassword: 'users/changePassword',
    // Сброс пароля
    resetPassword: 'users/resetPassword',
    // Отправка нового пароля вместо сброшенного
    changeResetPassword: function (resetPasswordToken) {
        return 'users/resetPassword/' + resetPasswordToken;
    },
    // Текущий пользователь
    me: 'users/me',
    // САЙТЫ
    // Сайты
    sites: 'sites',
    // Конкретный сайт
    site: function (siteId) {
        return 'sites/' + siteId;
    },
    // SITE TEMPLATES
    // Шаблоны подключаемых файлов
    siteTemplates: function (siteId) {
        return 'sites/' + siteId + '/siteTemps';
    },
    createSiteTemplate: 'siteTemplates',
    siteTemplate: function (siteTemplateId) {
        return 'siteTemplates/' + siteTemplateId;
    },
    // Папка шаблонов компонентов
    compFoldersBySite: function (siteId) {
        return `sites/${siteId}/compFolders`;
    },
    compFolder: function (compFolderId) {
        return compFolderId
            ? 'compFolders/' + compFolderId
            : 'compFolders/';
    },
    // Шаблон компонента
    components: 'components',
    component: function (compId) {
        return 'components/' + compId;
    },
    // Компоненты сайта
    componentsBySite: function (siteId) {
        return 'sites/' + siteId + '/components';
    },
    // Папки статей
    artFoldersBySite: function (siteId) {
        return `sites/${siteId}/artFolders`;
    },
    artFolder: function (artFolderId) {
        return artFolderId
            ? 'artFolders/' + artFolderId
            : 'artFolders/';
    },
    // Статья
    articles: 'articles',
    article: function (artId) {
        return 'articles/' + artId;
    },
};
// Оборачивание объекта addresses чтобы при запросе
// к началу каждого адреса добавлялась приставка /api/.
export default function getApiUrl(url, ...args) {
    if (addresses[url]) {
        if (typeof addresses[url] === 'string') {
            return '/api2/' + addresses[url];
        }
        else {
            return '/api2/' + addresses[url](...args);
        }
    }
    // @ts-ignore
    const x = null;
}
//# sourceMappingURL=apiUrls.js.map
//# sourceMappingURL=apiUrls.js.map
//# sourceMappingURL=apiUrls.js.map