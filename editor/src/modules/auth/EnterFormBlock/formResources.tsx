import React from 'react'
// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'src/libs/formHandler/types'
import messages from '../messages'
import { EditorLanguageType } from 'store/settings/settingsTypes'
import { checkFieldAndReturnFormState } from 'utils/FormHandlerUtils'
import { makeFetch } from '../../../requests/fetch'
import apiUrls from 'requests/apiUrls'


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
                        return setErrorToEmailField(formDetails, lang)
                    }
                }
            },
            password: {
                initialValue: [''],
                initialData: {
                    error: null
                },
                blur(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return setErrorToPasswordField(formDetails, lang)
                    }
                }
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
            submit: async function(formDetails) {
                // Данные формы
                const formData = formDetails.state.form.data

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                let newFormState = formDetails.setFormData(formDetails.state, {
                    ...formDetails.state.form.data,
                    submitCounter: formData.submitCounter + 1
                })

                // Правильно ли заполнена форма
                let isFormValid = true

                // Проверка всех полей формы
                for(let fieldName in formDetails.state.fields) {
                    // Значение перебираемого поля
                    const fieldValue = formDetails.state.fields[fieldName].value[0]

                    // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
                    try {
                        getSchema(fieldName, lang).validateSync({[fieldName]: fieldValue})
                        newFormState = formDetails.setFieldData(newFormState, {error: null}, fieldName)
                    } catch (err) {
                        isFormValid = false
                        newFormState = formDetails.setFieldData(newFormState, {error: err.message}, fieldName)
                    }
                }

                // Поставить новое Состояние формы с поставленными или убранными ошибками
                formDetails.setFormState(newFormState)

                // Ничего не делать если поля формы заполнены неверно
                if(!isFormValid) return

                // Форма заполнена верно. Отправить данные на сервер...
                const options = {
                    method: 'POST',
                    body: JSON.stringify(formDetails.readyFieldValues)
                }
                const response = await makeFetch(apiUrls.login, options, lang)
                console.log(response)

                // console.log('SENDING...')

                // Отправка данных на сервер для входа пользователя
                // sendToServerLogInUserData(formDetails.readyFieldValues, lang)
            }
        }
    }
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
function getSchema(fieldName: string, lang: EditorLanguageType): any {

    const schemas = {
        email: yup.object({
            email: yup.string()
                .required(messages.enterForm.emailErrRequired[lang])
                .email(messages.enterForm.emailErrInvalid[lang])
        }),
        password: yup.object({
            password: yup.string()
                .required(messages.enterForm.passwordErrRequired[lang])
                .min(4, messages.enterForm.passwordErrToShort[lang])
                .max(15, messages.enterForm.passwordErrToLong[lang])
        })
    }

    // @ts-ignore
    return schemas[fieldName]
}

/**
 * Функция проверяющая поле email
 * @param {Object} formDetails — объект передаваемый в функцию устанавливающую данные поля
 * @param {String} lang — язык интерфейса
 */
function setErrorToEmailField(
    formDetails: FHTypes.FormDetailsInEventHandler, lang: EditorLanguageType
): FHTypes.FormState
{
    const fieldValue = formDetails.state.fields['email'].value[0]

    // Проверить значение поля по переданной схеме, записать или убрать ошибку поля
    // и вернуть новое Состояние формы
    return checkFieldAndReturnFormState(
        getSchema('email', lang), 'email', fieldValue, formDetails.state, formDetails.setFieldData
    )
}

/**
 * Функция проверяющая поле password
 * @param {Object} formDetails — объект передаваемый в функцию устанавливающую данные поля
 * @param {String} lang — язык интерфейса
 */
function setErrorToPasswordField(
    formDetails: FHTypes.FormDetailsInEventHandler, lang: EditorLanguageType
): FHTypes.FormState
{
    const fieldValue = formDetails.state.fields['password'].value[0]

    // Проверить значение поля по переданной схеме, записать или убрать ошибку поля
    // и вернуть новое Состояние формы
    return checkFieldAndReturnFormState(
        getSchema('password', lang), 'password', fieldValue, formDetails.state, formDetails.setFieldData
    )
}


/**
 * Функция делает запрос на вход пользователя
 * @param readyFieldValues
 */
/*
export async function sendToServerLogInUserData(readyFieldValues: FHTypes.ReadyFieldsValues, lang: EditorLanguageType) {

    // const response = await makeFetch('url', {method: 'POST'}, lang)

    // Хук делающий запрос данных с сервера. В data приходят данные полученные с сервера
    /!*const {data: userToken, doFetch} =
        useFetch<GetTokenDataServerResponse>(apiUrls.getUserToken, options)*!/

    // return { userToken, doFetch }
}*/
