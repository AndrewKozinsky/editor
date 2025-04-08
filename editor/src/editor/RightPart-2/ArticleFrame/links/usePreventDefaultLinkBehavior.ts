import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

/** Хук ставит обработчик щелчка по статье для предотвращения перехода по ссылке */
export function usePreventDefaultLinkBehavior() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Set handlers
        $links.$document.addEventListener('click', preventDefaultLinkBehavior)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links])
}

/**
 * Обработчик щелчка мышью в статье
 * @param {Object} e — объект события
 */
function preventDefaultLinkBehavior(e: MouseEvent) {
    const target = e.target as Element

    if (target.closest('a')) {
        e.preventDefault()
    }
}
