import React from 'react'

export namespace OuterOnChangeHandlerType {
    export type FieldValue = string
    export type FieldValues = FieldValue[]

    export type FieldsData = {fieldName: FieldValue, fieldValue: FieldValues}

    export type FieldsHandler = (fieldData: FieldsData) => void
}
/**
 * Обработчик изменения поля ввода. Принимает объект события и другую функцию.
 * Из объекта события получает данные о значении поля ввода и затем передаёт это в функцию userOnChangeHandler
 * которая дальше с ними что-то делает
 * @param {Object} e — объект события
 * @param {Function} userOnChangeHandler — функция, в которую передаются введённые в поле данные
 */
export function fieldOnChangeHandler(
    e: React.BaseSyntheticEvent,
    userOnChangeHandler: OuterOnChangeHandlerType.FieldsHandler
) {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    userOnChangeHandler({
        fieldName, fieldValue: [fieldValue]
    })
}
