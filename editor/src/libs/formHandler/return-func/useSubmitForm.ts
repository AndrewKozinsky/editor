import React, {useEffect, useState} from 'react'
import FHTypes from '../types'
import getNickFormState from './getNickFormState';

/**
 * Обработчик отправки формы
 * @param formConfig
 * @param formState
 */
export default function useSubmitForm(
    formConfig: FHTypes.FormConfig,
    formState: FHTypes.FormState
) {
    // Можно ли запустить обработку отправки формы?
    const [canRunSubmitHandler, setCanRunSubmitHandler] = useState(false)

    useEffect(function () {
        if (!canRunSubmitHandler) return
        // Запретить отправку формы
        setCanRunSubmitHandler(false)

        // Подготовить сокращённый объект Состояния формы без служебных данных
        const nickFormState = getNickFormState(formState)

        // Завершить функцию если в форме есть ошибки
        if( !isFormCorrect(formConfig, nickFormState) ) return

        // Подготовить объект значений полей
        const fieldsValues = getFieldsValues(formState)

        // Подготовить объект для передачи в пользовательскую функцию отправки формы
        const formDetails = {
            fieldsValues
        }

        // Запустить пользовательскую функцию отправки формы
        if (formConfig.submitForm) {
            formConfig.submitForm(formDetails)
        }
    }, [canRunSubmitHandler])

    return setCanRunSubmitHandler
}

/**
 * Функция проверяет правильность формы
 * @param formConfig
 * @param nickFormState
 */
function isFormCorrect(formConfig: FHTypes.FormConfig, nickFormState: FHTypes.NickFormState) {
    let isCorrect = true

    // Если пользователь указал функцию проверки формы, то проверить с помощью неё
    if (formConfig.checkForm) {
        isCorrect = formConfig.checkForm(nickFormState)
    }
    // Если не указал, то проверить стандартной функцией
    else {
        for (let key in nickFormState) {
            if (nickFormState[key].data) isCorrect = false
        }
    }

    return isCorrect
}


/**
 * Функция подготавливает объект со значениями полей для отправки на сервер
 * @param {Object} formState — Состояние формы
 */
function getFieldsValues(formState: FHTypes.FormState): FHTypes.FieldsValuesSubmitObj {
    let fieldsValuesSubmitObj: FHTypes.FieldsValuesSubmitObj = {}

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
