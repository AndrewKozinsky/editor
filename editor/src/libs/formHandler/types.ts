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
                // Для кнопки это передавать не нужно.
                initialValue?: FieldValue,
                // Изначальные данные поля. Например { error: null }
                initialData?: FieldData
                // Обработчики браузерных событий
                change?: ((formDetails: FormDetails) => void)
                blur?: ((formDetails: FormDetails) => void)
                submit?: ((formDetails: FormDetails) => void)
                // Обработчик события изменения Состояния формы
                stateChange?: ((formDetails: FormDetails) => void)
            }
        }
        // Пользовательская функция проверки правильности формы
        checkForm(formState: NickFormState): boolean
        // Пользовательская функция запускаемая при отправке формы когда все поля верные
        submitForm(formDetails: SubmitFormDetails): void
    }



    // СОСТОЯНИЕ useFormHandler -------------------------------------
    export type FormState = {
        // Объект с данными по полям
        fields: FieldsObj
    }
    export type FieldsObj = {
        // Имя поля. Например email
        [key: string]: FieldObj
    }
    export type FieldObj = {
        // Значение поля
        value: FieldValue
        // Тип поля: text, select, checkbox, radio
        fieldType: FieldType
        // Сколько значений может быть у поля: one (одно) или many (несколько). Это зависит от типа поля.
        valueCount: ValueCount
        data?: FieldData
    }
    // Значение поля
    export type FieldValue = string[]
    // Тип данных поля
    export type FieldData = any
    // Тип поля
    export type FieldType = 'text' | 'select' | 'checkbox' | 'radio' | 'button'
    // Сколько значений может быть у поля: нисколько (кнопка), одно или несколько
    export type ValueCount = 'zero' | 'one' | 'many'




    // ОБЪЕКТ ВОЗВРАЩАЕМЫЙ ХУКОМ useFormHandler ---------------------------
    // Объект возвращаемый useFormHandler
    export type ReturnObj = {
        // Значения полей (обновляемые)
        fields: ReturnFields,
        onChangeFieldHandler: (e: React.BaseSyntheticEvent) => void,
        formHandlers: {
            onChange: (e: React.BaseSyntheticEvent) => void,
            onBlur:   (e: React.BaseSyntheticEvent) => void,
            onSubmit: (e: React.BaseSyntheticEvent) => void,
        }
    }

    // Объект полей возвращаемый useFormHandler
    export type ReturnFields = {
        [key: string]: {
            value: FieldValue
            data: FieldData
        }
    }

    // Объект с деталями формы для манипулирования полями формы
    export type FormDetails = {
        // Состояние формы
        formState: NickFormState
        // Функция устанавливающая значение поля
        setFieldValue: ChangeFieldStateFn,
        // Функция устанавливающая данные в поле
        setFieldData: ChangeFieldStateFn
    }
    // Объект с данными о полях без служебных свойств
    export type NickFormState = {
        [key: string]: {
            value: FieldValue,
            data: FieldData
        }
    }
    // Функция изменяющая состояние поля: значение или данные
    export type ChangeFieldStateFn = (
        newData: FHTypes.FieldValue | FHTypes.FieldData,
        fieldName: string
    ) => void



    // ОТПРАВКА ФОРМЫ ------------------------------------------------
    // Объект со значениями полей для отправки
    export type FieldsValuesSubmitObj = {
        [key: string]: string | string[]
    }
    // Первый аргумент передаваемый в пользовательскую функцию
    // запускаемая при отправке формы когда все поля верные
    export type SubmitFormDetails = {
        fieldsValues: FieldsValuesSubmitObj
    }



    // ПРОЧИЕ ТИПЫ --------------------------------------------------
    // Установщик Состояния useFormHandler
    export type SetFormState = (formState: FormState) => void
    // Элемент формы
    export type $form = null | HTMLFormElement
    // События формы, которые разрешено использовать
    export type FormEventsNames = 'change' | 'blur' | 'submit'
    // Состояние объекта браузерного события
    export type BrowserEventState = {
        eventName: null | FormEventsNames,
        fieldName: string
    }
    // Функция ставящая новое значение константы canRunStateChangeHandler
    export type SetCanRunStateChangeHandler = (arg: boolean) => void
    export type SetBrowserEvent = (arg: BrowserEventState) => void
}

export default FHTypes
