// @ts-ignore
import {FormikErrors, FormikTouched} from 'formik'
import {ChangeEvent} from 'react';


export type FormikActionsType = {
    resetForm: () => void
    setErrors: () => void
    setFieldError: () => void
    setFieldTouched: () => void
    setFieldValue: () => void
    setFormikState: () => void
    setStatus: () => void
    setSubmitting: () => void
    setTouched: () => void
    setValues: () => void
    submitForm: () => void
    validateField: () => void
    validateForm: () => void
}

// ВОЗМОЖНО ЭТОТ ТИП НУЖНО УДАЛИТЬ
/*
export type GetFormikFormFuncType<FormicValues> = {
    values: FormicValues
    errors: FormikErrors<FormicValues>
    touched: FormikTouched<FormicValues>
    handleChange: (e: ChangeEvent<any>) => any
    handleBlur: (e: FocusEvent) => any
    handleSubmit: (values: FormicValues, actions: FormikActionsType) => void,
    isSubmitting: boolean
}*/
