import { getMessagesObject } from 'messages/fn/getMessagesObject'

// Панель «Настройки»
const obj = {
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

export const settingsPanelMessages = getMessagesObject(obj)
