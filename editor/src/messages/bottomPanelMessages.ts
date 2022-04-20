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
        rus: 'Передвинуть вверх'
    },
    down: {
        eng: 'Moving down',
        rus: 'Передвинуть вниз'
    },
    clone: {
        eng: 'Duplicate',
        rus: 'Дублировать'
    },
    cloneWithChildren: {
        eng: 'Duplicate with the children',
        rus: 'Дублировать с детьми'
    },
    cloneWithAttrs: {
        eng: 'Duplicate with the attributes',
        rus: 'Дублировать с атрибутами'
    },
    remove: {
        eng: 'Deleting',
        rus: 'Удалить'
    },
    visible: {
        eng: 'Change visibility',
        rus: 'Изменить видимость'
    },
}

const bottomPanelMsg = getMsgProxy<typeof bottomPanelMessages>(bottomPanelMessages)
export default bottomPanelMsg