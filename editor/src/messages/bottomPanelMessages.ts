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
        eng: 'Duplicate (alt — with attributes)',
        rus: 'Дублировать (alt — с атрибутами)'
    },
    cloneWithChildren: {
        eng: 'Duplicate with the children (alt — with attributes)',
        rus: 'Дублировать с детьми (alt — с атрибутами)'
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