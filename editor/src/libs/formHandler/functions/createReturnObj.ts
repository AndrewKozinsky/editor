import { useCallback } from 'react'
import {
    ReturnFieldsType,
    SetFormStateType,
    StateType,
    UseFormHandlerReturnType
} from '../types'
import inputChangeHandler from './inputChangeHandler'


export default function createReturnObj(
    formState: StateType, setFormState: SetFormStateType
): UseFormHandlerReturnType {

    // Функция возращает объект вида:
    /*{
        fields: {
            email: {
                value: 'andkozinsky@gmail.com'
            },
            dishes: {
                checkedValues: ['jam', 'pancakes']
            }
        },
        changeHandler: (e) => {}
    }*/
    return {
        fields: getFields(formState),
        // Обработчик изменения значения полей
        changeHandler: useCallback((e) => inputChangeHandler(e, formState, setFormState), [formState])
    }
}


function getFields(formState: StateType): ReturnFieldsType {
    // Функция возращает объект такого вида:
    /*{
        email: {
            value: ['andkozinsky@gmail.com']
        },
        dishes: {
            value: ['jam', 'pancakes']
        }
    }*/

    const fields: ReturnFieldsType = {}

    for(let key in formState.fields) {
        fields[key] = {
            value: formState.fields[key].value,
        }
    }

    return fields
}





