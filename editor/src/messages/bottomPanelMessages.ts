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
        eng: 'Copy',
        rus: 'Скопировать'
    },
    clone2: {
        eng: 'Copy with attributes',
        rus: 'Скопировать с атрибутами'
    },
    clone3: {
        eng: 'Copy with the children',
        rus: 'Скопировать с детьми'
    },
    remove: {
        eng: 'Deleting',
        rus: 'Удаление'
    },
    visible: {
        eng: 'Change visibility',
        rus: 'Изменить видимость'
    },
}

const bottomPanelMsg = getMsgProxy<typeof bottomPanelMessages>(bottomPanelMessages)
export default bottomPanelMsg