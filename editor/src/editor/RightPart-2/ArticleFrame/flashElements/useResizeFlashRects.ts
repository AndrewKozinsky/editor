import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import { FlashRectType, setSizeAndPosition } from './setSizeAndPosition'

/** The hook sets resize and scroll handlers to IFrame document. */
export function useSetResizeHandlersForFlashRects() {
    const { $links, history } = useGetArticleSelectors()
    // Were resize and scroll handlers set?
    const [handlersSet, setHandlerSet] = useState(false)
    // Ссылка на подсвечивающие прямоугольники
    const resizeHandler = useGetResizeHandler()

    useEffect(function () {
        if (!resizeHandler) return

        if (!handlersSet) {
            $links.$window.addEventListener('resize', resizeHandler)
            $links.$document.addEventListener('scroll', resizeHandler)
            setHandlerSet(true)
        }

        setTimeout(resizeHandler, 0)
    }, [resizeHandler, handlersSet, history.length])
}


function useGetResizeHandler() {
    const { $links } = useGetArticleSelectors()

    const [calcRectCoords, setCalcRectCoords] = useState<null | (() => void)>(null)

    useEffect(function () {
        if (!$links.$document) return

        const $hoverRect = $links.$body.querySelector('[data-em-hover-rect]') as HTMLElement
        const $selectRect = $links.$body.querySelector('[data-em-select-rect]') as HTMLElement
        const $moveHoverRect = $links.$body.querySelector('[data-em-move-hover-rect]') as HTMLElement
        const $moveSelectRect = $links.$body.querySelector('[data-em-move-select-rect]') as HTMLElement

        const fn = getCalcRectCoords($links, $hoverRect, $selectRect, $moveHoverRect, $moveSelectRect)
        setCalcRectCoords(() => fn)
    }, [$links])

    return calcRectCoords
}

/**
 * Обработчик изменения размера окна и прокрутки.
 * Функция запускает функцию пересчёта положения подсвечивающих прямоугольников.
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {HTMLElement} $hoverRect — ссылка на прямоугольник наведения
 * @param {HTMLElement} $selectRect — ссылка на прямоугольник выделения
 * @param {HTMLElement} $moveHoverRect — ссылка на прямоугольник наведения для перемещения
 * @param {HTMLElement} $moveSelectRect — ссылка на прямоугольник выделения для перемещения
 */
function getCalcRectCoords(
    $links: StoreArticleTypes.LinksObj,
    $hoverRect: HTMLElement,
    $selectRect: HTMLElement,
    $moveHoverRect: HTMLElement,
    $moveSelectRect: HTMLElement,
) {
    return function () {

        const rects: {type: FlashRectType, $rect: HTMLElement}[]  = [
            { type: 'hover', $rect: $hoverRect },
            { type: 'select', $rect: $selectRect },
            { type: 'movehover', $rect: $moveHoverRect },
            { type: 'moveselect', $rect: $moveSelectRect }
        ]

        for (let i = 0; i < rects.length; i++) {
            const rectData = rects[i]
            const rectCoordsStr = $links.$body.getAttribute(rectData.type + 'rectcoords')

            if (rectCoordsStr) {
                let rectCoords = JSON.parse(rectCoordsStr)
                // Correct flashed rectangles visibility, size and position
                setSizeAndPosition($links, rectData.type, rectCoords, rectData.$rect)
            }
        }
    }
}
