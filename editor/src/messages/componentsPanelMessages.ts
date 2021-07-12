import { getMessagesObject } from 'messages/fn/getMessagesObject'

// Components templates section in LeftPart-2
const obj = {
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

export const componentsPanelMessages = getMessagesObject(obj)
