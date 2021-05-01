import {makeCN} from 'utils/StringUtils'
import StoreSettingsTypes from 'store/settings/settingsTypes'
import {useEffect} from 'react';

/**
 * Функция возвращает классы выпадающего списка
 * @param size — размер элемента.
 * @param maxWidth — максимальная ширина поля.
 */
export function getTextInputClasses(size: StoreSettingsTypes.EditorSize, maxWidth?: 250) {

    // Классы
    const CN = 'text-input'
    const classes = [CN]

    // Размер поля ввода.
    classes.push(`${CN}--${size}-size`)

    // Добавление максимальной ширины при необходимости
    if (maxWidth) {
        classes.push(`${CN}--maxWidth-${maxWidth}-${size}`)
    }

    return makeCN(classes)
}

/**
 * Хук при необходимости устанавливает фокус на поле ввода
 * @param {Object} inputRef
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(inputRef: any, autoFocus: boolean | number) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            inputRef.current.focus()
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { inputRef.current.focus() }, autoFocus)
        }
    }, [])
}