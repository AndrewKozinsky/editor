import {useEffect, useState} from 'react'
import FHTypes from '../types'
import {getSetFieldData, getSetFieldValue, getSetFormData} from './formStateSettersAndGetters';

/**
 * Обработчик отправки формы
 * @param formConfig
 * @param formState
 * @param setFormState
 */
export default function useSubmitForm(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState
) {
    // Можно ли запустить обработку отправки формы?
    const [canRunSubmitHandler, setCanRunSubmitHandler] = useState(false)

    // При изменения значения можно ли запускать отправку формы
    useEffect(function () {
        if (!canRunSubmitHandler) return

        // Запретить отправку формы
        setCanRunSubmitHandler(false)

        // Объект передаваемый в обработчик отправки формы
        const formDetails = getFormDetails(formState, setFormState)

        // Запустить пользовательскую функцию отправки формы
        formConfig.form.submit(formDetails)
    }, [canRunSubmitHandler])

    return setCanRunSubmitHandler
}


export function getFormDetails(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
): FHTypes.FormDetailsInSubmitHandler {
    return {
        // Состояние формы.
        state: formState,
        // Функция устанавливающая новое значение поля
        setFieldValue: getSetFieldValue(formState, setFormState),
        // Функция устанавливающая новые данные поля
        setFieldData: getSetFieldData(formState, setFormState),
        // Функция изменяющая данные формы.
        setFormData: getSetFormData(formState, setFormState),
        // Значения полей для отправки на сервер
        readyFieldValues: getReadyFieldsValues(formState)
        // Функция сбрасывающая данные всех полей на значения по умолчанию.
        // resetForm: () => void
    }
}



/**
 * Функция подготавливает объект со значениями полей для отправки на сервер
 * @param {Object} formState — Состояние формы
 */
function getReadyFieldsValues(formState: FHTypes.FormState): FHTypes.ReadyFieldsValues {
    let fieldsValuesSubmitObj: FHTypes.ReadyFieldsValues = {}

    for (let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        if (field.valueCount === 'one') {
            fieldsValuesSubmitObj[fieldName] = field.value[0]
        }
        else if (field.valueCount === 'many') {
            fieldsValuesSubmitObj[fieldName] = field.value
        }
    }

    return fieldsValuesSubmitObj
}