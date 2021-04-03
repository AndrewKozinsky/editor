import React, {useState, useCallback, useEffect} from 'react'
import getInitialState from './body-func/getInitialState'
import useGetForm from './body-func/useGetForm'
import useSupplementFieldData from './body-func/useSupplementFieldData'
import useBrowserEvent from './body-func/useBrowserEvent'
import useHandleBrowserEvent from './body-func/useHandleBrowserEvent'
import getFields from './return-func/getFields'
import inputChangeHandler from './return-func/inputChangeHandler'
import FHTypes from "./types"
import stateChangeHandler from './body-func/stateChangeHandler'


/**
 * Хук обрабатывающий формы. Возвращает объект со свойствами и методами для получения и установки данных в форму.
 * @param {Object} formConfig — объект настройки useFormHandler
 * @param {String} formName — имя формы
 */
export default function useFormHandler(formConfig: FHTypes.FormConfig, formName: string): FHTypes.ReturnObj {

    // Состояние формы
    const [formState, setFormState] = useState<FHTypes.FormState>(getInitialState(formConfig))

    // Ссылка на форму
    const $form = useGetForm(formName)

    // Уточнение данных о полях при получении ссылки на форму
    useSupplementFieldData(formState, setFormState, $form)

    // Данные о браузерном событии
    const {browserEvent, setBrowserEvent} = useBrowserEvent()

    // При изменении объекта браузерного события
    useEffect(() => {
        // Обработка браузерного события
        useHandleBrowserEvent(browserEvent, formConfig, formState, setFormState)
    }, [browserEvent])

    // Можно ли запускать обработчик изменения объекта состояния
    const [canRunStateChangeHandler, setCanRunStateChangeHandler] = useState(true)

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
                setBrowserEvent(e, 'change')
            }, [browserEvent]),
            onBlur: useCallback((e: React.BaseSyntheticEvent) => {
                setBrowserEvent(e, 'blur')
            }, [browserEvent]),
        }
    }
}

