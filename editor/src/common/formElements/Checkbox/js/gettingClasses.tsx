import React from 'react'
import { CheckboxPropType } from '../Checkbox'
import {makeCN} from 'src/utils/StringUtils'

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param {Object} checkboxProps — props переданные во флаг.
 */
export function getLabelClasses(checkboxProps: CheckboxPropType) {
    const {
        size = 'small' // Размер поля: small (маленькое), middle (среднего размера), big
    } = checkboxProps

    // Классы обёртки
    const CN = 'checkbox-label'
    const classes = [CN]

    // Размер обёртки списка.
    if (size === 'small')  classes.push(`${CN}--small-size`)
    if (size === 'middle')  classes.push(`${CN}--middle-size`)
    if (size === 'big') classes.push(`${CN}--big-size`)

    return makeCN(classes)
}