// import { useEffect, useState } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import { setSizeAndPosition } from './setSizeAndPosition'


/** The hooks creates Observers to watch for a flashed rectangles attributes */
/*export function useChangeFlashElementsPosition() {
    const { $links, history } = useGetArticleSelectors()
    const [observersHaveBeenSet, setObserversHaveBeenSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || observersHaveBeenSet || !history.length) return

        // Links of flashed rectangles
        const hoverRect = $links.$body.querySelector('[data-em-hover-rect]') as HTMLElement
        const selectRect = $links.$body.querySelector('[data-em-select-rect]') as HTMLElement
        const moveHoverRect = $links.$body.querySelector('[data-em-move-hover-rect]') as HTMLElement
        const moveSelectRect = $links.$body.querySelector('[data-em-move-select-rect]') as HTMLElement

        // Set Observers to watch attributes changing on the body
        // and to correct flashed rectangles visibility, size and position
        observeReactCoordsProps($links.$body, 'hover', hoverRect)
        observeReactCoordsProps($links.$body, 'select', selectRect)
        observeReactCoordsProps($links.$body, 'movehover', moveHoverRect)
        observeReactCoordsProps($links.$body, 'moveselect', moveSelectRect)

        // Set the flag that Observers were set.
        setObserversHaveBeenSet(true)
    }, [$links, observersHaveBeenSet, history])

    useEffect(function () {
        if (!$links.$body || history.length) return

        // Set the flag that Observers were set.
        setObserversHaveBeenSet(false)
    }, [$links, observersHaveBeenSet, history])
}*/

/**
 * The function creates an Observer to watch attributes changing on the body
 * It runs a function to correct flashed rectangles visibility, size and position
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — type of a flashed rectangle: hover or select
 * @param {HTMLElement} $flashRect — a link to a flashed rectangle
 */
/*function observeReactCoordsProps(
    $body: HTMLBodyElement,
    type: 'hover' | 'select' | 'movehover' | 'moveselect',
    $flashRect: HTMLElement
) {

    const observer = new MutationObserver((mutationRecords) => {
        // Get string with coordinates of the flashed element in an article
        const rectCoordsStr = $body.getAttribute(type + 'rectcoords')

        if (rectCoordsStr) {
            let rectCoords = JSON.parse(rectCoordsStr)
            // Correct flashed rectangles visibility, size and position
            setSizeAndPosition($body, type, rectCoords, $flashRect)
        }
    })

    observer.observe($body, {
        attributes: true, attributeFilter: [type + 'rectcoords']
    })
}*/
