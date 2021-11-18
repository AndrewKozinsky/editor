import { useEffect } from 'react'

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
