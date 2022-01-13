import getMsgProxy from './fn/msgProxy'

// Тексты панели с кнопками манипулирования выделенным компонентом/элементом
const bottomPanelMessages = {
    inside: {
        eng: 'Inserting a component inside an element',
        rus: 'Вставка компонента внутрь'
    },
    up: {
        eng: 'Moving up',
        rus: 'Перемещение вверх'
    },
    down: {
        eng: 'Moving down',
        rus: 'Перемещение вниз'
    },
    clone1: {
        eng: 'Copy element',
        rus: 'Скопировать элемент'
    },
    clone2: {
        eng: 'Copy element with attributes',
        rus: 'Скопировать элемент с атрибутами'
    },
    clone3: {
        eng: 'Copy the element with the children',
        rus: 'Скопировать элемент с детьми'
    },
    remove: {
        eng: 'Deleting an item',
        rus: 'Удаление элемента'
    },
    visible: {
        eng: 'Make the element visible',
        rus: 'Скрыть / сделать элемент видимым'
    },
}

const bottomPanelMsg = getMsgProxy<typeof bottomPanelMessages>(bottomPanelMessages)
export default bottomPanelMsg