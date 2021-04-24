import StoreSettingsTypes from 'store/settings/settingsTypes'
import { makeCN } from 'utils/StringUtils'
import { NoticePropType } from './Notice'

/**
 * Функция возвращает классы выпадающего списка
 * @param props —
 * @param size — размер элемента.
 */
export function getNoticeWrapperClasses(props: NoticePropType, size: StoreSettingsTypes.EditorSize) {

    const {
        type
    } = props

    // Классы обёртки уведомления
    const CN = 'notice'
    const classes = [CN]


    if (type === 'standard') classes.push(CN + '--standard')
    if (type === 'error') classes.push(CN + '--error')
    if (type === 'success') classes.push(CN + '--success')

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}