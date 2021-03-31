import {useEffect} from 'react'
import {FieldTypeType, StateType, ValueCountType } from '../types'

import {FormType} from './useGetForm'


/**
 * Функция дополняет значения полей формы.
 * @param {Object} formState — объект состояния useFormHandler
 * @param {Function} setFormState — функция устанавливающая новое Состояние useFormHandler
 * @param {Element} $form — ссылка на элемент формы
 */
export default function useSupplementFieldData(
    formState: StateType, setFormState: SetFormStateType, $form: FormType
) {

    useEffect(function () {
        // Завершить функцию если нет ссылки на форму
        if (!$form) return

        // Получение полей формы
        // @ts-ignore
        const $formInputs: HTMLFormElement = $form.elements

        // Скопировать объект Состояния useFormHandler
        const newFormState = {...formState}
        newFormState.fields = {...newFormState.fields}

        // Перебрать поля объекта Состояния
        for (let key in newFormState.fields) {

            // Тип поля: text, select, checkbox или radio
            const fieldType = getFieldType( $formInputs[key] )

            // Сколько значений поле будет возращать: one или many
            const valueCount = getValueCount( $formInputs[key], fieldType )

            newFormState.fields[key] = {
                ...newFormState.fields[key],
                fieldType,
                valueCount
            }
        }

        setFormState(newFormState)

    }, [$form])
}

/**
 * Функция возращает тип поля: text, select, checkbox или radio
 * @param {HTMLFormElement} $input — поле формы
 */
function getFieldType($input: HTMLInputElement): FieldTypeType {

    let $thisInput = $input
    // Если передана группа полей ввода (флаги или переключатели)
    // @ts-ignore
    if ($input.length) $thisInput = $input[0]

    if ($thisInput.tagName.toLowerCase() === 'input') {
        return <FieldTypeType>$thisInput.type
    }

    return 'select'
}

/**
 * Функция определяет сколько значений поля будет отдавать расширение:
 * one — строка с одним значением; many — массив с несколькими значениями если тип поля это предполагает.
 * @param {HTMLFormElement} $input — поле формы
 * @param {String} inputType — тип поля: text, select, checkbox или radio
 */
function getValueCount($input: HTMLFormElement, inputType: FieldTypeType): ValueCountType {

    if (inputType === 'select') {
        if ($input.multiple) return 'many'
        else return 'one'
    }
    else if (inputType === 'text' || inputType === 'radio') return 'one'
    return 'many'
}