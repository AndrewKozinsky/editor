import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { AdjTextInputsType } from './AdjustInputs'

/** Хук возвращает булево значение нужно ли отрисовывать поля ввода
 * изменения атрибутов выделенного элемента */
export function useIsVisible() {
    const [isVisible, setIsVisible] = useState(false)

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        const { tElem } = flashedElemInfo

        setIsVisible(!!tElem)
    }, [flashedElemInfo])

    return isVisible
}

// Функция возвращает пример объекта конфигурации для отрисовки полей ввода
// изменения атрибутов выделенного элемента. Потом можно удалить
export function getInputsConfigExample(): AdjTextInputsType[] {
    return [
        {
            type: 'text',
            data: {
                label: 'Подпись 1',
                grayText: '(class)',
                name: 'name',
                value: 'value',
                onChange: () => {},
            }
        },
        {
            type: 'checkbox',
            data: {
                label: 'Подпись 2',
                grayText: '(class)',
                inputType: 'checkbox',
                groupName: 'Group name',
                inputsArr: [
                    {label: 'Значение 1', value: 'value 1', grayText: 'class'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: ['value 1'],
                onChange: () => {},
            }
        },
        {
            type: 'radio',
            data: {
                label: 'Подпись 3',
                grayText: '(class)',
                inputType: 'radio',
                groupName: 'Group name',
                inputsArr: [
                    {label: 'Значение 1', value: 'value 1'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: ['value 1'],
                onChange: () => {},
            }
        },
        {
            type: 'select',
            data: {
                label: 'Подпись 4',
                grayText: '(class)',
                name: 'Имя списка',
                options: [
                    {label: 'Значение 1', value: 'value 1'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: 'value 1',
                onChange: () => {},
            }
        }
    ]
}
