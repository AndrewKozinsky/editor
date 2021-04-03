import React from 'react'
import makeImmutableObj from '../../makeImmutableCopy/makeImmutableCopy'
import {FieldErrorType, formConfigType, FormDetailsToCheckFnType, SetFormStateType, StateType, ValueType} from '../types'

// Может функцию назвать errorCather или errorHandler.
// Или eventHandler потому что тут можно не только управлять ошибками, но и выполнять код
// делающий любые действия с полями после любых событий.
export default function errorStarter(
    e: React.BaseSyntheticEvent,
    eventType: 'blur' | 'keyDown', // Это нужно сделать отдельным типом
    formState: StateType,
    formConfig: formConfigType,
    setFormState: SetFormStateType
) {
    // Имя поля где случилось событие
    const fieldName = e.target.name

    // Значение текущего поля
    const fieldValue = formState.fields[fieldName].value

    // Запуск функции обработчика ошибок события
    if (formConfig.fields[fieldName].check && formConfig.fields[fieldName].check[eventType]) {
        // Объект передаваемый в обработчик ошибок
        const checkFnArgs: FormDetailsToCheckFnType = {
            // Значение текущего поля
            fieldValue,
            // Функция устанавливающая объект ошибки
            setError: setError(formState, fieldName, setFormState)
        }

        formConfig.fields[fieldName].check[eventType](checkFnArgs)
    }
}


function setError(formState: StateType, fieldName: string, setFormState: SetFormStateType) {
    // СЧИТАЮ ЭТУ ФУНКЦИЮ МОЖНО СДЕЛАТЬ УНИВЕРСАЛЬНОЙ ЧТОБЫ МОЖНО БЫЛО УСТАНАВЛИВАТЬ ОШИБКИ ДЛЯ ЛЮБЫХ ПОЛЕЙ
    // ДЛЯ ЭТОГО НУЖНО ДОБАВИТЬ ВТОРОЙ АРГУМЕНТ fieldName. ЕСЛИ ОН НЕ ПЕРЕДАН, ТО ОШИБКА УСТАНАВЛИВАЕТСЯ НА ПОЛЕ, ГДЕ ВОЗНИКЛО СОБЫТИЕ.
    // ЕСЛИ ПЕРЕДАН, ТО В ПОЛЕ С ТАКИМ ЖЕ ИМЕНЕМ.
    return function (newError: FieldErrorType) {

        const field = {...formState.fields[fieldName]}
        const newField = {...field, error: newError}
        // @ts-ignore
        const newState: StateType = makeImmutableObj(formState, field, newField);

        setFormState(newState)
    }
}