import {useEffect} from 'react'
import FHTypes from '../types'


/**
 * Функция дополняет значения полей формы и дописывает им ссылку на поле,
 * его тип и сколько значений оно может иметь.
 * @param {Object} formState — объект Состояния формы
 * @param {Function} setFormState — функция устанавливающая новое Состояние useFormHandler
 * @param {Element} $form — ссылка на элемент формы
 */
export default function useSupplementFieldData(
    formState: FHTypes.FormState, setFormState: FHTypes.SetFormState, $form: FHTypes.$form
) {

    useEffect(function () {
        // Завершить функцию если нет ссылки на форму
        if (!$form) return

        // Получение элементов полей формы
        const $formInputs: HTMLFormControlsCollection = $form.elements

        // Скопировать объект Состояния useFormHandler
        const newFormState = {...formState}
        newFormState.fields = {...newFormState.fields}

        // Перебрать поля объекта Состояния
        for (let key in newFormState.fields) {

            // Ссылка на текущее поле формы
            // @ts-ignore
            const $field = $formInputs[key]

            // Тип поля: text, select, checkbox, radio или button
            const fieldType = getFieldType( $field )

            // Сколько значений будет возращать поле: zero, one или many
            // @ts-ignore
            const valueCount = getValueCount( $formInputs[key], fieldType )

            // Дополнение объекта с данными поля
            newFormState.fields[key] = {
                ...newFormState.fields[key],
                $field,
                fieldType,
                valueCount
            }
        }

        // Установка ссылки на элемент формы
        newFormState.form.$form = $form

        // Установка объекта с данными поля в Состояние формы
        setFormState(newFormState)
    }, [$form])
}

/**
 * Функция возращает тип поля: text, select, checkbox, radio или button
 * @param {HTMLFormElement} $input — поле формы
 */
function getFieldType($input: HTMLInputElement): FHTypes.FieldType {

    // Текущее поле
    let $thisInput = $input
    // Если передана группа полей ввода (флаги или переключатели), то взять первый элемент
    // @ts-ignore
    if ($input.length) $thisInput = $input[0]

    // Название тега
    const tagName = $thisInput.tagName.toLowerCase()

    // Если тег input, то возвратить checkbox, radio или text
    if (tagName === 'input') {
        if ($thisInput.type === 'checkbox') return 'checkbox'
        else if ($thisInput.type === 'radio') return 'radio'
        return 'text'
    }
    // Если тег button, то возвратить button
    else if (tagName === 'button') {
        return 'button'
    }

    // Во всех остальных случаях это будет выпадающий список
    return 'select'
}

/**
 * Функция определяет сколько значений поля будет отдавать расширение:
 * zero — ни одного значения (это кнопка);
 * one — строка с одним значением;
 * many — массив с несколькими значениями.
 * @param {HTMLFormElement} $input — поле формы
 * @param {String} inputType — тип поля: text, select, checkbox или radio
 */
function getValueCount($input: HTMLFormElement, inputType: FHTypes.FieldType): FHTypes.ValueCount {

    if (inputType === 'button'){
        return 'zero'
    }
    else if (inputType === 'select') {
        if ($input.multiple) return 'many'
        else return 'one'
    }
    else if (inputType === 'text' || inputType === 'radio') {
        return 'one'
    }
    else {
        return 'many'
    }
}
