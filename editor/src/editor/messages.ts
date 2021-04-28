
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
        header: {
            eng: 'Sites',
            rus: 'Сайты'
        },
        newSiteBtn: {
            eng: 'New site',
            rus: 'Новый сайт'
        },
    },
    // Панель «Настройки»
    SettingsPanel: {
        header: {
            eng: 'Settings',
            rus: 'Настройки'
        },
        leftMenuItemUser: {
            eng: 'User',
            rus: 'Пользователь'
        },
        leftMenuItemEditor: {
            eng: 'Editor',
            rus: 'Редактор'
        },
    },
}

export default messages