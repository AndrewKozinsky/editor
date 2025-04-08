import getMsgProxy from './fn/msgProxy'

// Сообщения панелей изменения тега и атрибутов
const attrPanelMessages = {
    notSelected: {
        eng: 'Not selected',
        rus: 'Не выбрано'
    },
}

const attrPanelMsg = getMsgProxy<typeof attrPanelMessages>(attrPanelMessages)
export default attrPanelMsg