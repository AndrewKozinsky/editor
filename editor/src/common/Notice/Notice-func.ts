import { makeCN } from 'utils/StringUtils'
import { NoticePropType } from './Notice'

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} props — объект со свойствами переданный в компонент
 */
export function getNoticeWrapperClasses(props: NoticePropType) {

    const {
        type
    } = props

    // Классы обёртки уведомления
    const CN = 'notice'
    const classes = [CN]

    // Тип уведомления
    if (type === 'standard') classes.push(CN + '--standard')
    if (type === 'error') classes.push(CN + '--error')
    if (type === 'success') classes.push(CN + '--success')

    return makeCN(classes)
}
