import FHTypes from '../types'
import {useEffect, useState} from 'react';
import {getFormDetails} from './useHandlerBrowserEvent'


export default function useStateChangeHandler(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
) {
    // Можно ли запускать обработчик изменения объекта состояния
    const [canRunStateChangeHandler, setCanRunStateChangeHandler] = useState(true)

    // При изменении Состояния формы
    useEffect(() => {
        // Ничего не делать если нельзя запустить обработчик изменения объекта состояния
        if (!canRunStateChangeHandler) return

        // Запретить вызов обработчика изменения Состояния чтобы не получилось циклического изменения состояния
        setCanRunStateChangeHandler(false)
        // Позволить вызов обработчика изменения Состояния через небольшое время
        setTimeout(() => {setCanRunStateChangeHandler(true)}, 50)

        // Запустить функции обрабатывающие событие stateChange, описанные в полях
        stateChangeHandler(formConfig, formState, setFormState, setCanRunStateChangeHandler)
    }, [formState])
}

/**
 * Функция запускаемая при изменении Состояния формы
 * @param {Object} formConfig — объект конфигурации
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция устанавливающая новое состояние формы
 * @param {Function} setCanRunStateChangeHandler — функция устанавливающая можно ли запускать обработчик изменения Состояния
 */
function stateChangeHandler(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
    setCanRunStateChangeHandler: (arg: boolean) => void
) {
    // Перебрать поля объекта Состояния
    for (let fieldName in formConfig.fields) {
        // Текущее поле
        const field = formConfig.fields[fieldName]

        // Если в поле есть подписка на событие изменения Состояния формы
        if (field.statechange) {

            // Объект передаваемый в функцию запускаемую после обновления Состояния формы
            const formDetails = getFormDetails(null, formState, setFormState)
            // Запуск функции, которая должна запускаться после обновления Состояния формы
            field.statechange(formDetails)
        }
    }
}
