import getMsgProxy from './fn/msgProxy'

// Названия вкладок на первой правой вкладке
const rightTabsMessages = {
    sites: {
        eng: 'Site',
        rus: 'Сайт'
    },
    siteTemplates: {
        eng: 'Site style templates',
        rus: 'Шаблоны стилей сайта'
    },
    components: {
        eng: 'Component templates',
        rus: 'Шаблоны компонентов'
    },
    articles: {
        eng: 'Articles',
        rus: 'Статьи'
    }
}

const rightTabsMsg = getMsgProxy<typeof rightTabsMessages>(rightTabsMessages)
export default rightTabsMsg