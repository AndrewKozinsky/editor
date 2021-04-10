import React from 'react'

// Типы FormHandler
namespace FHTypes {

    // ОБЪЕКТ КОНФИГУРАЦИИ ------------------------------------------
    // Тип объекта конфигурации useFormHandler передаваемый пользователем
    export type FormConfig = {
        // Объект с данными по полям
        fields: {
            // Имя поля. Например email
            [key: string]: {
                // Изначальное значение поля. Например: ['andkozinsky@gmail.com'].
                initialValue?: FieldValue,
                // Изначальные данные поля. Например { error: null }
                initialData?: AnyData
                // Обработчики браузерных событий
                change?: ConfigFieldEventHandler
                keydown?: ConfigFieldEventHandler
                keypress?: ConfigFieldEventHandler
                keyup?: ConfigFieldEventHandler
                focus?: ConfigFieldEventHandler
                blur?: ConfigFieldEventHandler
                click?: ConfigFieldEventHandler
                mouseenter?: ConfigFieldEventHandler
                mouseleave?: ConfigFieldEventHandler
                reset?: ConfigFieldEventHandler
                submit?: ConfigFieldEventHandler
                // Обработчик изменения Состояния формы
                statechange?: ConfigFieldEventHandler
            }
        },
        form: {
            // При изменении Состояния формы будет запускаться функция описанная в свойстве stateChange
            stateChange?: ConfigEventHandler
            // Пользовательская функция запускаемая при сбросе формы
            reset?: ConfigEventHandler
            // Пользовательская функция запускаемая при отправке формы когда все поля верные
            submit: ConfigEventHandler
        }
    }
    // Обработчик события поля
    type ConfigFieldEventHandler = (formDetails: FormDetailsInEventHandler) => Promise<void>
    // Обработчик события формы
    type ConfigEventHandler = (formDetails: FormDetailsInSubmitHandler) => void

    // Объект передаваемый в обработчик возникновения события поля и формы
    export type FormDetailsInEventHandler = {
        // Объект события браузера
        browserEvent: null | React.BaseSyntheticEvent,
        // Состояние формы.
        state: FormState
        // Функция изменяющая значение поля с заданным именем.
        setFieldValue: SetFieldValue
        // Функция изменяющая данные поля с заданным именем.
        setFieldData: SetFieldData
        // Функция изменяющая данные формы.
        setFormData: SetFormData
        // Функция сбрасывающая данные всех полей на значения по умолчанию.
        // resetForm: () => void
    }

    // Функция изменяющая значение поля
    export type SetFieldValue = (
        fieldValue: FieldValue,
        fieldName: string
    ) => void
    // Функция изменяющая данные поля
    export type SetFieldData = (
        fieldData: AnyData,
        fieldName: string
    ) => void
    // Функция изменяющая данные формы
    export type SetFormData = (
        formData: AnyData,
    ) => void

    // Значение поля
    export type FieldValue = string[]
    // Тип данных поля
    export type AnyData = any

    // Объект передаваемый в пользовательский обработчик отправки формы
    export type FormDetailsInSubmitHandler = {
        // Состояние формы.
        state: FormState
        // Функция изменяющая значение поля с заданным именем.
        setFieldValue: SetFieldValue
        // Функция устанавливающий новые данные поля
        setFieldData: SetFieldData
        // Функция изменяющая данные формы.
        setFormData: SetFormData
        // Значения полей для отправки на сервер
        readyFieldValues: ReadyFieldsValues
        // Функция сбрасывающая данные всех полей на значения по умолчанию.
        // resetForm: () => void
    }
    // Значения полей для отправки на сервер
    export type ReadyFieldsValues = {
        // Имя поля. Например email
        [key: string]: string | string[]
    }


    // СОСТОЯНИЕ useFormHandler -------------------------------------
    export type FormState = {
        // Объект с данными по полям
        fields: FieldsStateObj
        form: FormStateObj
    }
    export type FieldsStateObj = {
        // Имя поля. Например email
        [key: string]: FieldStateObj
    }
    export type FieldStateObj = {
        // Ссылка на элемент поля.
        $field?: HTMLInputElement,
        // Значение поля.
        value: FieldValue
        // Тип поля: text, select, checkbox, radio
        fieldType: FieldType
        // Сколько значений может быть у поля: zero (ни одного (если это кнопка)), one (одно) или many (несколько). Это зависит от типа поля.
        valueCount: ValueCount
        // Любые данные поля.
        data: AnyData
    }

    // Тип поля
    export type FieldType = 'text' | 'select' | 'checkbox' | 'radio' | 'button'
    // Сколько значений может быть у поля: нисколько (кнопка), одно или несколько
    export type ValueCount = 'zero' | 'one' | 'many'

    export type FormStateObj = {
        // Ссылка на элемент формы.
        $form?: $form
        // Данные формы заполняемые пользователем
        data: AnyData
    }



    // ОБЪЕКТ ВОЗВРАЩАЕМЫЙ ХУКОМ useFormHandler ---------------------------
    // Объект возвращаемый useFormHandler
    export type ReturnObj = {
        // Обработчики добавляемые на <form>
        formHandlers: {
            onKeyUp:      BrowserEventHandler
            onFocus:      BrowserEventHandler
            onBlur:       BrowserEventHandler
            onClick:      BrowserEventHandler
            onReset:      BrowserEventHandler
            onSubmit:     BrowserEventHandler
        },
        // Обработчик изменения поля добавляемый каждому полю
        onChangeFieldHandler: BrowserEventHandler
        fields: ReturnFieldsObj,
        // Любые данные касаемые формы.
        form: AnyData
    }
    export type ReturnFieldsObj = {
        // Имя поля. Например email
        [key: string]: {
            // Значение поля.
            value: FieldValue
            data: AnyData
        }
    }
    // Функция-обработчик браузерного события
    export type BrowserEventHandler = (e: React.BaseSyntheticEvent) => void


    // ПРОЧИЕ ТИПЫ --------------------------------------------------
    // Установщик Состояния useFormHandler
    export type SetFormState = (formState: FormState) => void
    // Элемент формы
    export type $form = HTMLFormElement
    // События формы, которые разрешено использовать
    export type FormEventsNames = 'keyup' | 'focus' | 'blur' | 'click' | 'reset' | 'submit'
    // Состояние объекта браузерного события
    export type BrowserEventState = {
        browserEvent: null | React.BaseSyntheticEvent,
        eventName: null | FormEventsNames,
        fieldName?: null | string
    }
    // Функция ставящая новые данные браузерного события
    export type SetBrowserEvent = (arg: BrowserEventState) => void
}

export default FHTypes
