// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'libs/formHandler/types'
import store from 'store/store'
import actions from 'store/rootAction'
import { commonMessages } from 'messages/commonMessages'
import {
    changeResetPasswordFormMessages
} from 'messages/changeResetPasswordFormMessages'
import changeResetPasswordRequest from 'src/requests/user/changeResetPasswordRequest'


// Объект настройки useFormHandler
export default function getFormConfig(): FHTypes.FormConfig {
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
                        return validateForm(
                            formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                        )
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
                        return validateForm(
                            formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                        )
                    }
                }
            },
            passwordConfirm: {
                initialValue: [''],
                initialData: {
                    error: null,
                    disabled: false
                },
                change(formDetails) {
                    // Проверять только если форму отправляли как минимум 1 раз
                    if (formDetails.state.form.data.submitCounter > 0) {
                        return validateForm(
                            formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                        )
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
                passwordHasChangedMessage: false,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {
                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(
                    formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                )

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(
                    formState, 'submitCounter', formState.form.data.submitCounter + 1
                )

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

                const response = await changeResetPasswordRequest(
                    formDetails.readyFieldValues.password.toString(),
                    formDetails.readyFieldValues.passwordConfirm.toString(),
                    formDetails.readyFieldValues.token.toString()
                )

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                formState = setLoadingStatusToForm(formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                if (response.status === 'success') {
                    // Показать сообщение что пароль изменён
                    formState = formDetails.setFormDataPropValue(
                        formState, 'passwordHasChangedMessage', true
                    )

                    // Поставить токен авторизации в Хранилище
                    store.dispatch(actions.user.setAuthTokenStatus(2))
                }
                // Если ввели неправильные данные
                else {
                    if (response.errors.statusCode === 400) {
                        // В поле токена занести сообщение что он неправильный
                        formState = formDetails.setFieldDataPropValue(
                            formState, 'error', changeResetPasswordFormMessages.tokenIsWrong, 'token'
                        )
                    }
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)
            }
        }
    }
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fields — данные о полях формы
 * @param {Array} fieldName — имя поля
 */
function getSchema(fields: FHTypes.FieldsStateObj ,fieldName: string): any {

    const schemas = {
        token: yup.string()
            .required(commonMessages.requiredField),
        password: yup.string()
            .required(commonMessages.requiredField)
            .min(6, commonMessages.passwordToShort)
            .max(50, commonMessages.passwordToLong),
        passwordConfirm: yup.string()
            .oneOf([fields.password.value[0]], changeResetPasswordFormMessages.passwordsMustMatch)
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
    setFormDataPropValue: FHTypes.SetFormDataPropValue
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
            getSchema(formState.fields, fieldName).validateSync(fieldValue)
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
}


/**
 * Функция возвращает ссылку на элемент первого поля с ошибкой
 * @param {Object} formState — объект с Состоянием формы
 */
function getFirstInvalidField(formState: FHTypes.FormState) {

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
    formState = setFieldDataPropValue(formState, 'disabled', status, 'password')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'passwordConfirm')
    formState = setFieldDataPropValue(formState, 'disabled', status, 'submit')
    formState = setFieldDataPropValue(formState, 'loading', status, 'submit')

    return formState
}
