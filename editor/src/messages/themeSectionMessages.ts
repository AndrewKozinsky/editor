import {getMessagesObject} from 'messages/fn/getMessagesObject'

// Секция «Цветовая тема»
const obj = {
    themeRadiosHeader: {
        eng: 'Color theme',
        rus: 'Цветовая схема'
    },
    lightLabel: {
        eng: 'Light',
        rus: 'Светлая'
    },
    darkLabel: {
        eng: 'Dark',
        rus: 'Тёмная'
    },
}

export const themeSectionMessages = getMessagesObject(obj)