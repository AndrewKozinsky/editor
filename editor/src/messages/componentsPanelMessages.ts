import getMsgProxy from './fn/msgProxy'

// Components templates section in LeftPart-2
const componentsPanelMessages = {
    header: {
        eng: 'Components',
        rus: 'Компоненты'
    },
    beforeButton: {
        eng: 'Insert before component',
        rus: 'Вставить до компонента'
    },
    afterButton: {
        eng: 'Insert after component',
        rus: 'Вставить после компонента'
    },
    insideButton: {
        eng: 'Insert in element',
        rus: 'Вставить внутрь элемента'
    },
}

const componentsPanelMsg = getMsgProxy<typeof componentsPanelMessages>(componentsPanelMessages)
export default componentsPanelMsg