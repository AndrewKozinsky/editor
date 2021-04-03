import React, { FormEvent } from 'react'


// ОБЪЕКТ КОНФИГУРАЦИИ ------------------------------------------
// Тип объекта конфигурации useFormHandler передаваемый пользователем
export type formConfigType = {
    // Объект с данными по полям
    fields: {
        // Имя поля. Например email
        [key: string]: {
            // Изначальное значение поля. Например: ['andkozinsky@gmail.com']
            initialValue?: ValueType,
            // Тут нужно сделать точные перечисления имеющихся событий с вопросительным знаком.
            check?: {
                [key: string]: (formDetails: FormDetailsToCheckFnType) => void
            } | null
        }
    }
}




// СОСТОЯНИЕ useFormHandler -------------------------------------

export type StateType = {
    // Объект с данными по полям
    fields: FieldsObjType
}
/*let stateExample = {
    // Пример объекта Состояния
    fields: {
        // Поле с именем email
        email: {
            fieldType: 'text',
            valueType: 'one',
            value: ['andkozinsky@gmail.com'],
            error: 'Поле не заполнено'
        }
    }
}*/

export type FieldsObjType = {
    // Имя поля. Например email
    [key: string]: FieldObjType
}

export type FieldObjType = {
    // Тип поля: text, select, checkbox, radio
    fieldType: FieldTypeType
    // Сколько значений может быть у поля: one (одно) или many (несколько). Это зависит от типа поля.
    valueCount: ValueCountType
    // Значение поля если это текстовое поле или null если другой тип
    value: ValueType
    error?: FieldErrorType
}


// Тип поля
export type FieldTypeType = 'text' | 'select' | 'checkbox' | 'radio'
// Сколько значений может быть у поля: одно или несколько
export type ValueCountType = 'one' | 'many'
// Значение поля
export type ValueType = string[]



// ВОЗВРАЩАЕМЫЙ ОБЪЕКТ useFormHandler ---------------------------
// Объект возвращаемый useFormHandler
export type UseFormHandlerReturnType = {
    // Значения полей (обновляемые)
    fields: ReturnFieldsType,
    onChangeHandler: (e: React.BaseSyntheticEvent) => void,
    onBlurHandler: (e: React.BaseSyntheticEvent) => void,
    onKeyDownHandler: (e: React.BaseSyntheticEvent) => void,
}

// Объект полей возвращаемый useFormHandler
export type ReturnFieldsType = {
    [key: string]: {
        value: ValueType
        error: FieldErrorType
    }
}

// Объект с деталями формы передаваемый в обработчик ошибок
export type FormDetailsToCheckFnType = {
    // Значение текущего поля
    fieldValue: ValueType
    setError: SetErrorFnType
}

// ПРОЧИЕ ТИПЫ --------------------------------------------------
// Установщик Состояния useFormHandler
export type SetFormStateType = (formState: StateType) => void
// Функция устанавливающая объект ошибки поля
export type SetErrorFnType = (err: FieldErrorType) => void
// Объект ошибки поля
export type FieldErrorType = any