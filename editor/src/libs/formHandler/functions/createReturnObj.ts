import { useCallback } from 'react'
import {
    formConfigType,
    ReturnFieldsType,
    SetFormStateType,
    StateType,
    UseFormHandlerReturnType
} from '../types'
import inputChangeHandler from './inputChangeHandler'
import errorStarter from './errorStarter'


// Думаю эту функцию нужно перенести в useFormHandler.ts
/**
 * Функция возвращает объект возращаемой хуком useFormHandler.
 * @param {Object} formState — объект Состояния хука useFormHandler.
 * @param {Function} setFormState — функция изменяющая объект Состояния
 * @param {Object} formConfig — объект настройки useFormHandler
 */
export default function createReturnObj(
    formState: StateType, setFormState: SetFormStateType, formConfig: formConfigType
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
        onChangeHandler: useCallback((e) => {
            inputChangeHandler(e, formState, setFormState)
        }, [formState]),
        onBlurHandler: useCallback((e) => {
            errorStarter(e, 'blur', formState, formConfig, setFormState)
        }, [formState]),
        onKeyDownHandler: useCallback((e) => {
            errorStarter(e, 'keyDown', formState, formConfig, setFormState)
        }, [formState]),
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
            error: formState.fields[key].error
        }
    }

    return fields
}





