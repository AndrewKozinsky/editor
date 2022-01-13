import React, { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import StoreArticleTypes from 'store/article/articleTypes'

/** Хук ставит на document iFrame-а обработчик нажатий клавиш */
export default function useSetKeyDownHandlerForText() {
    const { $links } = useGetArticleSelectors()
    const [handlerSet, setHandlerSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerSet) return

        $links.$document.addEventListener('keydown', keyDownHandler)
        $links.$document.addEventListener('paste', pasteHandler)

        setHandlerSet(true)
    }, [$links, handlerSet])
}

/**
 * Обработчик нажатия клавиши на документе iFrame-а
 * @param {KeyboardEvent} e — объект события
 */
function keyDownHandler(e: KeyboardEvent) {
    if (
        // Если текст копируют или вставляют...
        (e.metaKey && (e.code == 'KeyC' || e.code == 'KeyV')) ||
        // Если открывают инструменты разработчика...
        (e.altKey && e.metaKey && e.code == 'KeyI')
    ) {
        // ...то ничего не делать
        return
    }
    else {
        // Предотвратить установку напечатанного символа в <text-component>
        // Потому что напечатанный символ сначала будет попадать в Хранилище
        // и после React перерисует текстовый узел
        //
        e.preventDefault()
    }

    // Получение объекта с данными по введённому символу
    const letterObjData = getLetterObjData(e)

    store.dispatch(
        articleActions.setPressedKey(letterObjData)
    )
}

/**
 * Функция создаёт и возвращает объект с данными о нажатой клавише
 * @param {Object} e — объект события нажатия клавиши
 */
function getLetterObjData(e: KeyboardEvent): StoreArticleTypes.PressedKey {
    const resultObj: StoreArticleTypes.PressedKey = {
        code: e.code,
        altKey: e.altKey || false,
        ctrlKey: e.metaKey || false,
        shiftKey: e.shiftKey || false
    }

    // Клавиши, которые не нужно обрабатывать
    const wrongKeys = [
        'Escape', 'Enter', 'Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab',
        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ]

    if (wrongKeys.indexOf(e.key) !== -1) {
        resultObj.code = null
    }

    // Символьные клавиши
    const rightCodes = [
        'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0',
        'Minus', 'Equal','Space',
        'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',
        'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash',
        'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
    ]

    if ( rightCodes.includes(e.code) ) {
        resultObj.code = 'Text' // Обозначить, что нажали символьную клавишу
        resultObj.value = e.key.toString()
    }

    return resultObj
}

function pasteHandler(e: ClipboardEvent) {
    const clipboardData = e.clipboardData.getData('text/plain')
    e.preventDefault()

    const letterObjData = {
        code: 'Text', // Тип клавиши. null обозначает необрабатываемую клавишу, Text символьная, остальные значения берутся из e.code
        value: clipboardData,
        altKey: false,
        ctrlKey: false,
        shiftKey: false,
    }

    store.dispatch(
        articleActions.setPressedKey(letterObjData)
    )
}
