import React from 'react'
// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'src/libs/formHandler/types'
import messages from '../messages'
import { EditorLanguageType } from 'store/settings/settingsTypes'
import { makeFetch } from 'requests/fetch'
import apiUrls from 'requests/apiUrls'


// Объект настройки useFormHandler
export default function getFormConfig(lang: EditorLanguageType): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            email: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)
                    }
                }
            },
            submit: {
                initialData: {
                    loading: false,
                    disabled: false
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
                // Текст общей ошибки формы не привязанной к конкретному полю
                commonError: null,
                // Нужно ли показывать сообщение про отправленное письмо со ссылкой на сброс
                emailWasSent: false,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

                // Первое поле, где есть ошибка
                let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, true)

                // Если поля формы заполнены неверно...
                if($firstWrongField) {
                    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                    formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                    // Поставить фокус на первое поле где есть ошибка
                    $firstWrongField.focus()

                    // Поставить новое Состояние формы
                    formDetails.setFormState(formState)

                    // Завершить дальнейшее выполнение
                    return
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)

                // Форма заполнена верно. Отправить данные на сервер...
                const options = {
                    method: 'POST',
                    body: JSON.stringify(formDetails.readyFieldValues)
                }
                const response = await makeFetch(apiUrls.resetPassword, options, lang)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                if (response.status === 'success') {
                    // Показать сообщение что необходимо пройти по ссылке в письме для ввода нового пароля
                    formState = formDetails.setFormDataPropValue(
                        formState, 'emailWasSent', response.data.email
                    )
                }
                // Если ввели неправильные данные
                else {
                    let message = response.errors.message || messages.ResetForm.somethingWentWrong[lang]

                    // Показать общее сообщение. Оно будет показано ниже формы
                    formState = formDetails.setFormDataPropValue(formState, 'commonError', message)
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)
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
        email: yup.string()
            .required(messages.EnterForm.emailErrRequired[lang])
            .email(messages.EnterForm.emailErrInvalid[lang])
    }

    // @ts-ignore
    return schemas[fieldName]
}


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 * @param lang
 */
function validateForm(
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
    lang: EditorLanguageType
): FHTypes.FormState {

    // Правильно ли заполнена форма
    let isFormValid = true


    try {
        getSchema('email', lang).validateSync(formState.fields.email.value[0])
        formState = setFieldDataPropValue(formState, 'error', null, 'email')
    } catch (err) {
        isFormValid = false
        formState = setFieldDataPropValue(formState, 'error', err.message, 'email')
    }


    // Если поле формы заполнено верно...
    if(isFormValid) {
        // Разблокировать кнопку отправки
        formState = setFieldDataPropValue(formState, 'disabled', false, 'submit')
    }
    // Если есть ошибка...
    else {
        // Заблокировать кнопку отправки
        formState = setFieldDataPropValue(formState, 'disabled', true, 'submit')
    }

    // Убрать сообщение об общей ошибке в нижней части формы.
    return setFormDataPropValue( formState, 'commonError', null )
}


/**
 * Функция возвращает ссылку на поле email если там есть ошибка
 * @param {Object} formState — объект с Состоянием формы
 */
function getFirstInvalidField(formState: FHTypes.FormState) {
    return formState.fields.email.data.error
        ? formState.fields.email.$field
        : null
}


/**
 * Функция ставит блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'email')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}
