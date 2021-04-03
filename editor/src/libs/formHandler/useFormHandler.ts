import React, { useState } from 'react'
import createReturnObj from './functions/createReturnObj'
import getInitialState from './functions/getInitialState'
import useSupplementFieldData from './functions/useSupplementFieldData'
import {formConfigType, StateType, UseFormHandlerReturnType } from './types'
import useGetForm from './functions/useGetForm'


/**
 *
 * @param {Object} formConfig — объект настройки useFormHandler
 * @param {String} formName — имя формы
 */
export default function useFormHandler(formConfig: formConfigType, formName: string): UseFormHandlerReturnType {

    const [formState, setFormState] = useState<StateType>(getInitialState(formConfig))

    // Ссылка на форму
    const $form = useGetForm(formName)

    // Дополнить данные о полях
    useSupplementFieldData(formState, setFormState, $form)
    // console.log(formState)

    return createReturnObj(formState, setFormState, formConfig)
}



