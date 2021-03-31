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
        }
    }
}



// СОСТОЯНИЕ useFormHandler -------------------------------------

export type StateType = {
    // Объект с данными по полям
    fields: FieldsObjType
}
/*{
    // Пример объекта Состояния
    fields: {
        // Поле с именем email
        email: {
            fieldType: 'text',
            valueType: 'one',
            value: ['andkozinsky@gmail.com']
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
}


// Тип поля
export type FieldTypeType = 'text' | 'select' | 'checkbox' | 'radio'
// Сколько значений может быть у поля: одно или несколько
export type ValueCountType = 'one' | 'many'
// Значение поля
export type ValueType = string[]



// ВОЗВРАЩАЕМЫЙ ОБЪЕКТ useFormHandler ---------------------------

export type UseFormHandlerReturnType = {
    // Значения полей (обновляемые)
    fields: ReturnFieldsType,
    changeHandler: (e: React.FormEvent<HTMLSelectElement>) => void,
}

export type ReturnFieldsType = {
    [key: string]: {
        value: ValueType
    }
}


// ПРОЧИЕ ТИПЫ --------------------------------------------------
export type SetFormStateType = (formState: StateType) => void