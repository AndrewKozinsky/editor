import StoreSettingsTypes from 'store/settings/settingsTypes'
import {makeCN} from 'utils/StringUtils'

/**
 * Функция возвращает классы заголовка компонента
 * @param {String} editorSize — размер интерфейса
 * @param {Number} type — тип компонента. 1 — большой, 2 — мелкий компонент
 */
export function getHeaderClasses(editorSize: StoreSettingsTypes.EditorSize, type: number) {

    // Классы обёртки
    const CN = 'name-section'

    // Классы заголовка
    // Вида: name-section__header name-section__header--type1--small-size
    const classes = [`${CN}__header`]
    classes.push(`${CN}__header--type${type}--${editorSize}-size`)

    return makeCN(classes)
}