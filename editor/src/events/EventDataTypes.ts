// Данные для различных событий
namespace EventDataTypes {
    // Сделать шаг вперёд или назад по истории
    export type makeHistoryStep = {
        event: 'makeHistoryStep',
        direction: 'undo' | 'redo'
    }
}

export type FireDataEventArg =
    EventDataTypes.makeHistoryStep

export default EventDataTypes