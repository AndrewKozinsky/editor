import {makeCN} from 'utils/StringUtils'
import { TextInputPropType } from './TextInput'
import {EditorSizeType} from '../../../store/settings/settingsTypes';

/**
 * Функция возвращает классы выпадающего списка
 * @param size — размер элемента.
 */
export function getClasses(size: EditorSizeType) {

    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}