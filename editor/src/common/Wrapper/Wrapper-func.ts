import {ButtonPropType} from '../formElements/Button/Button';
import StoreSettingsTypes from '../../store/settings/settingsTypes';
import {makeCN} from '../../utils/StringUtils';
import {WrapperPropType} from './Wrapper';

/**
 * Функция возвращает классы выпадающего списка
 * @param {Object} wrapperProps — props переданные в обёртку
 * @param size — размер элемента.
 * @param gap — отступ между элементами внутри компонента.
 */
export function getWrapperClasses(wrapperProps: WrapperPropType, size: StoreSettingsTypes.EditorSize, gap?: number) {
    const {
        align,
        t,        // Отступ сверху
        b         // Отступ снизу
    } = wrapperProps


    const CN = 'wrapper'
    let classes = [CN]

    // Добавление класса дающую выравнивание
    if (align === 'center') classes.push(CN + '--align-center')
    if (align === 'right')  classes.push(CN + '--align-right')

    // Добавление класса дающего верхний оступ
    if (t) classes.push(CN + '--t' + t)

    // Добавление класса дающего нижний оступ
    if (b) classes.push(CN + '--b' + b)

    // Добавление класса дающего отступ между элементами внутри обёртки
    if (gap) classes.push(CN + '--gap' + gap)

    // Размер отступа.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)


    return makeCN(classes)
}