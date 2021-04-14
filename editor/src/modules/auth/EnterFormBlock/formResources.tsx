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
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return setErrorToEmailField(formDetails, lang)
                    }
                }
            },
            password: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return setErrorToPasswordField(formDetails, lang)
                    }
                }
            },
            submit: {
                initialValue: [''],
                initialData: {
                    loading: false
                }
            }
        },
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
                // Текст обшей ошибки формы не привязанной к конкретному полю
                commonError: null,
                // Нужно ли показывать сообщение о необходимости подтвердить почту
                showConfirmLetter: false,
                // Почта пользователя, которую нужно подтвердить
                confirmEmail: '',
                // Верно ли заполнена форма.
                // Статус обновляется после первой отправки при каждом изменении полей формы.
                isFormValid: true,
            },
            stateChange: function (formDetails) {
                // Ничего не делать если форму еще не отправляли
                if (formDetails.state.form.data.submitCounter === 0) return

                // Если форму уже отправляли, то блокировать кнопку отправки если в форме есть ошибки
                // Правильно ли заполнена форма
                let isFormValid = true

                // Проверка всех полей формы
                for(let fieldName in formDetails.state.fields) {
                    // Значение перебираемого поля
                    const fieldValue = formDetails.state.fields[fieldName].value[0]

                    // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
                    try {
                        getSchema(fieldName, lang).validateSync({[fieldName]: fieldValue})
                    } catch (err) {
                        isFormValid = false
                    }
                }

                // Формирование нового Состояния формы
                let newFormState = formDetails.setFormData(
                    formDetails.state,
                    {
                        ...formDetails.state.form.data,
                        isFormValid
                    }
                )

                // Поставить новое Состояние формы с поставленными или убранными ошибками
                formDetails.setFormState(newFormState)
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {
                // Данные формы
                const formData = formDetails.state.form.data

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                let newFormState = formDetails.setFormData(formDetails.state, {
                    ...formData,
                    submitCounter: formData.submitCounter + 1
                })

                // Правильно ли заполнена форма
                let isFormValid = true

                // Проверка всех полей формы
                for(let fieldName in newFormState.fields) {
                    const field = newFormState.fields[fieldName]

                    // Игнорировать кнопки
                    if (field.fieldType === 'button') continue

                    // Значение перебираемого поля
                    const fieldValue = field.value[0]

                    // Попытаться проверить поле. И в зависимости от результата или поставить или обнулить ошибку
                    try {
                        getSchema(fieldName, lang).validateSync({[fieldName]: fieldValue})
                        newFormState = formDetails.setFieldData(newFormState, {error: null}, fieldName)
                    } catch (err) {
                        isFormValid = false
                        newFormState = formDetails.setFieldData(newFormState, {error: err.message}, fieldName)
                    }
                }

                // Поставить загрузку на кнопку отправки
                newFormState = setSubmitLoadingStatus(newFormState, formDetails.setFieldData, true)

                // Поставить новое Состояние формы
                formDetails.setFormState(newFormState)

                // Если поля формы заполнены неверно...
                if(!isFormValid) {
                    // Остановить загрузку на кнопке отправки
                    newFormState = setSubmitLoadingStatus(newFormState, formDetails.setFieldData, false)
                    // Поставить новое Состояние формы
                    formDetails.setFormState(newFormState)

                    // Завершить дальнейшее выполнение
                    return
                }


                // Форма заполнена верно. Отправить данные на сервер...
                const options = {
                    method: 'POST',
                    body: JSON.stringify(formDetails.readyFieldValues)
                }
                // const response = await makeFetch(apiUrls.login, options, lang)
                // console.log(response)

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
                .required(messages.EnterForm.emailErrRequired[lang])
                .email(messages.EnterForm.emailErrInvalid[lang])
        }),
        password: yup.object({
            password: yup.string()
                .required(messages.EnterForm.passwordErrRequired[lang])
                .min(4, messages.EnterForm.passwordErrToShort[lang])
                .max(15, messages.EnterForm.passwordErrToLong[lang])
        })
    }

    // @ts-ignore
    return schemas[fieldName]
}

/**
 * Функция проверяющая поле email
 * @param {Object} formDetails — объект с методами манипулирования Состояния формы
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
 * @param {Object} formDetails — объект с методами манипулирования Состояния формы
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
 * Функция устанавливает статус загрузки на кнопке отправки: идёт ли загрузка или нет.
 * @param {Object} newFormState — объект Состояния формы
 * @param {Object} setFieldData — функция устанавливающая данные поля
 * @param {Boolean} loadingStatus — статус загрузки
 */
function setSubmitLoadingStatus(newFormState: FHTypes.FormState, setFieldData: FHTypes.SetFieldData, loadingStatus: boolean) {
    return setFieldData(
        newFormState,
        {
            ...newFormState.fields.submit.data,
            loading: loadingStatus
        },
        'submit'
    )
}