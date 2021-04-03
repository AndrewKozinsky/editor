// import React from 'react'
import FHTypes from '../types'
import makeImmutableObj from 'src/libs/makeImmutableCopy/makeImmutableCopy'


export default function inputChangeHandler(
    e: React.BaseSyntheticEvent,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Значение поля
    const inputValue = e.target.value

    // Данные поля из Состояния
    const inputData = formState.fields[e.target.name]

    // Получение нового значения поля
    const newValue = getNewValue(inputData, inputValue)

    // Получения объекта нового Состояния формы
    // @ts-ignore
    let newState: FHTypes.FormState = makeImmutableObj(formState, inputData.value, newValue);
    // Установка объекта нового Состояния формы
    setFormState(newState)
}

/**
 * Функция получает новое значение поля и в зависимости от типа поля
 * @param inputData
 * @param newValue
 */
function getNewValue(inputData: FHTypes.FieldObj, newValue: string) {
    if (inputData.valueCount === 'zero') {
        return ['']
    }
    else if (inputData.valueCount === 'one') {
        return [newValue]
    }
    else {
        const isPassedValueExists = inputData.value.find(val => val === newValue)

        let valuesNewArr = [...inputData.value]
        if (isPassedValueExists) {
            valuesNewArr = valuesNewArr.filter(val => val !== newValue)
        } else {
            valuesNewArr.push(newValue)
        }

        return valuesNewArr
    }
}
