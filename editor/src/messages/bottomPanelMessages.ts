import getMsgProxy from './fn/msgProxy'
import {isMacOS} from '../utils/domUtils'

const cmd = isMacOS ? 'Cmd' : 'Ctrl'

// Тексты панели с кнопками манипулирования выделенным компонентом/элементом
const bottomPanelMessages = {
    moveInside: {
        eng: 'Move the component inside an element (Shift + M)',
        rus: 'Переместить компонент внутрь элемента (Shift + M)'
    },
    moveLeft: {
        eng: 'Move the component to the left (Shift + Alt + M)',
        rus: 'Переместить компонент левее (Shift + Alt + M)'
    },
    moveRight: {
        eng: 'Move the component to the right (Shift + ' + cmd + ' + M)',
        rus: 'Переместить компонент правее (Shift + ' + cmd + ' + M)'
    },
    up: {
        eng: 'Moving up (' + cmd + ' + ↑) (Text: Shift + Alt + ' + cmd + ' + ↑)',
        rus: 'Передвинуть вверх (' + cmd + ' + ↑) (Текст: Shift + Alt + ' + cmd + ' + ↑)'
    },
    down: {
        eng: 'Moving down (' + cmd + ' + ↓) (Text: Shift + Alt + ' + cmd + ' + ↓)',
        rus: 'Передвинуть вниз (' + cmd + ' + ↓) (Text: Shift + Alt + ' + cmd + ' + ↓)'
    },
    clone: {
        eng: 'Duplicate (' + cmd + ' D) (+ Alt — with attributes) (+ Shift — with children)',
        rus: 'Дублировать (' + cmd + ' D) (+ Alt — с аттрибутами) (+ Shift — с детьми)'
    },
    cloneWithChildren: {
        eng: 'Duplicate with the children (' + cmd + ' D) (+ Alt — with attributes) (+ Shift — with children)',
        rus: 'Дублировать с детьми (' + cmd + ' D) (+ Alt — с аттрибутами) (+ Shift — с детьми)'
    },
    remove: {
        eng: 'Deleting (' + cmd + ' + Delete) (Text: Shift + Alt + ' + cmd + ' + Delete)',
        rus: 'Удалить (' + cmd + ' + Delete) (Текст: Shift + Alt + ' + cmd + ' + Delete)'
    },
    visible: {
        eng: 'Change visibility (' + cmd + ' + J)',
        rus: 'Изменить видимость (' + cmd + ' + J)'
    },
}

const bottomPanelMsg = getMsgProxy<typeof bottomPanelMessages>(bottomPanelMessages)
export default bottomPanelMsg