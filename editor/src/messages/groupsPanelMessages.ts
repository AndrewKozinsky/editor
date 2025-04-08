import getMsgProxy from './fn/msgProxy'

// Панель «Сайты»
const groupsPanelMessages = {
    header: {
        eng: 'Groups',
        rus: 'Группы'
    },
    newSiteBtn: {
        eng: 'New group',
        rus: 'Новая группа'
    },
}

const sitesPanelMsg = getMsgProxy<typeof groupsPanelMessages>(groupsPanelMessages)
export default sitesPanelMsg