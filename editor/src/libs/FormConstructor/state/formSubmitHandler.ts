// import React from 'react'
// import FCType from '../FCType'
// import { serverMessages } from '../../../messages/serverMessages'
// import getFirstInvalidFieldName from './getFirstInvalidFieldName'
// import getReadyFieldsValues from './getReadyFieldsValues'
// import setErrorsToFields from './setErrorsToFields'

/*export default function formSubmitHandler(
    e: React.BaseSyntheticEvent,
    fields: FCType.FieldsState,
    setFields: FCType.SetFields,
    submitCounter: number,
    setSubmitCounter: FCType.SetSubmitCounter,
    formHasErrors: boolean,
    setFormHasErrors: FCType.SetFormHasErrors,
    formConfig: FCType.Config,
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled,
    setCommonError: FCType.SetCommonError,
    setSubmitBtnLoading: FCType.SetSubmitBtnLoading,
    setFormDisabled: FCType.SetFormDisabled
): void {
    e.preventDefault()

    // 1. Increase submit counter
    setSubmitCounter(submitCounter + 1)

    // 2. Check fields and set errors in fields
    const { fieldsCopy, isFormValid } = setErrorsToFields(
        fields, formConfig
    )

    if (!isFormValid) {
        setFormHasErrors(true)
        // Disable submit button
        setSubmitBtnDisabled(true)

        // Первое поле, где есть ошибка
        let firstWrongFieldName = getFirstInvalidFieldName(fieldsCopy)

        // Поставить фокус на первое поле где есть ошибка
        const $firstWrongField = document.querySelector(`[name="${firstWrongFieldName}"]`) as HTMLFormElement
        if ($firstWrongField) $firstWrongField.focus()

        setFields(fieldsCopy)

        return
    }

    setFormDisabled(true)
    setSubmitBtnLoading(true)
    setFields(fieldsCopy)

    // Get ready fields values
    const readyFieldValues = getReadyFieldsValues(fieldsCopy)

    // Отправить данные на сервер...
    // const response = await config.requestFn(formDetails.readyFieldValues)

    // ======================================



    // Заблокировать все поля. Кнопке отправки поставить блокировку и загрузку
    // formState = setLoadingStatusToForm(config, formState, formDetails.setFieldDataPropValue, true)

    // Если поля формы заполнены неверно...
    // if(firstWrongFieldName) {
        // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
        /!*formState = setLoadingStatusToForm(
            config, formState, formDetails.setFieldDataPropValue, false
        )*!/
        // Заблокировать кнопку отправки
        /!*formState = formDetails.setFieldDataPropValue(
            formState, 'disabled', true, 'submit'
        )*!/



        // Поставить новое Состояние формы
        // formDetails.setFormState(formState)

        // Завершить дальнейшее выполнение
        // return
    // }

    // Поставить новое Состояние формы
    // formDetails.setFormState(formState)

    // Форма заполнена верно. Отправить данные на сервер...
    // const response = await config.requestFn(formDetails.readyFieldValues)

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    // formState = setLoadingStatusToForm(config, formState, formDetails.setFieldDataPropValue, false)

    // Если ввели правильные данные
    /!*if (response.status === 'success') {
        // Set isFormSentSuccessful property to true
        formState = formDetails.setFormDataPropValue(formState, 'isFormSentSuccessful', true)

        if (config.hideFormAfterSuccessfulSubmit) {
            formState = formDetails.setFormDataPropValue(formState, 'isFormVisible', false)
        }

        if (config.afterSubmit) {
            config.afterSubmit(response, formDetails.state)
        }
    }*!/
    // Если ввели неправильные данные
    /!*else {
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
    }*!/

    // Поставить новое Состояние формы
    // formDetails.setFormState(formState)
}*/


