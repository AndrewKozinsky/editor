import getMsgProxy from './fn/msgProxy'

// Панель «Настройки»
const settingsPanelMessages = {
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

const settingsPanelMsg = getMsgProxy<typeof settingsPanelMessages>(settingsPanelMessages)
export default settingsPanelMsg