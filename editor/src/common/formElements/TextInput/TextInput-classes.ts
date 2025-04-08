import { makeCN } from 'utils/stringUtils'
import './TextInput.scss'

const CN = 'text-input'

/** Функция возвращающая классы для элементов */
export default function makeClasses(maxWidth?: 250) {
    return {
        root: getTextInputClasses(maxWidth),
    }
}

/**
 * Функция возвращает классы выпадающего списка
 * @param maxWidth — максимальная ширина поля.
 */
export function getTextInputClasses(maxWidth?: 250) {
    // Классы
    const classes = [CN]

    // Добавление максимальной ширины при необходимости
    if (maxWidth) {
        classes.push(`${CN}--maxWidth-${maxWidth}`)
    }

    return makeCN(classes)
}
