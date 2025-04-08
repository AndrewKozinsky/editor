import { useEffect } from 'react'

/**
 * Хук при необходимости устанавливает фокус на поле ввода
 * @param {Object} inputRef — ссылка на элемент
 * @param {Boolean | Number} autoFocus — или булево значение нужно ли ставить фокусировку или число сообщающее задержку,
 * с которой нужно поставить фокусировку.
 */
export function useSetFocus(inputRef: any, autoFocus: boolean | number) {
    // Нужно ли ставить фокусировку
    useEffect(function () {
        // Если нужно ставить фокусировку
        if (autoFocus === true) {
            inputRef?.current?.focus()
        }
        // Если нужно поставить фокусировку с некоторой задержкой
        else if (typeof autoFocus === 'number') {
            setTimeout(function () { inputRef.current.focus() }, autoFocus)
        }
    }, [])
}
