import React from 'react'
// @ts-ignore
import * as Yup from 'yup'
import { MenuItems } from 'common/misc/Menu/Menu'
import messages from 'modules/auth/messages'
import { EditorLanguageType } from 'store/settings/settingsTypes'


/**
 * Функция возвращает массив данных для генерации меню выше формы
 * @param {String} lang — язык интерфейса
 */
export function getMenuItems(lang: EditorLanguageType): MenuItems {
    return [
        { to: '/reg', label: messages.menu.reg[lang] },
        { to: '/enter', label: messages.menu.enter[lang] },
        { to: '/reset-password', label: messages.menu.reset[lang] }
    ]
}


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

