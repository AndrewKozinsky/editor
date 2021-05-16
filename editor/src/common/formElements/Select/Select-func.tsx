import React from 'react'
import StoreSettingsTypes from 'store/settings/settingsTypes';
import { SelectPropType } from "./Select"
import {makeCN} from 'utils/StringUtils'
import SvgIcon from '../../icons/SvgIcon'
import { MiscTypes } from 'types/miscTypes'
import {OptionsType} from './SelectTypes';


/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param size — размер элемента.
 * @param {Boolean} isFocus — находится ли <select> в фокусе.
 */
export function getWrapperClasses(size: StoreSettingsTypes.EditorSize, isFocus: boolean) {

    // Классы обёртки
    const CN = 'select-input-wrapper'
    const classes = [CN]

    // Размер обёртки списка.
    classes.push(`${CN}--${size}-size`)

    // Если есть фокусировка
    if (isFocus)  classes.push(`${CN}--focus`)

    return makeCN(classes)
}


/**
 * Функция возвращает классы выпадающего списка
 * @param size — размер элемента.
 */
export function getClasses(size: StoreSettingsTypes.EditorSize) {

    // Классы
    const CN = 'select-input'
    const classes = [CN]

    // Размер выпадающего списка.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}


/**
 * Функция возращает значёк со стрелочками, который есть в выпадающем списке справа.
 * Будет возвращён разный размер значка в зависимости от переданного размера самого выпадающего списка
 * @param size: EditorSizeType
 */
export function getArrowIcon(size: StoreSettingsTypes.EditorSize): null | JSX.Element {

    // Размер выпадающего списка.
    if (size === 'small') return <SvgIcon type='selectInputSmallArrows' />
    if (size === 'middle') return <SvgIcon type='selectInputMiddleArrows' />
    if (size === 'big') return <SvgIcon type='selectInputBigArrows' />

    return null
}


/**
 * Функция возращает массив тегов <option>
 * @param {Array} options — массив пунктов выпадающего списка
 */
export function getOptions(options: OptionsType) {

    // Генерация массива тегов <option>
    return options.map(function (option, i) {

        // Атрибуты <option>
        const optionAttrs: MiscTypes.ObjStringKeyAnyVal = {
            value: option.value,
            key: i
        }

        // Если <option> заблокирован
        if (option.disabled) optionAttrs.disabled = true

        return <option {...optionAttrs}>{option.label}</option>
    })
}