
type messagesType = {
    [key: string]: {
        [key: string]: {
            [key: string]: string
        }
    }
}

const messages: messagesType = {
    // Панель «Сайты»
    SitesPanel: {
        // Пункт «Регистрация»
        header: {
            eng: 'Sites',
            rus: 'Сайты'
        },
        newSiteBtn: {
            eng: 'New site',
            rus: 'Новый сайт'
        },
    },
}

export default messages