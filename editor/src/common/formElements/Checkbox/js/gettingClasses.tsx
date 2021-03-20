import React from 'react'
import { CheckboxPropType } from '../Checkbox'
import {makeCN} from 'src/utils/StringUtils'
import {EditorSizeType} from '../../../../store/settings/settingsTypes';

/**
 * Функция возвращает классы обёртки выпадающего списка.
 * @param size — размер элемента.
 */
export function getLabelClasses(size: EditorSizeType) {

    // Классы обёртки
    const CN = 'checkbox-label'
    const classes = [CN]

    // Размер обёртки списка.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}