// import React from 'react'
// import { MiscTypes } from 'types/miscTypes'
// @ts-ignore
// import * as yup from 'yup'
// import FHTypes from 'src/libs/formHandler/types'
// import messages from '../messages'
// import StoreSettingsTypes from 'store/settings/settingsTypes'
// import { makeFetch } from 'requests/fetch'
// import getApiUrl from 'requests/apiUrls'
// import store from '../../../store/store'


// Объект настройки useFormHandler
// * @param {String} lang — язык интерфейса
/*export default function getFormConfig(
    lang: StoreSettingsTypes.EditorLanguage
): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            email: {
                initialValue: [store.getState().user.email],
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
                // Правильно ли заполнена форма. Если правильно,
                // то код выше покажет модальное окно подтверждения изменения почты.
                formIsValid: false
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

                // Первое поле, где есть ошибка
                let $firstWrongField = getFirstInvalidField(formState)

                // Если поля формы заполнены верно...
                if(!$firstWrongField) {
                    // Поставить свойство, что форма заполнена верно
                    // чтобы код выше открыл модальное окно с подтверждением смены почты.
                    formState = formDetails.setFormDataPropValue(formState, 'formIsValid', true)
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)
            }
        }
    }
}*/


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
/*function getSchema(fieldName: string, lang: StoreSettingsTypes.EditorLanguage): any {
    const schemas = {
        email: yup.string()
            .required(messages.UserDataSection.requiredField[lang])
            .email(messages.UserDataSection.emailErrInvalid[lang])
            .test('test-name', messages.UserDataSection.newEmailEqualToOldOne[lang],
                function(value: string) {
                    return value !== store.getState().user.email
                })
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
        return setFieldDataPropValue(formState, 'disabled', false, 'submit')
    }
    // Если есть ошибка...
    else {
        // Заблокировать кнопку отправки
        return setFieldDataPropValue(formState, 'disabled', true, 'submit')
    }
}*/


/**
 * Функция возвращает ссылку на поле email если там есть ошибка
 * @param {Object} formState — объект с Состоянием формы
 */
/*function getFirstInvalidField(formState: FHTypes.FormState) {
    return formState.fields.email.data.error
        ? formState.fields.email.$field
        : null
}*/


/**
 * Функция блокирует или разблокирует поля и кнопку отправки перед/после отправки
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
/*function setLoadingStatusToForm(
    formState: FHTypes.FormState, setFieldDataPropValue: FHTypes.SetFieldDataPropValue, status: boolean
) {
    formState = setFieldDataPropValue(formState, 'disabled', status, 'email')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}*/
