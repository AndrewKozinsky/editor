import { FireDataEventArg } from './EventDataTypes'
import { makeHistoryStep } from './fn/history'
import {deleteSelectedItem, deleteSelectedItemIfAllow} from './fn/deleteSelectedItem'
import { changeSelectedItemVisibilityIfAllow } from './fn/changeSelectedItemVisibility'
import {cloneSelectedItemIfAllow} from './fn/cloneSelectedItem'
import { upDownSelectedItemIfAllow } from './fn/upDownSelectedItem'
import { moveSelectedItemIfAllow } from './fn/moveSelectedItem'


export default function fireEvent(eventData: FireDataEventArg) {
    switch (eventData.event) {
        // Сделать шаг вперёд или назад по истории
        case 'makeHistoryStep':
            makeHistoryStep(eventData)
            break
        // Удаление выделенного компонента или элемента
        case 'deleteSelectedItem':
            deleteSelectedItemIfAllow(eventData)
            break
        // Удаление выделенного компонента или элемента
        case 'changeSelectedItemVisibility':
            changeSelectedItemVisibilityIfAllow(eventData)
            break
        // Удаление выделенного компонента или элемента
        case 'cloneSelectedItem':
            cloneSelectedItemIfAllow(eventData)
            break
        // Изменения порядка выделенного компонента или элемента
        case 'upDownSelectedItem':
            upDownSelectedItemIfAllow(eventData)
            break
        // Перемещение компонента или элемента выделенного для перемещения внутрь выделенного элемента
        // или левее/правее выделенного компонента
        case 'moveSelectedItem':
            moveSelectedItemIfAllow(eventData)
            break
    }
}