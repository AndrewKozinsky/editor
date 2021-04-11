import FHTypes from '../types';
import makeImmutableObj from '../../makeImmutableCopy/makeImmutableCopy';

/**
 * Функция ставящая в объект Состояния формы значение поля
 * Возвращает объект Состояния формы
 * @param {Object} defaultFieldName — имя изменяемого поля
 */
export function getSetFieldValue(defaultFieldName?: string) {
    // В formState — состояние формы
    // В fieldValue — новое значение поля
    // В fieldName — имя изменяемого поля
    return function (formState: FHTypes.FormState, fieldValue: FHTypes.FieldValue, fieldName?: string) {
        const field = formState.fields[fieldName || defaultFieldName]
        let newField = {...field, value: fieldValue}

        return <FHTypes.FormState>makeImmutableObj(formState, field, newField);
    }
}

/**
 * Функция ставящая в объект Состояния формы данные поля
 * Возвращает объект Состояния формы
 * @param {Object} defaultFieldName — имя изменяемого поля
 */
export function getSetFieldData(defaultFieldName?: string) {
    // В formState — состояние формы
    // В fieldData — новые данные поля
    // В fieldName — имя изменяемого поля
    return function (formState: FHTypes.FormState, fieldData: FHTypes.AnyData, fieldName?: string) {
        const field = formState.fields[fieldName || defaultFieldName]
        let newField = {...field, data: fieldData}

        return <FHTypes.FormState>makeImmutableObj(formState, field, newField);
    }
}

/**
 * Функция ставящая в объект Состояния формы данные формы
 * Возвращает объект Состояния формы
 * @param {Object} formState — состояние формы
 * @param {Object} newData — устанавливаемые данные поля
 */
export function getSetFormData(formState: FHTypes.FormState, newData: FHTypes.AnyData) {
    const form = formState.form
    const newForm = {...form, data: newData}

    return <FHTypes.FormState>makeImmutableObj(formState, form, newForm);
}
