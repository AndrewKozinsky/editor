import { makeCN } from 'utils/StringUtils'
import './TextInput.scss'

const textInputRootClass = 'text-input'

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
    const classes = [textInputRootClass]

    // Добавление максимальной ширины при необходимости
    if (maxWidth) {
        classes.push(`${textInputRootClass}--maxWidth-${maxWidth}`)
    }

    return makeCN(classes)
}
