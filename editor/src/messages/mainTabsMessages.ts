import getMsgProxy from './fn/msgProxy'

// Подсказки вкладок
const mainTabsMessages = {
    mainTabMaterials: {
        eng: 'Groups',
        rus: 'Группы'
    },
    mainTabEditor: {
        eng: 'Editor',
        rus: 'Редактор'
    },
    mainTabSettings: {
        eng: 'Settings',
        rus: 'Настройки'
    },
    mainTabHelp: {
        eng: 'Help',
        rus: 'Помощь'
    },
}

const mainTabsMsg = getMsgProxy<typeof mainTabsMessages>(mainTabsMessages)
export default mainTabsMsg