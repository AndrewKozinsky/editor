import { FireDataEventArg } from './EventDataTypes'
import { makeHistoryStep } from './fn/history'
import {deleteSelectedItem, deleteSelectedItemIfAllow} from './fn/deleteSelectedItem'
import { changeSelectedItemVisibilityIfAllow } from './fn/changeSelectedItemVisibility'
import {cloneSelectedItemIfAllow} from './fn/cloneSelectedItem'
import { upDownSelectedItemIfAllow } from './fn/upDownSelectedItem'
import { moveSelectedItemIfAllow } from './fn/moveSelectedItem'
import {closeArticle} from './fn/closeArticle'
import { saveArticle } from './fn/saveArticle'


export default function fireEvent(eventData: FireDataEventArg) {
    switch (eventData.event) {

        // ПРОЧЕЕ

        // Сделать шаг вперёд или назад по истории
        case 'makeHistoryStep':
            makeHistoryStep(eventData)
            break
        // Закрытие статьи
        case 'closeArticle':
            closeArticle(eventData)
            break
        // Закрытие статьи
        case 'saveArticle':
            saveArticle(eventData)
            break

        // РАБОТА С ВЫДЕЛЕННЫМ ЭЛЕМЕНТОМ

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
        // Перемещение компонента выделенного для перемещения внутрь выделенного элемента
        // или левее/правее компонента, содержащего выделенный элемент
        case 'moveSelectedItem':
            moveSelectedItemIfAllow(eventData)
            break
    }
}