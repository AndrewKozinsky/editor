import { getMessagesObject } from 'messages/fn/getMessagesObject'

// Components templates section in LeftPart-2
const obj = {
    header: {
        eng: 'Components',
        rus: 'Компоненты'
    },
    insideButton: {
        eng: 'Inside',
        rus: 'Внутрь'
    }
}

export const componentsPanelMessages = getMessagesObject(obj)
