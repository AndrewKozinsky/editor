import React, {useState} from 'react'
import FHTypes from '../types'


/**
 * Хук возвращает объект со свойствами lastEvent и setLastEvent
 * В lastEvent находится объект где описано имя случившегося события и поле где оно произошло.
 * В setLastEvent находится функция изменяющая объект lastEvent
 */
export default function useBrowserEvent() {
    const [browserEvent, setBrowserEvent] = useState<FHTypes.BrowserEventState>(
        { eventName: null, fieldName: '' }
    )

    // Функция ставит в lastEvent новые данные
    function changeBrowserEvent(eventDetails: FHTypes.BrowserEventState) {
        setBrowserEvent(eventDetails)
    }

    return {
        browserEvent,
        setBrowserEvent: changeBrowserEvent
    }
}
