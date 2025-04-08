import { useEffect } from 'react'
import { getPressedKeys } from 'utils/getPressedKeys'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import {
    changeSelectedItemVisibility,
    cloneSelectedItem,
    deleteSelectedItem,
    moveSelectedItem, saveArticle,
    undoRedoArticleHistory,
    upDownSelectedItem
} from './hotKeys'


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

        // Сохранение статьи
        saveArticle(e, pressedKeys)

        // Making undo or redo history step in article
        undoRedoArticleHistory(e, pressedKeys)

        // Удаление выделенного компонента/элемента
        deleteSelectedItem(e, pressedKeys)

        // Изменение видимости выделенного компонента/элемента
        changeSelectedItemVisibility(e, pressedKeys)

        // Клонирование выделенного компонента или элемента
        cloneSelectedItem(e, pressedKeys)

        // Изменения порядка выделенного компонента или элемента
        upDownSelectedItem(e, pressedKeys)

        // Перемещение компонента выделенного для перемещения внутрь выделенного элемента
        // или левее/правее выделенного компонента
        moveSelectedItem(e, pressedKeys)
    }
}
