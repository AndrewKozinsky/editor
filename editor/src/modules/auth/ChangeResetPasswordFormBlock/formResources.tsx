import React from 'react'
// @ts-ignore
// import * as yup from 'yup'
import FHTypes from 'src/libs/formHandler/types'
// import messages from '../messages'
import StoreSettingsTypes from 'store/settings/settingsTypes'
// import { makeFetch } from 'requests/fetch'
// import getApiUrl from 'requests/apiUrls'


// Объект настройки useFormHandler
export default function getFormConfig(lang: StoreSettingsTypes.EditorLanguage): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            /*password: {
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
            },*/
            /*passwordConfirm: {
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
            },*/
            /*submit: {
                initialData: {
                    loading: false,
                    disabled: false
                }
            }*/
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                // submitCounter: 0,
                // Текст обшей ошибки формы не привязанной к конкретному полю
                // commonError: null,
                // Нужно ли показывать сообщение об отправленном на почту письме
                // letterWasSentTo: false,
                // Почта пользователя, на которую зарегистрировали учётную запись
                // userEmail: '',
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                // let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue, lang)

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                // formState = formDetails.setFormDataPropValue(formState, 'submitCounter', formState.form.data.submitCounter + 1)

                // Первое поле, где есть ошибка
                // let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                // formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, true)


                // Если поля формы заполнены неверно...
                /*if($firstWrongField) {
                    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                    formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                    // Поставить фокус на первое поле где есть ошибка
                    $firstWrongField.focus()

                    // Поставить новое Состояние формы
                    formDetails.setFormState(formState)

                    // Завершить дальнейшее выполнение
                    return
                }*/

                // Поставить новое Состояние формы
                // formDetails.setFormState(formState)

                // Форма заполнена верно. Отправить данные на сервер...
                /*const options = {
                    method: 'POST',
                    body: JSON.stringify(formDetails.readyFieldValues)
                }*/
                // const response = await makeFetch(getApiUrl('signup'), options, lang)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                // formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                /*if (response.status === 'success') {
                    // Показать сообщение что необходимо подтвердить почту
                    formState = formDetails.setFormDataPropValue(
                        formState, 'letterWasSentTo', response.data.user.email
                    )
                }*/
                // Если ввели неправильные данные
                /*else {
                    // Показать общее сообщение. Оно будет показано ниже формы
                    formState = formDetails.setFormDataPropValue(
                        formState, 'commonError', messages.RegForm.somethingWentWrong[lang]
                    )
                }*/

                // Поставить новое Состояние формы
                // formDetails.setFormState(formState)
            }
        }
    }
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fields — данные о полях формы
 * @param {Array} fieldName — имя поля
 * @param {String} lang — язык интерфейса
 */
/*function getSchema(fields: FHTypes.FieldsStateObj ,fieldName: string, lang: EditorLanguageType): any {

    const schemas = {
        email: yup.string()
            .required(messages.RegForm.emailErrRequired[lang])
            .email(messages.RegForm.emailErrInvalid[lang]),
        password: yup.string()
            .required(messages.RegForm.passwordErrRequired[lang])
            .min(4, messages.RegForm.passwordErrToShort[lang])
            .max(15, messages.RegForm.passwordErrToLong[lang]),
        passwordConfirm: yup.string()
            .oneOf([fields.password.value[0]], messages.RegForm.passwordsMustMatch[lang])
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
    lang: EditorLanguageType
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

    // Убрать сообщение об общей ошибке в нижней части формы.
    return setFormDataPropValue( formState, 'commonError', null )
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
    formState = setFieldDataPropValue(formState, 'disabled', status, 'email')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'password')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'passwordConfirm')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}*/
