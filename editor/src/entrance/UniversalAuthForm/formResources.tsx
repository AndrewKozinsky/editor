// import FHTypes from 'src/libs/formHandler/types'

// Объект настройки useFormHandler
// import UniversalAuthFormConfigType from './UniversalAuthFormConfigType'
// import { serverMessages } from 'src/messages/serverMessages'


/*export default function getFormConfig(config: UniversalAuthFormConfigType.Config): FHTypes.FormConfig {
    const fields = {}
    let fieldCounter = -1

    for (let fieldName in config.fields) {
        fieldCounter++

        const fieldObj: FHTypes.ConfigField = {
            initialValue: [''],
            initialData: {
                error: null,
                disabled: false
            },
            change(formDetails) {
                // Проверять только если форму отправляли как минимум 1 раз
                if (formDetails.state.form.data.submitCounter > 0) {
                    return validateForm(
                        config, formDetails.state, formDetails.setFieldDataPropValue, formDetails.setFormDataPropValue
                    )
                }
            }
        }

        //@ts-ignore
        fields[fieldName] = fieldObj
    }

    //@ts-ignore
    fields.submit = {
        initialData: {
            loading: false,
            disabled: false
        }
    }

    return {
        // Обязательно нужно передать все поля обрабатываемые FormHandler-ом
        fields: fields,
        form: {
            initialData: {
                // Сколько раз пытались отправить форму
                submitCounter: 0,
                // Текст обшей ошибки формы не привязанной к конкретному полю
                commonError: null,
                // Is form visible?
                isFormVisible: true,
                // Is form sent successful?
                isFormSentSuccessful: false,
            },
            // Пользовательская функция запускаемая при отправке формы
            submit: async function(formDetails) {

                // Проверить форму и поставить/убрать ошибки
                let formState = validateForm(
                    config,
                    formDetails.state,
                    formDetails.setFieldDataPropValue,
                    formDetails.setFormDataPropValue
                )

                // Увеличить счётчик попыток отправки формы и поставить новое Состояние формы в переменную.
                formState = formDetails.setFormDataPropValue(
                    formState, 'submitCounter', formState.form.data.submitCounter + 1
                )

                // Первое поле, где есть ошибка
                let $firstWrongField = getFirstInvalidField(formState)

                // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
                formState = setLoadingStatusToForm(config, formState, formDetails.setFieldDataPropValue, true)

                // Если поля формы заполнены неверно...
                if($firstWrongField) {
                    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                    formState = setLoadingStatusToForm(
                        config, formState, formDetails.setFieldDataPropValue, false
                    )
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(
                        formState, 'disabled', true, 'submit'
                    )

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
                const response = await config.requestFn(formDetails.readyFieldValues)

                // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
                formState = setLoadingStatusToForm(config, formState, formDetails.setFieldDataPropValue, false)

                // Если ввели правильные данные
                if (response.status === 'success') {
                    // Set isFormSentSuccessful property to true
                    formState = formDetails.setFormDataPropValue(formState, 'isFormSentSuccessful', true)

                    if (config.hideFormAfterSuccessfulSubmit) {
                        formState = formDetails.setFormDataPropValue(formState, 'isFormVisible', false)
                    }

                    if (config.afterSubmit) {
                        config.afterSubmit(response, formDetails.state)
                    }
                }
                // Если ввели неправильные данные
                else {
                    // Заблокировать кнопку отправки
                    formState = formDetails.setFieldDataPropValue(formState, 'disabled', true, 'submit')

                    // Показать общее сообщение. Оно будет показано ниже формы
                    if (response.commonError && !config.hideCommonErrors) {
                        formState = formDetails.setFormDataPropValue(
                            formState, 'commonError', serverMessages[response.commonError]
                        )
                    }

                    if (response.errors) {
                        for (let fieldName in response.errors) {
                            formState = formDetails.setFieldDataPropValue(
                                formState, 'error', serverMessages[response.errors[fieldName][0]], fieldName
                            )
                        }
                    }

                    if (config.afterSubmit) {
                        config.afterSubmit(response, formDetails.state)
                    }
                }

                // Поставить новое Состояние формы
                formDetails.setFormState(formState)
            }
        }
    }
}*/


/**
 * Функция проверяющая форму при изменении полей ввода
 * @param {Object} config — form generation config
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Function} setFormDataPropValue — установщик значения свойства данных формы
 */
/*function validateForm(
    config: UniversalAuthFormConfigType.Config,
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    setFormDataPropValue: FHTypes.SetFormDataPropValue,
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
            const schema = config.fields[fieldName].schema

            if (schema) {
                schema(formState.fields).validateSync(fieldValue)
                formState = setFieldDataPropValue(
                    formState, 'error', null, fieldName
                )
            }
        } catch (err) {
            isFormValid = false
            formState = setFieldDataPropValue(formState, 'error', err.message, fieldName)
        }
    }

    // Если поля формы заполнены верно...
    if (isFormValid) {
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
 * @param {Object} config — form generation config
 * @param {Object} formState — объект с Состоянием формы
 * @param {Function} setFieldDataPropValue — установщик значения свойства данных поля
 * @param {Boolean} status — блокировать или разблокировать поля
 */
/*function setLoadingStatusToForm(
    config: UniversalAuthFormConfigType.Config,
    formState: FHTypes.FormState,
    setFieldDataPropValue: FHTypes.SetFieldDataPropValue,
    status: boolean
) {
    for(let fieldName in config.fields) {
        if (fieldName === 'submit') {
            formState = setFieldDataPropValue(formState, 'loading', status, 'submit')
        }
        formState = setFieldDataPropValue(formState, 'disabled', status, fieldName)
    }

    return formState
}*/
