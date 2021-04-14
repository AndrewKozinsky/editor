import FHTypes from '../types'
import {getSetFieldData, getSetFieldValue, setFormData } from './formStateSettersAndGetters'


/**
 * Функция запускаемая после браузерного события
 * @param {Object} browserEvent — объект с данными о произошедшем событии
 * @param {Object} formConfig — конфигурацию формы переданная программистом
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — установка состояния формы
 * @param {Function} setBrowserEvent — установка
 */
export function handleBrowserEvent(
    browserEvent: FHTypes.BrowserEventState,
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setBrowserEvent: (browserEvent: FHTypes.BrowserEventState) => void
) {
    // Имя поля и имя произошедшего события
    const {fieldName, eventName} = browserEvent

    // Не обрабатывать пустые события
    if (!eventName) return

    // Если в formConfig у поля есть обработка определённого события...
    if (formConfig.fields[fieldName] && formConfig.fields[fieldName][eventName]) {
        // Объект передаваемый в функцию устанавливающую данные поля
        const formDetails = getFormDetails(browserEvent, formState, fieldName)

        // Запуск функции, которая должна запускаться после определённого события
        // случившегося на поле. Возвращает новый объект Состояния формы
        const newFormState = formConfig.fields[fieldName][eventName](formDetails)

        // Установка нового состояния формы если что-то прислали
        if (newFormState) setFormState(newFormState)
    }

    setBrowserEvent({browserEvent: null, eventName: null})
}


export function getFormDetails(
    browserEvent: null | FHTypes.BrowserEventState,
    formState: FHTypes.FormState,
    fieldName: string
): FHTypes.FormDetailsInEventHandler {
    return {
        // Объект события
        browserEvent: browserEvent.browserEvent || null,
        // Состояние формы.
        state: formState,
        // Метод устанавливающий новое значение поля и возвращающий обновлённое Состояние формы
        setFieldValue: getSetFieldValue(fieldName),
        // Метод устанавливающий новые данные поля и возвращающий обновлённое Состояние формы
        setFieldData: getSetFieldData(fieldName),
        // Функция изменяющая данные формы и возвращающая обновлённое Состояние формы
        setFormData: setFormData,
        // Функция сбрасывающая данные всех полей на значения по умолчанию.
        // resetForm: () => void
    }
}
