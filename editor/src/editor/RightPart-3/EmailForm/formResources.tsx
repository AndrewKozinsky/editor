// @ts-ignore
import * as yup from 'yup'
import FHTypes from 'libs/formHandler/types'
import store from 'store/store'
import { userDataSectionMessages } from 'messages/userDataSectionMessages'


/** Объект настройки useFormHandler */
export default function getFormConfig(): FHTypes.FormConfig {
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
                // Правильно ли заполнена форма. Если правильно,
                // то код выше покажет модальное окно подтверждения изменения почты.
                formIsValid: false
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue)

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
}


/**
 * Функция возвращает схему Yup для поля с переданным именем
 * @param {Array} fieldName — имя поля
 */
function getSchema(fieldName: string): any {
    const schemas = {
        email: yup.string()
            .required(userDataSectionMessages.requiredField)
            .email(userDataSectionMessages.emailErrInvalid)
            .test('test-name', userDataSectionMessages.newEmailEqualToOldOne,
                function(value: string) {
                    return value !== store.getState().user.email
                })
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
        getSchema('email').validateSync(formState.fields.email.value[0])
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