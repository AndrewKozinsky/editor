import FHTypes from '../types'
import {getSetFieldData, getSetFieldValue, getSetFormData } from './formStateSettersAndGetters'


/**
 * Функция запускаемая после браузерного события
 * @param {Object} browserEvent — объект с данными о произошедшем событии
 * @param {Object} formConfig — конфигурацию формы переданная программистом
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — установка состояния формы
 */
export function handleBrowserEvent(
    browserEvent: FHTypes.BrowserEventState,
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Имя поля и имя произошедшего события
    const {fieldName, eventName} = browserEvent

    // Если событием является отправка формы
    if (eventName === 'submit') {

        // ... то перебрать все поля и запустить обработчики события submit
        for (let fieldName in formConfig.fields) {
            // Текущее поле
            const field = formConfig.fields[fieldName]

            // Если в поле есть подписка на событие изменения Состояния формы
            if (field.submit) {

                // Объект передаваемый в функцию устанавливающую данные поля
                const formDetails = getFormDetails(browserEvent, formState, setFormState)

                // Запуск функции, которая должна запускаться после определённого события
                field.submit(formDetails)
            }
        }
    }

    // Если в formConfig у поля есть обработка определённого события...
    // @ts-ignore
    else if (formConfig.fields[fieldName] && formConfig.fields[fieldName][eventName]) {
        // Объект передаваемый в функцию устанавливающую данные поля
        const formDetails = getFormDetails(browserEvent, formState, setFormState)

        // Запуск функции, которая должна запускаться после определённого события
        formConfig.fields[fieldName][eventName](formDetails)
    }
}


export function getFormDetails(
    browserEvent: null | FHTypes.BrowserEventState,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
): FHTypes.FormDetailsInEventHandler {
    return {
        // Объект события
        browserEvent: browserEvent.browserEvent || null,
        // Состояние формы.
        state: formState,
        // Метод устанавливающий новое значение поля
        setFieldValue: getSetFieldValue(formState, setFormState),
        // Метод устанавливающий новые данные поля
        setFieldData: getSetFieldData(formState, setFormState),
        // Функция изменяющая данные формы.
        setFormData: getSetFormData(formState, setFormState),
        // Функция сбрасывающая данные всех полей на значения по умолчанию.
        // resetForm: () => void
    }
}

