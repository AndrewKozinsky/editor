import makeImmutableObj from 'src/libs/makeImmutableCopy/makeImmutableCopy'
import getNickFormState from '../return-func/getNickFormState'
import FHTypes from '../types'
import React from 'react';


/**
 * Функция запускаемая после браузерного события
 * @param {Object} browserEvent — объект с данными о произошедшем событии
 * @param {Object} formConfig — конфигурацию формы переданная программистом
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — установка состояния формы
 * @param {Function} setBrowserEvent — функция устанавливающая объект с данными о произошедшем событии
 */
export default function useHandlerBrowserEvent(
    browserEvent: FHTypes.BrowserEventState,
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setBrowserEvent: FHTypes.SetBrowserEvent // Следует использовать FHTypes.SetBrowserEvent, но это даёт ошибку
) {

    // Имя поля и имя произошедшего события
    const {fieldName, eventName} = browserEvent
    // Завершить если не указано имя поля или оно не существует
    if (!fieldName) return

    // Если событием является отправка формы
    if (eventName === 'submit') {

        // ... то перебрать все поля и запустить обработчики события submit
        for (let fieldName in formConfig.fields) {
            // Текущее поле
            const field = formConfig.fields[fieldName]

            // Если в поле есть подписка на событие изменения Состояния формы
            if (field.submit) {

                // Объект передаваемый в функцию запускаемую после обновления Состояния формы
                const formDetails: FHTypes.FormDetails = {
                    // Данные по всем полям без лишних сведений
                    formState: getNickFormState(formState),
                    // Метод устанавливающий новое значение поля
                    setFieldValue: getSetFieldData(formState, setFormState, 'value'),
                    // Метод устанавливающий новые данные поля
                    setFieldData: getSetFieldData(formState, setFormState, 'data'),
                }

                // Запуск функции, которая должна запускаться после определённого события
                // @ts-ignore
                field.submit(formDetails)
            }
        }
    }

    // Если в formConfig у поля есть обработка определённого события...
    // @ts-ignore
    else if (formConfig.fields[fieldName][eventName]) {

        // Объект передаваемый в функцию устанавливающую данные поля
        const setDataFnArgs: FHTypes.FormDetails = {
            // Данные по всем полям без лишних сведений
            formState: getNickFormState(formState),
            // Метод устанавливающий новое значение поля
            setFieldValue: getSetFieldData(formState, setFormState, 'value'),
            // Метод устанавливающий новые данные поля
            setFieldData: getSetFieldData(formState, setFormState, 'data'),
        }

        // Запуск функции, которая должна запускаться после определённого события
        // @ts-ignore
        formConfig.fields[fieldName][eventName](setDataFnArgs)
    }

    // Поставить отсутствие события. Позже продумай нужно ли делать это действие.
    setBrowserEvent( {eventName: null, fieldName: ''} )
}



/**
 * Функция устанавливающая любые данные поля
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 * @param {String} dataType — тип устанавливаемых данных: value — значение поля, data — данные поля
 */
function getSetFieldData(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    dataType: 'value' | 'data'
) {
    return function (newData: FHTypes.FieldData, fieldName: string) {

        const field = formState.fields[fieldName]
        let newField = {}
        if (dataType === 'value') {
            newField = {...field, value: newData}
        }
        else if (dataType === 'data') {
            newField = {...field, data: newData}
        }

        const newState: FHTypes.FormState = makeImmutableObj(formState, field, newField);

        setFormState(newState)
    }
}

