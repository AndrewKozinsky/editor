import React from 'react'
// @ts-ignore
import * as Yup from 'yup'
import { EditorLanguageType } from 'store/settings/settingsTypes'
import { formConfigType } from 'libs/formHandler/types'


export const formConfig: formConfigType = {
    fields: {
        email: {
            initialValue: 'Привет, Москва'
        },
        password: {

        },
        heroes: {
            checkedValues: ['Gena']
        },
        dishes: {
            checkedValues: ['jam']
        },
        color: {
            checkedValues: ['red', 'blue']
        }
    }
}