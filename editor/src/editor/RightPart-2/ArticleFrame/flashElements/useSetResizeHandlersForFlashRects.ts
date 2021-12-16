import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import { FlashRectType, setSizeAndPosition } from './setSizeAndPosition'

/** The hook sets resize and scroll handlers to IFrame document. */
export function useSetResizeHandlersForFlashRects() {
    const { $links, history } = useGetArticleSelectors()
    // Were handlers set?
    const [handler, setHandler] = useState(null)

    useEffect(function () {
        if (!$links.$document || !$links.$window || handler !== null || !history.length) return

        // Links of flashed rectangles
        const hoverRect = $links.$body.querySelector('[data-em-hover-rect]') as HTMLElement
        const selectRect = $links.$body.querySelector('[data-em-select-rect]') as HTMLElement
        const moveHoverRect = $links.$body.querySelector('[data-em-move-hover-rect]') as HTMLElement
        const moveSelectRect = $links.$body.querySelector('[data-em-move-select-rect]') as HTMLElement

        // Получить ссылку на обработчик событий resize и scroll
        // Ссылка нужна чтобы была возможность удалить этот обработчик. Поэтому она сохраняется через useState()
        const resizeHandler = getResizeHandler($links, hoverRect, selectRect, moveHoverRect, moveSelectRect)
        setHandler(resizeHandler)

        $links.$window.addEventListener('resize', resizeHandler)
        $links.$document.addEventListener('scroll', resizeHandler)
    }, [$links, handler, history])

    useEffect(function () {
        if ($links.$document && !history.length) {
            setHandler(null)

            $links.$window.removeEventListener('resize', handler)
            $links.$document.removeEventListener('scroll', handler)
        }
    }, [history, $links])
}

/**
 * Обработчик изменения размера окна и прокрутки.
 * Функция запускает функцию пересчёта положения подсвечивающих прямоугольников.
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {HTMLElement} hoverRect — ссылка на прямоугольник наведения
 * @param {HTMLElement} selectRect — ссылка на прямоугольник выделения
 * @param {HTMLElement} moveHoverRect — ссылка на прямоугольник наведения для перемещения
 * @param {HTMLElement} moveSelectRect — ссылка на прямоугольник выделения для перемещения
 */
function getResizeHandler(
    $links: StoreArticleTypes.LinksObj,
    hoverRect: HTMLElement,
    selectRect: HTMLElement,
    moveHoverRect: HTMLElement,
    moveSelectRect: HTMLElement,
) {
    return function () {

        const rects: {type: FlashRectType, $rect: HTMLElement}[]  = [
            { type: 'hover', $rect: hoverRect },
            { type: 'select', $rect: selectRect },
            { type: 'movehover', $rect: moveHoverRect },
            { type: 'moveselect', $rect: moveSelectRect }
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
