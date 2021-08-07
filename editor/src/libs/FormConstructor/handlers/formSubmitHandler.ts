import React from 'react'
import FCType from '../FCType'
import getFirstInvalidFieldName from '../misc/getFirstInvalidFieldName'
import getReadyFieldsValues from '../misc/getReadyFieldsValues'
import { serverMessages } from 'messages/serverMessages'
import setErrorsToFields from '../state/setErrorsToFields'

export default async function formSubmitHandler(
    e: React.BaseSyntheticEvent,
    fields: FCType.FieldsState,
    setFields: FCType.SetFields,
    submitCounter: number,
    setSubmitCounter: FCType.SetSubmitCounter,
    formConfig: FCType.Config,
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled,
    setFormDisabled: FCType.SetFormDisabled,
    setSubmitBtnLoading: FCType.SetSubmitBtnLoading,
    setCommonError: FCType.SetCommonError,
    setFormVisible: FCType.SetFormVisible,
    setFormSentSuccessfully: FCType.SetFormSentSuccessfully,
    outerFns: FCType.OuterFns
): Promise<void> {
    e.preventDefault()

    // 1. Increase submit counter
    setSubmitCounter(submitCounter + 1)

    // 2. Check fields and set errors in fields
    if (submitCounter === 0) {
        const { fieldsCopy, isFormValid } = setErrorsToFields( fields, formConfig )

        if (!isFormValid) {
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
    }


    setFormDisabled(true)
    setSubmitBtnLoading(true)

    // Get ready fields values
    const readyFieldValues = getReadyFieldsValues(fields)

    // Отправить данные на сервер...
    const response = await formConfig.requestFn(readyFieldValues)

    // Разблокировать все поля. У кнопки отправки убрать блокировку и загрузку
    setFormDisabled(false)
    setSubmitBtnLoading(false)

    if (response.status === 'success') {
        if (formConfig.hideAfterSuccessfulSubmit) {
            setFormVisible(false)
        }

        setFormSentSuccessfully(true)
    }
    // Если ввели неправильные данные
    else {
        // Заблокировать кнопку отправки
        setSubmitBtnDisabled(true)

        // Показать общее сообщение. Оно будет показано ниже формы
        if (response.commonError) {
            setCommonError( serverMessages[response.commonError])
        }

        if (response.errors) {
            const fieldsCopy = {...fields}
            for (let fieldName in response.errors) {
                fieldsCopy[fieldName].error = response.errors[fieldName][0]
            }
            setFields(fieldsCopy)
        }
    }

    if (formConfig.afterSubmit) {
        formConfig.afterSubmit(response, outerFns, {setFormVisible})
    }
}


