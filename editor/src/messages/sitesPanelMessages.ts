import getMsgProxy from './fn/msgProxy'

// Панель «Сайты»
const sitesPanelMessages = {
    header: {
        eng: 'Sites',
        rus: 'Сайты'
    },
    newSiteBtn: {
        eng: 'New site',
        rus: 'Новый сайт'
    },
}

const sitesPanelMsg = getMsgProxy<typeof sitesPanelMessages>(sitesPanelMessages)
export default sitesPanelMsg