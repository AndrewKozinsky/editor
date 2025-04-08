// Данные для различных событий
namespace EventDataTypes {

    // ПРОЧЕЕ

    // Сделать шаг вперёд или назад по истории
    export type makeHistoryStep = {
        event: 'makeHistoryStep',
        direction: 'undo' | 'redo'
    }
    // Закрытие статьи
    export type closeArticle = {
        event: 'closeArticle'
    }
    // Сохранение статьи
    export type saveArticle = {
        event: 'saveArticle'
    }

    // РАБОТА С ВЫДЕЛЕННЫМ ЭЛЕМЕНТОМ

    // Удаление выделенного компонента или элемента
    export type deleteSelectedItem = {
        event: 'deleteSelectedItem',
    }

    // Удаление выделенного компонента или элемента
    export type changeSelectedItemVisibility = {
        event: 'changeSelectedItemVisibility',
    }

    // Клонирование выделенного компонента или элемента
    export type cloneSelectedItem = {
        event: 'cloneSelectedItem',
        cloneChildren?: boolean,
        cloneAttrs?: boolean
    }

    // Изменения порядка выделенного компонента или элемента
    export type upDownSelectedItem = {
        event: 'upDownSelectedItem',
        direction: 'up' | 'down'
    }

    // Перемещение компонента выделенного для перемещения внутрь выделенного элемента
    // или левее/правее выделенного компонента
    export type moveSelectedItem = {
        event: 'moveSelectedItem',
        direction: 'inside' | 'left' | 'right'
    }
}

export type FireDataEventArg =
    EventDataTypes.makeHistoryStep |
    EventDataTypes.closeArticle |
    EventDataTypes.saveArticle |
    EventDataTypes.deleteSelectedItem |
    EventDataTypes.changeSelectedItemVisibility |
    EventDataTypes.cloneSelectedItem |
    EventDataTypes.upDownSelectedItem |
    EventDataTypes.moveSelectedItem

export default EventDataTypes