// import { useEffect, useState } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import { store } from 'store/rootReducer'
// import actions from 'store/rootAction'
// import { getElementPadding } from 'utils/domUtils'

/**
 * The hook sets OnMove and OnClick mouse handlers to IFrame document.
 * They save information about component/element under cursor in Store
 */
/*export function useSetMouseHandlersForFlashRects() {
    const { $links, history } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [mouseMoveHandlerSet, setMouseMoveHandlerSet] = useState(false)

    useEffect(function () {
        if (!$links.$body || mouseMoveHandlerSet || !history.length) return

        // Set handlers mousemove and mousedown
        $links.$document.addEventListener('mousemove', hoverHandler)
        $links.$document.addEventListener('mousedown', selectHandler)

        // Set flag that handlers were set
        setMouseMoveHandlerSet(true)
    }, [$links, mouseMoveHandlerSet, history])

    useEffect(function () {
        if ($links.$document && !history.length) {
            setMouseMoveHandlerSet(false)

            $links.$document.removeEventListener('mousemove', hoverHandler)
            $links.$document.removeEventListener('mousedown', selectHandler)
        }
    }, [history, $links])
}*/

/*function hoverHandler(e: MouseEvent) {
    mouseHandler(e, 'hover')
}*/
/*function selectHandler(e: MouseEvent) {
    mouseHandler(e, 'select')
}*/

/**
 * OnMove and OnClick mouse handler.
 * The function defines component/element under cursor and set its coordinates to Store.
 * @param {Event} event — event object
 * @param {String} actionType — mouse hovers or selects under element
 */
/*function mouseHandler(event: MouseEvent, actionType: 'hover' | 'select') {
    const ctrlPressed = isCtrlPressed(event)

    // Element under cursor
    const target = event.target as HTMLElement

    // Clear hovered rectangle if there is not components under cursor
    if (!target.closest(`[data-em-data-comp-id]`)) {
        store.dispatch( actions.article.setFlashRectangles(
            actionType, null, null, null
        ))

        if (ctrlPressed && actionType === 'hover') {
            store.dispatch( actions.article.setFlashRectangles(
                'moveHover', null, null, null
            ))
        }
        else if (ctrlPressed && actionType === 'select') {
            store.dispatch( actions.article.setFlashRectangles(
                'moveSelect', null, null, null
            ))
        }

        return
    }

    // Closest element on cursor
    const elemWithCompId: HTMLElement = ctrlPressed
        ? target.closest(`[data-em-data-comp-id]`)
        : target.closest(`[data-em-data-comp-id]`)

    // Regular component data id, text component data id and element data id
    const dataCompId = parseInt(elemWithCompId.dataset.emDataCompId) || null
    const dataTextCompId = parseInt(elemWithCompId.dataset.emTextDataCompId) || null
    const dataElemId = parseInt(elemWithCompId.dataset.emDataElemId) || null

    const nodeType  = dataCompId && dataElemId ? 'element' : 'component'

    // Check if there is a text component under cursor.
    if (isTextCompAhead(target)) {
        // Text component doesn't have own wrapper. That's why it always is inside element.
        // An element can have padding.
        // The function defines if cursor on a text component or on element's padding
        // const cursorOnTextComponent = isCursorOnTextComponent(event, target)

        // if (cursorOnTextComponent) {
        //     store.dispatch( actions.article.setFlashRectangles(
        //         actionType, 'textComponent', dataTextCompId, null
            // ))
        // }
        // else {
        //     store.dispatch( actions.article.setFlashRectangles(
        //         actionType, nodeType, dataCompId, dataElemId
            // ))
        // }
    }
    // Otherwise there is a standard element/component
    else {
        if (!ctrlPressed) {
            store.dispatch( actions.article.setFlashRectangles(
                actionType, nodeType, dataCompId, dataElemId
            ))
        }
        else if (ctrlPressed && actionType === 'hover') {
            store.dispatch( actions.article.setFlashRectangles(
                'moveHover', nodeType, dataCompId, dataElemId
            ))
        }
        else if (ctrlPressed && actionType === 'select') {
            store.dispatch( actions.article.setFlashRectangles(
                'moveSelect', nodeType, dataCompId, dataElemId
            ))
        }
    }
}*/

/**
 * Функция возращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
/*function isCtrlPressed(event: MouseEvent) {
    const isMac = navigator.platform.startsWith('Mac')
    return !isMac && event.ctrlKey || isMac && event.metaKey
}*/

/**
 * The function returns if a cursor on text component or not
 * @param {HTMLElement} $target — element under a cursor
 */
/*export function isTextCompAhead($target: HTMLElement) {
    // let $currentNode = $target

    // Finding text component element in the loop
    // If text component element is found a program return true
    // Otherwise one return false
    // while ($currentNode.tagName !== 'BODY') {
    //     if ($currentNode.dataset.emTextDataCompId) {
    //         return true
        // }
        // else if ($currentNode.dataset.emDataCompId) {
        //     return false
        // }

        // $currentNode = $currentNode.parentElement
    // }

    return false
}*/

/**
 * Text component doesn't have own wrapper. That's why it always is inside element.
 * An element can have padding.
 * The function defines if cursor on a text component or on element's padding.
 * @param {Event} event — event object
 * @param {HTMLElement} $target — html-element
 */
/*export function isCursorOnTextComponent(event: MouseEvent, $target: HTMLElement) {
    // Mouse coordinates
    const mouseX = event.clientX
    const mouseY = event.clientY

    // Element under cursor
    const $elem = $target.closest(`[data-em-text-data-comp-id]`) as HTMLElement

    // Object with element's padding info
    const paddingObj = getElementPadding($elem)

    // Element coordinates
    const elemCoords = $elem.getBoundingClientRect()
    const elemX = elemCoords.left
    const elemY = elemCoords.top
    const elemWidth = elemCoords.width
    const elemHeight = elemCoords.height

     const res = (
        !(mouseY > elemY + paddingObj.top) ||
        !(mouseX < elemX + elemWidth - paddingObj.right) ||
        !(mouseY < elemY + elemHeight - paddingObj.bottom ) ||
        !(mouseX > elemX + paddingObj.left)
    )

    return !res
}*/
