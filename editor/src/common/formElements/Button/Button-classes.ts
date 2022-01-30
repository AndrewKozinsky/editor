import { makeCN } from 'utils/stringUtils'
import { ButtonPropType } from './Button'
import './Button.scss'

const CN = 'btn'

/** Функция возвращающая классы для элементов */
export default function makeClasses(buttonProps: ButtonPropType) {
    return {
        root: getButtonClasses(buttonProps),
        icon: `${CN}__icon`
    }
}

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
export function getButtonClasses(buttonProps: ButtonPropType) {
    const {
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        block,
        big = false,
        align,
        extraClass
    } = buttonProps

    // Классы кнопки
    const classes = [CN]

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значок).
    if (view === 'standard') classes.push(`${CN}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${CN}--base-color`)
    if (color === 'accent') classes.push(`${CN}--accent-color`)

    // Если кнопка должна быть блочным элементом на всю ширину
    if (block) classes.push(`${CN}--block`)
    // Add class if button must be big
    if (big) classes.push(`${CN}--big`)

    if (align) classes.push(`${CN}--${align}`)
    if (extraClass) classes.push(extraClass)

    return makeCN( classes )
}
