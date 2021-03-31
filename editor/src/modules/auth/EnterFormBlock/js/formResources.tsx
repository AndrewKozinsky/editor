import React from 'react'
// @ts-ignore
import * as Yup from 'yup'
import { formConfigType } from 'libs/formHandler/types'


// Объект настройки useFormHandler
export const formConfig: formConfigType = {
    // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
    fields: {
        email: {
            initialValue: ['Привет, Москва']
        },
        heroes: {
            initialValue: ['Gena']
        },
        dishes: {
            initialValue: ['jam', 'pancakes']
        },
        color: {
            initialValue: ['green']
        }
    }
}
