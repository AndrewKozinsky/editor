import {getMessagesObject} from 'messages/fn/getMessagesObject'

// Подсказки вкладок
const obj = {
    mainTabMaterials: {
        eng: 'Materials',
        rus: 'Материалы'
    },
    mainTabEditor: {
        eng: 'Editor',
        rus: 'Редактор'
    },
    mainTabSettings: {
        eng: 'Settings',
        rus: 'Настройки'
    },
}

export const mainTabsMessages = getMessagesObject(obj)