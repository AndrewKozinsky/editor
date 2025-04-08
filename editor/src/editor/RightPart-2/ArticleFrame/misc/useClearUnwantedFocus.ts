import { useEffect } from 'react'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import {getState} from 'utils/miscUtils'

/**
 * Функция убирает фокус если выделен не текстовый компонент.
 * Эта корректировка требуется потому что при щелчке по статье фокус получает ближайший текстовый компонент,
 * хотя ничего не выделяется или выделяется не текстовый компонент
 */
export function useClearUnwantedFocus() {
    const { $links } = useGetArticleSelectors()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()

    useEffect(function () {
        if (!$links || !flashedElems) return
        const { selectedElem } = flashedElems

        // Если не выбран текстовый компонент и есть элемент на котором стоит фокус
        if (selectedElem.tagType !== 'textComponent' && $links.$document.activeElement) {
            setTimeout(function () {
                const activeElement = $links.$document.activeElement as HTMLElement
                activeElement.blur()
            }, 0)
        }
    }, [flashedElems])
}

/** Хук ставит обработчик на щелчок по статье. Если в данных нет выделенных элементов, то фокус убирается. */
export function useBlurAfterClickOnWhiteSpace() {
    const { $links } = useGetArticleSelectors()

    useEffect(function () {
        if (!$links || !$links.$document) return

        $links.$document.addEventListener('click', () => {
            blurAfterClickOnWhiteSpace($links.$window, $links.$document)
        })
    }, [$links])
}

/**
 * Обработчик щелчка по статье. Убирает фокус если в данных статьи нет выделенных элементов.
 * @param {Window} $window — window статьи
 * @param {Document} $document — document статьи
 */
function blurAfterClickOnWhiteSpace($window: StoreArticleTypes.WindowLink, $document: StoreArticleTypes.DocumentLink) {
    const { history, historyCurrentIdx } = getState().article
    const historyItem = history[historyCurrentIdx]
    const { selectedElem } = historyItem

    if (!selectedElem.tagType) {
        // Убрать фокус
        const activeElement = $document.activeElement as HTMLElement
        activeElement.blur()

        // Убрать выделение с текста
        const { $window } = getState().article.$links
        const selection = $window.getSelection()
        selection.empty()
    }
}