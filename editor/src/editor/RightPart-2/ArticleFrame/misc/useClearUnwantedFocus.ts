import { useEffect } from 'react'
import articleManager from 'articleManager/articleManager'
import useGetArticleSelectors from 'store/article/articleSelectors'

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
