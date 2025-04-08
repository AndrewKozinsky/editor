import React from 'react'
import { OptionsType } from './SelectTypes'
import { MiscTypes } from 'types/miscTypes'


/**
 * Функция возвращает массив тегов <option>
 * @param {Array} options — массив пунктов выпадающего списка
 */
export function getOptions(options: OptionsType) {

    // Генерация массива тегов <option>
    return options.map(function (option, i) {

        // Атрибуты <option>
        const optionAttrs: MiscTypes.ObjStringKey<any> = {
            value: option.value,
            key: i
        }

        // Если <option> заблокирован
        if (option.disabled) optionAttrs.disabled = true

        return <option {...optionAttrs}>{option.label}</option>
    })
}
