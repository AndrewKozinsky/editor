import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { convertToSnakeCase, setUpperCaseForFirstLetter } from 'utils/StringUtils'

/** The hook sets flash rectangles into IFrame */
export function useInstallFlashRects() {
    const { $links, history } = useGetArticleSelectors()

    // Were flash elements installed?
    const [wereInstalled, setWereInstalled] = useState(false)

    useEffect(function () {
        if (!$links.$body || wereInstalled) return

        // Set style for the flash rectangles
        setExtraStyle($links.$head)

        // Install flash rectangles
        createFlashElement($links.$body,'hover')
        createFlashElement($links.$body,'select')
        createFlashElement($links.$body,'moveHover')
        createFlashElement($links.$body,'moveSelect')

        // Set the flag that flash elements were installed so as not to do it again
        setWereInstalled(true)
    }, [$links, wereInstalled, history])

    useEffect(function () {
        if (!history.length) {
            // Set flag that files are not set
            setWereInstalled(false)
        }
    }, [history])
}

/**
 * The function set CSS to manage Empty text sign visibility
 * @param {HTMLHeadElement} $head — <head>
 */
function setExtraStyle($head: HTMLHeadElement) {
    // Flash rectangles style
    const style = '.em-flash-rect {' +
        'display: none;' +
        'position: absolute;' +
        'width: 100px;' +
        'height: 100px;' +
        'pointer-events: none;' +
        'box-sizing: content-box;' +
        'border-radius: 2px;' +
    '}' +
    '.em-flash-rect__hover {' +
        'top: 50px;' +
        'left: 50px;' +
        'border: 1px solid rgba(1, 122, 255, 1);' +
    '}' +
    '.em-flash-rect__select {' +
        'top: 100px;' +
        'left: 100px;' +
        'border: 2px solid rgba(1, 122, 255, 1);' +
    '}' +
    '.em-flash-rect__move-hover {' +
        'top: 150px;' +
        'left: 150px;' +
        'border: 1px solid rgba(255, 0, 82, 1);' +
    '}' +
    '.em-flash-rect__move-select {' +
        'top: 200px;' +
        'left: 200px;' +
        'border: 2px solid rgba(255, 0, 82, 1);' +
    '}'

    // Create and set <style> into <head>
    const styleElem = document.createElement('style')
    styleElem.innerText = style
    $head.appendChild(styleElem)
}

/**
 * The function creates a flash rectangle element and appends it in the <body>
 * @param {HTMLBodyElement} $body — <body>
 * @param {String} type — flash rectangle type: hover or select
 */
function createFlashElement($body: HTMLBodyElement, type: 'hover' | 'select' | 'moveHover' | 'moveSelect') {
    const flashRect = document.createElement('div')

    // Add attribute to find it in an another function
    // data-em-hover-rect OR data-em-select-rect OR
    // data-em-move-hover-rect OR data-em-move-select-rect
    const typeWithFirstBigLetter = setUpperCaseForFirstLetter(type)
    flashRect.dataset[`em${typeWithFirstBigLetter}Rect`] = 'true'

    // Add classes
    flashRect.classList.add('em-flash-rect')
    // Add specific class
    // em-flash-rect__hover OR em-flash-rect__select
    // em-flash-rect__move-hover OR em-flash-rect__move-select
    flashRect.classList.add('em-flash-rect__' + convertToSnakeCase(type))

    // Append a flash rectangle to the <body>
    $body.appendChild(flashRect)
}