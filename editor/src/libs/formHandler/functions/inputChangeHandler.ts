import React from 'react'
import FHTypes from '../types'
import makeImmutableObj from 'src/libs/makeImmutableCopy/makeImmutableCopy'

/**
 * Обработчик изменения поля формы
 * @param {Object} e — объект события
 * @param {Object} formState — Состояние формы
 * @param {Function} setFormState — функция изменяющая Состояние формы
 */
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

    // Получения и установка нового Состояния формы
    let newState: FHTypes.FormState = makeImmutableObj(formState, inputData.value, newValue);
    setFormState(newState)
}

/**
 * Функция получает новое значение поля и в зависимости от типа поля возвращает новый массив значений поля
 * @param {Object} inputData — данные поля
 * @param {String} newValue — новое значение поля
 */
function getNewValue(inputData: FHTypes.FieldStateObj, newValue: string) {

    if (inputData.valueCount === 'zero') {
        return ['']
    }
    else if (inputData.valueCount === 'one') {
        return [newValue]
    }
    else {
        const isPassedValueExists = !!(inputData.value.find(val => val === newValue))

        let valuesNewArr = [...inputData.value]
        if (isPassedValueExists) {
            valuesNewArr = valuesNewArr.filter(val => val !== newValue)
        } else {
            valuesNewArr.push(newValue)
        }

        return valuesNewArr
    }
}
