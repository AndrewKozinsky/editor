import React from 'react'
import serverMsg from 'messages/serverMessages'
import FCType from '../FCType'
import getFirstInvalidFieldName from '../misc/getFirstInvalidFieldName'
import getReadyFieldsValues from '../misc/getReadyFieldsValues'
import setErrorsToFields from '../state/setErrorsToFields'

/**
 * Обработчик отправки формы
 * @param {Object} e — объект события отправки формы
 * @param {Array} fields — массив данных о полях формы из Состояния
 * @param {Function} setFields — функцию изменяющая Состояние полей формы
 * @param {Number} submitCounter — количество попыток отправки формы
 * @param {Function} setSubmitCounter —
 * @param {FCType.Config} formConfig — объект конфигурации формы
 * @param {Function} setSubmitBtnDisabled — функция устанавливающая заблокированность кнопки отправки формы
 * @param {Function} setFormDisabled — функция устанавливающая заблокированность формы
 * @param {Function} setSubmitBtnLoading —
 * @param {Function} setCommonError —
 * @param {Function} setFormVisible — функция устанавливающая видимость формы
 * @param {Function} setFormSentSuccessfully —
 * @param {FCType.OuterFns} outerFns —
 * @param {FCType.CommonSuccess} commonSuccess —
 * @param {Function} showCommonSuccess —
 * @param {FCType.FormData} formData —
 * @param {Function} setFormData —
 */
export default async function formSubmitHandler(
    e: React.BaseSyntheticEvent, // Event object
    fields: FCType.FieldsState, // Fields data from Store
    setFields: FCType.SetFields, // Fields data setting function
    submitCounter: number, // How many time form was submitted
    setSubmitCounter: FCType.SetSubmitCounter, // Set submit counter setting function
    formConfig: FCType.Config, // Outer configure object
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled, // Set submit button disabled setting function
    setFormDisabled: FCType.SetFormDisabled, // Set form disabled setting function
    setSubmitBtnLoading: FCType.SetSubmitBtnLoading, // Set submit button loading status function
    setCommonError: FCType.SetCommonError, // Common error setting function
    setFormVisible: FCType.SetFormVisible, // Set form visible setting function
    setFormSentSuccessfully: FCType.SetFormSentSuccessfully, // Set form successfully sent setting function
    outerFns: FCType.OuterFns, // User's functions passed to FormConstructor config
    commonSuccess: FCType.CommonSuccess, // Success message
    showCommonSuccess: FCType.ShowCommonSuccess, // Show success message setting function
    formData: FCType.FormData, // Пользовательские данные формы
    setFormData: FCType.SetFormData, // Установка пользовательских данных формы
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

            // Set a focus to the first field with an error
            const $firstWrongField = document.querySelector(`[name="${firstWrongFieldName}"]`) as HTMLFormElement
            if ($firstWrongField) $firstWrongField.focus()

            setFields(fieldsCopy)
            return
        }
    }

    setFormDisabled(true)
    setSubmitBtnLoading(true)
    setSubmitBtnDisabled(true)

    // Get ready fields values
    const readyFieldValues = getReadyFieldsValues(fields)

    const formDetails = {
        setFormVisible,
        readyFieldValues,
        formData,
        setFormData
    }

    // Send data to a server and get response
    let response: FCType.Response =
        formConfig.requestFn
            ? await formConfig.requestFn(readyFieldValues, outerFns, formDetails)
            : {status: 'success'}

    // Unlock all fields. Remove loading status from the submit button
    setFormDisabled(false)
    setSubmitBtnLoading(false)

    if (response.status === 'success') {
        setFormSentSuccessfully(true)

        if (formConfig.hideAfterSuccessfulSubmit) {
            setFormVisible(false)
            return
        }
    }
    // If user set wrong data
    else {
        // Lock submit button
        setSubmitBtnDisabled(true)

        // Show common message. It will be shown below a form
        if (response.commonError) {
            // @ts-ignore
            setCommonError(serverMsg[response.commonError])
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
        formConfig.afterSubmit(response, outerFns, formDetails)
    }
}
