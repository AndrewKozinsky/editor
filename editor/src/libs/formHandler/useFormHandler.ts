import React, {useState, useCallback, useEffect} from 'react'
import getInitialState from './body-func/getInitialState'
import useGetForm from './body-func/useGetForm'
import useSupplementFieldData from './body-func/useSupplementFieldData'
import useBrowserEvent from './body-func/useBrowserEvent'
import useHandlerBrowserEvent from './body-func/useHandlerBrowserEvent'
import getFields from './return-func/getFields'
import inputChangeHandler from './return-func/inputChangeHandler'
import FHTypes from "./types"
import stateChangeHandler from './body-func/stateChangeHandler'
import useSubmitForm from './return-func/useSubmitForm'


/**
 * Хук обрабатывающий формы. Возвращает объект со свойствами и методами для получения и установки данных в форму.
 * @param {Object} formConfig — объект настройки useFormHandler
 * @param {String} formName — имя формы
 */
export default function useFormHandler(formConfig: FHTypes.FormConfig, formName: string): FHTypes.ReturnObj {

    // Состояние формы
    const [formState, setFormState] = useState<FHTypes.FormState>(getInitialState(formConfig))

    // Можно ли запускать обработчик изменения объекта состояния
    const [canRunStateChangeHandler, setCanRunStateChangeHandler] = useState(true)

    // Можно ли запускать отправку формы
    const setCanRunSubmitHandler = useSubmitForm(formConfig, formState)

    // Ссылка на форму
    const $form = useGetForm(formName)

    // Уточнение данных о полях при получении ссылки на форму
    useSupplementFieldData(formState, setFormState, $form)

    // Данные о браузерном событии
    const {browserEvent, setBrowserEvent} = useBrowserEvent()

    // При изменении объекта браузерного события
    useEffect(() => {
        // Обработка браузерного события
        useHandlerBrowserEvent(browserEvent, formConfig, formState, setFormState, setBrowserEvent)
    }, [browserEvent])



    // При изменении объекта Состояния формы
    useEffect(() => {
        // Ничего не делать если нельзя запустить обработчик изменения объекта состояния
        if (!canRunStateChangeHandler) return

        // Запустить функции обрабатывающие событие stateChange, описанные в полях
        stateChangeHandler(formConfig, formState, setFormState, setCanRunStateChangeHandler)
    }, [formState])


    return {
        // Данные о полях
        fields: getFields(formState),

        // Обработчик изменения поля
        onChangeFieldHandler: useCallback((e) => {
            inputChangeHandler(e, formState, setFormState)
        }, [formState]),

        // Установка данных о последнем событии при его наступлении
        formHandlers: {
            onChange: useCallback((e: React.BaseSyntheticEvent) => {
                setBrowserEvent({eventName: 'change', fieldName: e.target.name})
            }, [browserEvent]),
            onBlur: useCallback((e: React.BaseSyntheticEvent) => {
                setBrowserEvent({eventName: 'blur', fieldName: e.target.name})
            }, [browserEvent]),
            onSubmit: useCallback((e: React.BaseSyntheticEvent) => {
                // Запретить стандартную отправку формы
                e.preventDefault()

                // Проверить поля, которые нужно проверять при отправке
                setBrowserEvent({eventName: 'submit', fieldName: e.target.name})

                // Поставить что можно начинать процедуру отправки формы
                setTimeout(() => setCanRunSubmitHandler(true), 0)

            }, [browserEvent]),
        }
    }
}

