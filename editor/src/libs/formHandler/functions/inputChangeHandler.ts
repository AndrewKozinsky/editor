import makeImmutableObj from 'libs/makeImmutableCopy/makeImmutableCopy'
import {FieldObjType, SetFormStateType, StateType} from '../types'

export default function inputChangeHandler(
    e: React.BaseSyntheticEvent, formState: StateType, setFormState: SetFormStateType
) {
    // debugger
    // const inputName = e.target.name
    const inputValue = e.target.value

    const inputData = formState.fields[e.target.name]
    const newValue = getNewValue(inputData, inputValue)

    // @ts-ignore
    let newState: StateType = makeImmutableObj(formState, inputData.value, newValue);
    setFormState(newState)
}

function getNewValue(inputData: FieldObjType, newValue: string) {
    if (inputData.fieldType === 'text' || inputData.fieldType === 'radio') {
        return [newValue]
    }
    if (inputData.fieldType === 'checkbox' || inputData.fieldType === 'select') {
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


/*
function inputChangeHandler(e: React.BaseSyntheticEvent) {
    e.preventDefault()
}*/
// FormEvent<HTMLFormElement>
// e: React.FormEvent<HTMLSelectElement>