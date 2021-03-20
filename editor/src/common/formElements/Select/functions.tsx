import React from 'react'
import { SelectPropType } from "./Select"
import {makeCN} from 'utils/StringUtils'
import SvgIcon from '../../icons/SvgIcon'
import { ObjStringKeyAnyVal } from 'types/miscTypes'


/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {Object} selectProps — props переданные в выпадающий список.
 * @param {Boolean} isFocus — находится ли <select> в фокусе.
 */
export function getWrapperClasses(selectProps: SelectPropType, isFocus: boolean) {
    const {
        size = 'small' // Размер поля: small (маленькое), middle (среднего размера), big
    } = selectProps

    // Классы обёртки
    const CN = 'select-input-wrapper'
    const classes = [CN]

    // Размер обёртки списка.
    if (size === 'small')  classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)
    if (size === 'big') classes.push(`${CN}--big-size`)

    // Если есть фокусировка
    if (isFocus)  classes.push(`${CN}--focus`)

    return makeCN(classes)
}


/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} selectProps — props переданные в выпадающий список
 */
export function getClasses(selectProps: SelectPropType) {
    const {
        size = 'small' // Размер поля: small (маленькое), middle (среднего размера)
    } = selectProps

    // Классы
    const CN = 'select-input'
    const classes = [CN]

    // Размер выпадающего списка.
    if (size === 'small') classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)
    if (size === 'big') classes.push(`${CN}--big-size`)

    return makeCN(classes)
}


/**
 * Функция возращает значёк со стрелочками, который есть в выпадающем списке справа.
 * Будет возвращён разный размер значка в зависимости от переданного размера самого выпадающего списка
 * @param {Object} selectProps параметры переданные в компонент выпадающего списка.
 */
export function getArrowIcon(selectProps: SelectPropType): null | JSX.Element {
    const {
        size = 'small' // Размер поля: small (маленькое), middle (среднего размера)
    } = selectProps

    // Размер выпадающего списка.
    if (size === 'small') return <SvgIcon type='selectInputSmallArrows' />
    if (size === 'middle') return <SvgIcon type='selectInputMiddleArrows' />
    if (size === 'big') return <SvgIcon type='selectInputBigArrows' />

    return null
}


/**
 * Функция возращает массив тегов <option>
 * @param {Object} selectProps — props переданные в выпадающий список
 */
export function getOptions(selectProps: SelectPropType) {

    const {
        options // Массив объектов с данными по которым будут генерироваться <option>
    } = selectProps

    // Генерация массива тегов <option>
    return options.map(function (option, i) {

        // Атрибуты <option>
        const optionAttrs: ObjStringKeyAnyVal = {
            value: option.value,
            key: i
        }

        // Если <option> заблокирован
        if (option.disabled) optionAttrs.disabled = true

        return <option {...optionAttrs}>{option.value}</option>
    })
}