import React from 'react'
import { makeCN } from 'utils/StringUtils'
import { EditorSizeType } from 'store/settings/settingsTypes';

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param size — размер элемента.
 */
export function getLabelClasses(size: EditorSizeType) {

    // Классы обёртки
    const CN = 'radio-label'
    const classes = [CN]

    // Размер обёртки списка.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}