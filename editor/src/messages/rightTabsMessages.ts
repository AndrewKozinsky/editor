import getMsgProxy from './fn/msgProxy'

// Названия вкладок на первой правой вкладке
const rightTabsMessages = {
    groups: {
        eng: 'Group',
        rus: 'Группа'
    },
    groupTemplates: {
        eng: 'Group style templates',
        rus: 'Шаблоны стилей группы'
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