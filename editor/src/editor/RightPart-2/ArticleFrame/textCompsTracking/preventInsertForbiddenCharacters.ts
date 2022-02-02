import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { isCtrlPressed } from 'utils/domUtils'

export function usePreventInsertForbiddenText() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Set handlers
        $links.$document.addEventListener('keydown', preventInsertForbiddenCharacters)
        $links.$document.addEventListener('paste', pasteHandler)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, handlerWasSet])
}

/**
 * Обработчик нажатия клавиш запрещающий действия по установки новой строки, установки жирного и курсивного текста,
 * запрет на Tab чтобы фокус не переходил на другое текстовое поле.
 * @param {Object} e — объект события нажатия клавиш
 */
function preventInsertForbiddenCharacters(e: KeyboardEvent) {
    const isCtrl = isCtrlPressed(e)

    if (
        ['Enter', 'Tab'].includes(e.key) ||
        e.code === 'KeyB' && isCtrl && !e.altKey ||
        e.code === 'KeyI' && isCtrl && !e.altKey
    ) {
        e.preventDefault()
    }
}

/** Обработчик вставки текста или файла */
function pasteHandler(e: ClipboardEvent) {
    const clipboardData = e.clipboardData.getData('text/plain')

    // Если вставляют файл, то в clipboardData будет пустая строка
    if (clipboardData === '') {
        e.preventDefault()
    }
}