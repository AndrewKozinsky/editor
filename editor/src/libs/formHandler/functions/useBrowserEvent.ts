import { useState } from 'react'
import FHTypes from '../types'


/**
 * Хук возвращает объект со свойствами lastEvent и setLastEvent
 * В lastEvent находится объект где описано имя случившегося события и поле где оно произошло.
 * В setLastEvent находится функция изменяющая объект lastEvent
 * Это нужно чтобы при обновлении eventName запускался бы обработчик этого события у поля.
 */
export default function useBrowserEvent($form: FHTypes.$form) {
    const [browserEvent, setBrowserEvent] = useState<FHTypes.BrowserEventState>(
        { browserEvent: null, eventName: null, fieldName: '' }
    )

    // Функция ставит в lastEvent новые данные
    function changeBrowserEvent(eventDetails: FHTypes.BrowserEventState) {
        if (!$form) return
        if (!eventDetails.browserEvent || !eventDetails.eventName) return
        setBrowserEvent(eventDetails)
    }

    return {
        browserEvent,
        setBrowserEvent: changeBrowserEvent
    }
}
