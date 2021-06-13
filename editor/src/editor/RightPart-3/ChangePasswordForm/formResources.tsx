// import React from 'react'
// @ts-ignore
// import * as yup from 'yup'
// import FHTypes from 'src/libs/formHandler/types'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import { makeFetch } from 'requests/fetch'
// import getApiUrl from 'requests/apiUrls'
// import actions from 'store/rootAction'
// import { MiscTypes } from 'types/miscTypes'
// import messages from '../messages'


// Объект настройки useFormHandler
/*export default function getFormConfig(lang: StoreSettingsTypes.EditorLanguage): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            passwordCurrent: {
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
            newPassword: {
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
            newPasswordAgain: {
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
                // Нужно ли показывать сообщение об отправленном на почту письме
                passwordHasChanged: false,
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
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(formState, 'disabled', true, 'submit')

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
                    method: 'PATCH',
                    body: JSON.stringify({
                        passwordCurrent: formDetails.readyFieldValues.passwordCurrent,
                        newPassword: formDetails.readyFieldValues.newPassword,
                        newPasswordAgain: formDetails.readyFieldValues.newPasswordAgain
                    })
                }
                const response = await makeFetch(getApiUrl('changePassword'), options)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                if (response.status === 'success') {
                    // Показать сообщение что пароль изменён
                    formState = formDetails.setFormDataPropValue(
                        formState, 'passwordHasChanged', true
                    )
                }
                // Если ввели неправильные данные
                else {
                    // Поставить фокус на поле, где произошла ошибка, если оно указано
                    if(response.errors.field) {
                        // Поставить фокус на поле с почтой
                        setTimeout(() => {
                            formState.fields[response.errors.field].$field.focus()
                        }, 0)
                        // Поставить текст ошибки в пришедшее поля
                        formState = formDetails.setFieldDataPropValue(formState, 'error', response.errors.message, response.errors.field)
                    }
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)
            }
        }
    }
}*/


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fields — данные о полях формы
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
/*function getSchema(fields: FHTypes.FieldsStateObj ,fieldName: string, lang: StoreSettingsTypes.EditorLanguage): any {

    const schemas = {
        passwordCurrent: yup.string()
            .required(commonMessages.requiredField[lang])
            .min(6, commonMessages.passwordToShort[lang])
            .max(50, commonMessages.passwordToLong[lang]),
        newPassword: yup.string()
            .required(commonMessages.requiredField[lang])
            .min(6, commonMessages.passwordToShort[lang])
            .max(50, commonMessages.passwordToLong[lang]),
        newPasswordAgain: yup.string()
            .oneOf([fields.newPassword.value[0]], messages.ChangePasswordSection.passwordsMustMatch[lang])
    }

    // @ts-ignore
    return schemas[fieldName]
}*/


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 * @param lang
 */
/*function validateForm(
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
    lang: StoreSettingsTypes.EditorLanguage
): FHTypes.FormState {

    // Правильно ли заполнена форма
    let isFormValid = true

    // Проверка всех полей формы
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        // Игнорировать кнопки
        if (field.fieldType === 'button') continue

        // Значение перебираемого поля
        const fieldValue = field.value[0]

        // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
        try {
            getSchema(formState.fields, fieldName, lang).validateSync(fieldValue)
            formState = setFieldDataPropValue(formState, 'error', null, fieldName)
        } catch (err) {
            isFormValid = false
            formState = setFieldDataPropValue(formState, 'error', err.message, fieldName)
        }
    }

    // Если поля формы заполнены верно...
    if(isFormValid) {
        // Разблокировать кнопку отправки
        formState = setFieldDataPropValue(formState, 'disabled', false, 'submit')
    }
    // Если в форме допущены ошибки...
    else {
        // Заблокировать кнопку отправки
        formState = setFieldDataPropValue(formState, 'disabled', true, 'submit')
    }

    return formState
}*/


/**
 * Функция возвращает ссылку на элемент первого поля с ошибкой
 * @param {Object} formState — объект с Состоянием формы
 */
/*function getFirstInvalidField(formState: FHTypes.FormState) {

    // Первое поле, где есть ошибка
    let $firstWrongField: null | HTMLInputElement = null

    // Перебор всех полей чтобы найти поле с первой ошибкой
    for(let fieldName in formState.fields) {
        const field = formState.fields[fieldName]

        if (field.data.error) {
            $firstWrongField = field.$field
            break
        }
    }

    return $firstWrongField
}*/


/**
 * Функция ставит блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
/*function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'passwordCurrent')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'newPassword')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'newPasswordAgain')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}*/
