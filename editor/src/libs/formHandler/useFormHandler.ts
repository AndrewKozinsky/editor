import {useState, useCallback, useEffect} from 'react'
import getInitialState from './functions/getInitialState'
import useGetForm from './functions/useGetForm'
import useSupplementFieldData from './functions/useSupplementFieldData'
import useBrowserEvent from './functions/useBrowserEvent'
import { handleBrowserEvent } from './functions/useHandlerBrowserEvent'
import getFields from './functions/getFields'
import inputChangeHandler from './functions/inputChangeHandler'
import FHTypes from "./types"
import useStateChangeHandler from './functions/useStateChangeHandler'
import useSubmitForm from './functions/useSubmitForm'


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

    // При наступлении браузерного события в browserEvent записываются данные об этом.
    const { browserEvent, setBrowserEvent } = useBrowserEvent($form)

    // Обработка браузерного события
    useEffect(() => {
        handleBrowserEvent(browserEvent, formConfig, formState, setFormState, setBrowserEvent)
    }, [browserEvent])

    // При изменении Состояния формы у полей запускать код реагирующий на это событие
    useStateChangeHandler(formConfig, formState, setFormState)

    // Можно ли запускать отправку формы
    const setCanRunSubmitHandler = useSubmitForm(formConfig, formState, setFormState)

    return {
        // Обработчики формы
        formHandlers: {
            onKeyUp:      useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'keyup', fieldName: e.target.name})
            }, [browserEvent]),
            onFocus:     useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'focus', fieldName: e.target.name})
            }, [browserEvent]),
            onBlur:     useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'blur', fieldName: e.target.name})
            }, [browserEvent]),
            onClick:      useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'click', fieldName: e.target.name})
            }, [browserEvent]),
            onReset:      useCallback((e) => {
                setBrowserEvent({browserEvent: e, eventName: 'reset'})
            }, [browserEvent]),
            onSubmit:     useCallback((e) => {
                // Запретить стандартную отправку формы
                e.preventDefault()

                // Обработать отправку формы у полей
                setBrowserEvent({browserEvent: e, eventName: 'submit'})

                // Начать отправку формы через 10 мс.
                setTimeout(() => setCanRunSubmitHandler(true), 10)
            }, [browserEvent]),
        },
        // Обработчик изменения поля
        onChangeFieldHandler: useCallback((e) => {
            inputChangeHandler(e, formState, setFormState)
        }, [formState]),
        // Данные о полях
        fields: getFields(formState),
        form: null
    }
}

