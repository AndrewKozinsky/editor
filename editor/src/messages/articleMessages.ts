import getMsgProxy from './fn/msgProxy'

// Сообщения в IFrame-е редактируемой статьи
const articleMessages = {
    emptyTextPlaceholder: {
        eng: 'Text...',
        rus: 'Текст...'
    },
}

const articleMsg = getMsgProxy<typeof articleMessages>(articleMessages)
export default articleMsg