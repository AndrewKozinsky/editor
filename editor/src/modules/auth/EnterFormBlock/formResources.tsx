import React from 'react'
// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'src/libs/formHandler/types'
import {isFormValid, setErrorToFieldData } from 'utils/FormHandlerUtils'
import messages from '../messages'
import { EditorLanguageType } from 'store/settings/settingsTypes'


// Объект настройки useFormHandler
export default function getFormConfig(lang: EditorLanguageType): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            email: {
                initialValue: [''],
                initialData: {
                    error: null
                },
                blur(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        // checkEmail(formDetails, lang)
                    }
                },
                submit(formDetails) {
                    checkEmail(formDetails, lang)
                },
            },
            password: {
                initialValue: [''],
                initialData: {
                    error: null
                },
                blur(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        // checkPassword(formDetails, lang)
                    }
                },
                submit(formDetails) {
                    checkPassword(formDetails, lang)
                },
            },
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0
            },
            /*stateChange: function (formDetails) {
                // formDetails.setFieldData({error:  Math.round(Math.random() * 100) }, 'email')
            },*/
            // Пользовательская функция запускаемая при отправке формы
            submit(formDetails) {
                // Данные формы
                const formData = formDetails.state.form.data

                // Увеличить счётчик попыток отправки формы
                formDetails.setFormData({
                    ...formData,
                    submitCounter: formData.submitCounter + 1
                })

                // Ничего не делать если поля формы заполнены неверно
                if(!isFormValid(formDetails.state)) return

                console.log('ОТПРАВКА')
            }
        }
    }
}


/**
 * Функция проверяющая поле email
 * @param {Object} formDetails — объект передаваемый в функцию устанавливающую данные поля
 * @param {String} lang — язык интерфейса
 */
function checkEmail(formDetails: FHTypes.FormDetailsInEventHandler, lang: EditorLanguageType) {
    const fieldValue = formDetails.state.fields['email'].value[0]

    let schema = yup.object({
        email: yup.string()
            .required(messages.enterForm.emailErrRequired[lang])
            .email(messages.enterForm.emailErrInvalid[lang])
    });

    schema.validate({email: fieldValue})
        // Поставить в данные поля что ошибки нет
        .then(() => setErrorToFieldData(formDetails, 'email', null))
        // Поставить в данные поля текст ошибки
        .catch((err: Error) => setErrorToFieldData(formDetails, 'email', err.message))

    // УДАЛИТЬ!!!
    /*setTimeout(() => {
        setErrorToFieldData(formDetails, 'email', 'err.message')
    })*/

}

/**
 * Функция проверяющая поле password
 * @param {Object} formDetails — объект передаваемый в функцию устанавливающую данные поля
 * @param {String} lang — язык интерфейса
 */
function checkPassword(formDetails: FHTypes.FormDetailsInEventHandler, lang: EditorLanguageType) {
    const fieldValue = formDetails.state.fields['password'].value[0]

    let schema = yup.object({
        password: yup.string()
            .required(messages.enterForm.passwordErrRequired[lang])
            .min(4, messages.enterForm.passwordErrToShort[lang])
            .max(15, messages.enterForm.passwordErrToLong[lang])
    });

    // Проверять только если форму отправляли как минимум 1 раз
    schema.validate({password: fieldValue})
        // Поставить в данные поля что ошибки нет
        .then(() => setErrorToFieldData(formDetails, 'password', null))
        // Поставить в данные поля текст ошибки
        .catch((err: Error) => setErrorToFieldData(formDetails, 'password', err.message))
}