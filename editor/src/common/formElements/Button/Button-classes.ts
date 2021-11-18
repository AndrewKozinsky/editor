import { makeCN } from 'utils/StringUtils'
import { ButtonPropType } from './Button'
import './Button.scss'

const buttonRootClass = 'btn'

function makeClasses(buttonProps: ButtonPropType) {
    return {
        root: getButtonClasses(buttonProps),
        icon: `${buttonRootClass}__icon`
    }
}

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
export function getButtonClasses(buttonProps: ButtonPropType) {
    const {
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
        block,
        big = false,
        align,
        extraClass
    } = buttonProps

    // Классы кнопки
    const classes = [buttonRootClass]

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') classes.push(`${buttonRootClass}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${buttonRootClass}--base-color`)
    if (color === 'accent') classes.push(`${buttonRootClass}--accent-color`)

    // Если кнопка должна быть блочным элементом на всю ширину
    if (block) classes.push(`${buttonRootClass}--block`)
    // Add class if button must be big
    if (big) classes.push(`${buttonRootClass}--big`)

    if (align) classes.push(`${buttonRootClass}--${align}`)
    if (extraClass) classes.push(extraClass)

    return makeCN( classes )
}

export default makeClasses
