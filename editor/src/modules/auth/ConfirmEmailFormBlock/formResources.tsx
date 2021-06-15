// @ts-ignore
import * as yup from 'yup'
import store from 'store/store'
import actions from 'store/rootAction'
import FHTypes from 'libs/formHandler/types'
import { commonMessages } from 'messages/commonMessages'
import confirmEmailRequest from 'src/requests/user/confirmEmailRequest'
import {confirmEmailMessages} from 'messages/confirmEmailMessages';


// Объект настройки useFormHandler
export default function getFormConfig(history: any): FHTypes.FormConfig {
    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: {
            token: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue)
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
                // Текст обшей ошибки формы не привязанной к конкретному полю
                commonError: null,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue)

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
                const token = formDetails.state.fields.token.value[0]
                const response = await confirmEmailRequest(token)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                if (response.status === 'success') {

                    setTimeout(() => {
                        // Поставить токен авторизации в Хранилище
                        store.dispatch(actions.user.setAuthTokenStatus(2))

                        // Перебросить в редактор
                        history.push('/')
                    }, 50)
                }
                // Если ввели неправильные данные
                else {
                    // Показать сообщение об ошибке поля token.
                    formState = formDetails.setFieldDataPropValue(
                        formState, 'error', confirmEmailMessages.tokenIsInvalid, 'token'
                    )
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(formState, 'disabled', true, 'submit')

                    // Поставить новое Состояние формы
                    formDetails.setFormState(formState)
                }
            }
        }
    }
}



/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 */
function getSchema(fieldName: string): any {
    const schemas = {
        token: yup.string().required(commonMessages.requiredField)
    }

    // @ts-ignore
    return schemas[fieldName]
}


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 */
function validateForm(
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
): FHTypes.FormState {

    // Правильно ли заполнена форма
    let isFormValid = true

    try {
        getSchema('token').validateSync(formState.fields.token.value[0])
        formState = setFieldDataPropValue(formState, 'error', null, 'token')
    } catch (err) {
        isFormValid = false
        formState = setFieldDataPropValue(formState, 'error', err.message, 'token')
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
    return formState.fields.token.data.error
        ? formState.fields.token.$field
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
    formState = setFieldDataPropValue(formState, 'disabled', status, 'token')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}
