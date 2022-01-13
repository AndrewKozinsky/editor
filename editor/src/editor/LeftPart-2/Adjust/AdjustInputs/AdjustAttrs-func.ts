// import { useEffect, useState } from 'react'
// import articleManager from 'articleManager/articleManager'
import { AdjInputsType } from './AdjustInputs'

// Функция возвращает пример объекта конфигурации для отрисовки полей изменения атрибутов выделенного элемента.
// Потом можно удалить
export function getTagInputsConfigExample(): AdjInputsType[] {
    return [
        {
            type: 'text',
            data: {
                label: 'Тег',
                name: 'name',
                value: 'value',
                onChange: () => {},
            }
        }
    ]
}


export function getAttrsInputsConfigExample(): AdjInputsType[] {
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
