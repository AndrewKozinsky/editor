import getMsgProxy from './fn/msgProxy'

// Тексты панели с кнопками манипулирования выделенным компонентом/элементом
const bottomPanelMessages = {
    moveInside: {
        eng: 'Move the component inside an element',
        rus: 'Переместить компонент внутрь элемента'
    },
    moveLeft: {
        eng: 'Move the component to the left',
        rus: 'Переместить компонент левее'
    },
    moveRight: {
        eng: 'Move the component to the right',
        rus: 'Переместить компонент правее'
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