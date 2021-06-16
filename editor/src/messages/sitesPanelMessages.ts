import { getMessagesObject } from 'messages/fn/getMessagesObject'

// Панель «Сайты»
const obj = {
    header: {
        eng: 'Sites',
        rus: 'Сайты'
    },
    newSiteBtn: {
        eng: 'New site',
        rus: 'Новый сайт'
    },
}

export const sitesPanelMessages = getMessagesObject(obj)
