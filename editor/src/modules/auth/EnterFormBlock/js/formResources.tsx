// import React from 'react'
// @ts-ignore
// import * as Yup from 'yup'
import FHTypes from "libs/formHandler/types";


// Объект настройки useFormHandler
export const formConfig: FHTypes.FormConfig = {
    // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
    fields: {
        email: {
            initialValue: ['Привет, Москва'],
            initialData: {
                error: null
            },
            change: function (formDetails: FHTypes.FormDetails) {

            },
            submit(formDetails) {
                const fieldValue = formDetails.formState.email.value
                const setFieldData = formDetails.setFieldData

                if (fieldValue[0].length < 3) {
                    setFieldData({error:  'Too small' }, 'email')
                } else if(fieldValue[0].length < 5) {
                    setFieldData({error:  'Small'}, 'email')
                } else {
                    setFieldData({error: null}, 'email')
                }
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
        },
        submit: {
            /*stateChange: function (formDetails: FHTypes.FormDetails) {
                formDetails.setFieldData({error:  Math.round(Math.random() * 100) }, 'email')
            }*/
        }
    },
    // Пользовательская функция проверки правильности формы
    checkForm(formState) {
        let isCorrect = true

        for(let fieldName in formState) {
            if (formState[fieldName].data && formState[fieldName].data.error) {
                isCorrect = false
            }
        }

        return isCorrect
    },
    // Пользовательская функция запускаемая при отправке формы когда все поля верные
    submitForm(formDetails) {
        console.log('ОТПРАВКА')
    }
}
