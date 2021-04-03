import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import {FieldObjType, SetFormStateType, StateType} from '../types'

export default function inputChangeHandler(
    e: React.BaseSyntheticEvent, formState: StateType, setFormState: SetFormStateType
) {
    // Значение поля
    const inputValue = e.target.value

    // Данные поля из Состояния
    const inputData = formState.fields[e.target.name]
    // Получение нового значения поля
    const newValue = getNewValue(inputData, inputValue)

    // @ts-ignore
    let newState: StateType = makeImmutableObj(formState, inputData.value, newValue);
    setFormState(newState)
}

function getNewValue(inputData: FieldObjType, newValue: string) {
    if (
        inputData.fieldType === 'text' ||
        inputData.fieldType === 'radio' ||
        inputData.fieldType === 'select' && inputData.valueCount === 'one'
    ) {
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