import {makeCN} from 'utils/StringUtils'
import { TextInputPropType } from './TextInput'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} selectProps — props переданные в текстовое поле
 */
export function getClasses(selectProps: TextInputPropType) {
    const {
        size = 'small', // Размер поля: small (маленькое), middle (среднего размера)
    } = selectProps

    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    if (size === 'small') classes.push(`${CN}--small-size`)
    if (size === 'middle') classes.push(`${CN}--middle-size`)
    if (size === 'big') classes.push(`${CN}--big-size`)

    return makeCN(classes)
}