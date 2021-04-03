import React from 'react'
// @ts-ignore
import * as Yup from 'yup'
import { formConfigType, FormDetailsToCheckFnType } from 'libs/formHandler/types'


// Объект настройки useFormHandler
export const formConfig: formConfigType = {
    // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
    fields: {
        email: {
            initialValue: ['Привет, Москва'],
            // Можно подумать над тем чтобы убрать поле check и вынести названия событий
            // наравне с initialValue.
            // И там программист будет вписывать любые сценарии, которые должны быть выполнены
            // при наступлении определёных событий. В том числе и обработка ошибок.
            // Но продумай как проверять ошибки при отправки формы
            // Так же продумай как понять, что ошибок нет и можно отправлять форму.
            check: {
                keyDown: function (formDetails: FormDetailsToCheckFnType) {
                    // В функцию должны передаваться:
                    // - объект со значениями всех полей
                    // - значение этого поля
                    // - сколько раз уже пытались отправить форму
                    // - функция установки объекта ошибки в Состояние
                    // - функция установки нового значения любого поля в Состояние
                    console.log(344)
                },
                blur: null,
                submit: null,
            }
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
