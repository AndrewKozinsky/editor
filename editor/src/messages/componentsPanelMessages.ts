import getMsgProxy from './fn/msgProxy'

// Components templates section in LeftPart-2
const componentsPanelMessages = {
    header: {
        eng: 'Components',
        rus: 'Компоненты'
    },
    beforeButton: {
        eng: 'Insert before',
        rus: 'Вставить до'
    },
    afterButton: {
        eng: 'Insert after',
        rus: 'Вставить после'
    },
    insideButton: {
        eng: 'Insert in',
        rus: 'Вставить внутрь'
    },
    textComponent: {
        eng: 'Text',
        rus: 'Текст'
    },
}

const componentsPanelMsg = getMsgProxy<typeof componentsPanelMessages>(componentsPanelMessages)
export default componentsPanelMsg