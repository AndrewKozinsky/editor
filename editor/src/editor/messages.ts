import store from '../store/store';

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
    }
}

/*const handler = {
    get: (target: typeof messagesOrigin, prop: string) => {
        const lang = store.getState().settings.editorLanguage

        return target[prop][lang]
    }
}*/

// const messages = new Proxy(messagesOrigin, handler)

export default messages