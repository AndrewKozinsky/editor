import { makeCN } from 'utils/StringUtils'
import './NameSection.scss'

const rootClass = 'name-section'

function makeClasses(type: 1 | 2) {
    return {
        header: getHeaderClasses(type),
        bg: `${rootClass}__header-bg`
    }
}

/**
 * Функция возвращает классы заголовка компонента
 * @param {Number} type — тип компонента. 1 — большой, 2 — мелкий компонент
 */
export function getHeaderClasses(type: 1 | 2) {

    // Классы заголовка
    // Вида: name-section__header name-section__header--type1
    const classes = [`${rootClass}__header`]
    classes.push(`${rootClass}__header--type${type}`)

    return makeCN(classes)
}

export default makeClasses

