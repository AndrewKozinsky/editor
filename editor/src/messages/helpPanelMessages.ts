import getMsgProxy from './fn/msgProxy'

// Панель «Настройки»
const helpPanelMessages = {
    header: {
        eng: 'Help',
        rus: 'Помощь'
    },
    leftMenuItemReg: {
        eng: 'Registration',
        rus: 'Регистрация'
    },
}

const helpPanelMsg = getMsgProxy<typeof helpPanelMessages>(helpPanelMessages)
export default helpPanelMsg