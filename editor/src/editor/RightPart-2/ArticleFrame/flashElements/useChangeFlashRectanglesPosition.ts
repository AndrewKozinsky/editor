import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import setSizeAndPosition from './setSizeAndPosition'


/** The hooks create Observers to watch for a flashed rectangles attributes */
export default function useChangeFlashRectanglesPosition() {
    const { $links } = useGetArticleSelectors()
    const [observersHaveBeenSet, setObserversHaveBeenSet] = useState(false)

    useEffect(function () {
        if (observersHaveBeenSet || !$links.$body) return

        // Links of flashed rectangles
        const $hoverRect = $links.$body.querySelector('[data-em-hover-rect]') as HTMLElement
        const $selectRect = $links.$body.querySelector('[data-em-select-rect]') as HTMLElement
        const $moveHoverRect = $links.$body.querySelector('[data-em-move-hover-rect]') as HTMLElement
        const $moveSelectRect = $links.$body.querySelector('[data-em-move-select-rect]') as HTMLElement

        // Set Observers to watch attributes changing on the body
        // and to correct flashed rectangles visibility, size and position
        observeReactCoordsProps($links, 'hover', $hoverRect)
        observeReactCoordsProps($links, 'select', $selectRect)
        observeReactCoordsProps($links, 'movehover', $moveHoverRect)
        observeReactCoordsProps($links, 'moveselect', $moveSelectRect)

        // Set the flag that Observers were set.
        setObserversHaveBeenSet(true)
    }, [$links, observersHaveBeenSet])
}

/**
 * The function creates an Observer to watch attributes changing on the body
 * It runs a function to correct flashed rectangles visibility, size and position
 * @param {Object} $links — объект ссылок на элементы iFrame.
 * @param {String} type — type of a flashed rectangle: hover or select
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
function observeReactCoordsProps(
    $links: StoreArticleTypes.LinksObj,
    type: 'hover' | 'select' | 'movehover' | 'moveselect',
    $flashRect: HTMLElement
) {

    const observer = new MutationObserver((mutationRecords) => {
        // Get string with coordinates of the flashed element in an article
        const rectCoordsStr = $links.$body.getAttribute(type + 'rectcoords')

        if (rectCoordsStr) {
            let rectCoords = JSON.parse(rectCoordsStr)
            // Correct flashed rectangles visibility, size and position
            setSizeAndPosition($links, type, rectCoords, $flashRect)
        }
    })

    observer.observe($links.$body, {
        attributes: true, attributeFilter: [type + 'rectcoords']
    })
}
