import React from 'react'
// @ts-ignore
import * as Yup from 'yup'
import messages from '../../messages'


export type formValuesType = {
    email: string
    password: string
    heroes: string,
    numberOfGuests: number,
    color: string
}

// Начальные значения
export const initialValues: formValuesType = {
    email: '',
    password: '',
    heroes: '',
    numberOfGuests: 1,
    color: ''
}

// Проверка формы
export function validateForm(lang: 'eng' | 'rus') {
    /*return Yup.object({
        email: Yup.string()
            .email(messages.enterForm.emailErrInvalid[lang])
            .required(messages.enterForm.emailErrRequired[lang]),
        password: Yup.string()
            // .min(6, messages.enterForm.passwordErrToShort[lang])
            // .max(15, messages.enterForm.passwordErrToLong[lang])
            .required(messages.enterForm.passwordErrRequired[lang])
    })*/

    return Yup.object({})
}

export function onFormSubmit(values: formValuesType, actions: any) {
    // console.log(66555)
    console.log(values)
    // console.log(actions)
    // console.log({values, actions});
    // alert(JSON.stringify(values, null, 2));
    // actions.setSubmitting(false);
}