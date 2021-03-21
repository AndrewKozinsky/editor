import {ButtonPropType} from '../formElements/Button/Button';
import {EditorSizeType} from '../../store/settings/settingsTypes';
import {makeCN} from '../../utils/StringUtils';
import {WrapperPropType} from './Wrapper';

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} wrapperProps — props переданные в обёртку
 * @param size — размер элемента.
 */
export function getWrapperClasses(wrapperProps: WrapperPropType, size: EditorSizeType) {
    const {
        align,
        t,        // Отступ сверху
        b         // Отступ снизу
    } = wrapperProps


    const CN = 'margin'
    let classes = [CN]

    // Добавление класса дающую выравнивание
    if (align === 'center') classes.push(CN + '--align-center')
    if (align === 'right')  classes.push(CN + '--align-right')

    // Добавление класса дающего верхний оступ
    classes.push(CN + '--t' + t)

    // Добавление класса дающего нижний оступ
    classes.push(CN + '--b' + b)

    // Размер отступа.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)


    return makeCN(classes)
}