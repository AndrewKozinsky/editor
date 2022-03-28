import { FireDataEventArg } from './EventDataTypes'
import { makeHistoryStep } from './fn/history'

export default function fireEvent(eventData: FireDataEventArg) {
    switch (eventData.event) {
        // Сделать шаг вперёд или назад по истории
        case 'makeHistoryStep':
            makeHistoryStep(eventData)
    }
}