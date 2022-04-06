import { useEffect } from 'react'
import { getPressedKeys } from 'utils/getPressedKeys'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import { undoRedoArticleHistory } from './hotKeys'


/* Хук ставит обработчик горячих клавиш на всё приложение */
export default function useSetShortcutsHandler() {
    const { $document } = useGetArticleSelectors().$links

    useEffect(function () {
        if (!$document) return

        $document.addEventListener('keydown', keydownHandler($document))
    }, [$document])
}


/**
 * Обработчик нажатий клавиш
 * @param {Object} $document — Document
 */
function keydownHandler($document: StoreArticleTypes.DocumentLink) {
    return function (e: KeyboardEvent) {
        // Object of pressed keys
        const pressedKeys = getPressedKeys(e)

        // Making undo or redo history step in article
        undoRedoArticleHistory(e, pressedKeys)
    }
}
