import {useEffect} from 'react'
import {makeCN} from 'utils/StringUtils'
import { ButtonPropType } from './Button'
import StoreSettingsTypes from 'store/settings/settingsTypes'

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 * @param {String} size — размер элемента.
 * @param {Boolean} block — должна ли кнопка быть блочным элементом на всю ширину
 */
export function getButtonClasses(buttonProps: ButtonPropType, size: StoreSettingsTypes.EditorSize, block: boolean) {
    const {
        view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значёк)
        color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
    } = buttonProps

    // Классы кнопки
    const CN = 'btn'
    const classes = [CN]

    // Размер кнопки.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    // Вид кнопки.
    // standard (стандартная кнопка), onlyIcon (только значёк).
    if (view === 'standard') classes.push(`${CN}--standard-view`)

    // Цвет кнопки.
    // base (стандартный цвет), accent (акцентный цвет)
    if (color === 'base') classes.push(`${CN}--base-color`)
    if (color === 'accent') classes.push(`${CN}--accent-color`)

    // Если кнопка должна быть блочным элементом на всю ширину
    if (block) classes.push(`${CN}--block`)

    return makeCN(classes)
}


/**
 * Функция возвращает классы загрузчика кнопки
 * @param {String} size — размер загрузчика
 */
export function getButtonLoaderClasses(size: StoreSettingsTypes.EditorSize) {

    // Классы кнопки
    const CN = 'btn-loader'
    const classes = [CN]

    // Размер загрузчика.
    // tiny (крошечная), small (маленькая), middle (средняя), big (большая)
    classes.push(`${CN}--${size}-size`)

    return makeCN(classes)
}


/**
 * Хук при необходимости устанавливает фокус на кнопку
 * @param {Object} buttonRef
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(buttonRef: any, autoFocus: boolean | number) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            buttonRef.current.focus()
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { buttonRef.current.focus() }, autoFocus)
        }
    }, [])
}