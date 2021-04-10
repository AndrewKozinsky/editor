import FHTypes from '../types';
import makeImmutableObj from '../../makeImmutableCopy/makeImmutableCopy';

/**
 * Функция устанавливающая любые данные поля: значение поля или его данные
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 */
export function getSetFieldValue(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
) {
    return function (fieldValue: FHTypes.FieldValue, fieldName: string) {
        const field = formState.fields[fieldName]
        let newField = {...field, value: fieldValue}

        const newState: FHTypes.FormState = makeImmutableObj(formState, field, newField);
        setFormState(newState)
    }
}


/**
 * Функция устанавливающая любые данные поля: значение поля или его данные
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 */
export function getSetFieldData(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
) {
    return function (fieldData: FHTypes.AnyData, fieldName: string) {
        const field = formState.fields[fieldName]
        let newField = {...field, data: fieldData}

        const newState: FHTypes.FormState = makeImmutableObj(formState, field, newField);
        setFormState(newState)
    }
}


/**
 * Функция устанавливающая данные формы
 * @param {Object} formState — состояние формы
 * @param {Function} setFormState — функция устанавливающая состояние формы
 */
export function getSetFormData(
    formState: FHTypes.FormState,
    setFormState: FHTypes.SetFormState,
) {
    return function (newData: FHTypes.FieldStateObj) {
        const form = formState.form
        const newForm = {...form, data: newData}

        const newState: FHTypes.FormState = makeImmutableObj(formState, form, newForm);
        setFormState(newState)
    }
}