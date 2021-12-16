import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import StoreArticleTypes from 'store/article/articleTypes'

/**
 * The hook sets OnMove and OnClick mouse handlers to IFrame document.
 * They save information about component/element under cursor in Store
 */
export function useSetMouseHandlersForFlashRects() {
    const { $links, history } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [mouseMoveHandlerSet, setMouseMoveHandlerSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || !$links.$window || mouseMoveHandlerSet || !history.length) return
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
}

function hoverHandler(e: MouseEvent) {
    mouseHandler(e, 'hover')
}
function selectHandler(e: MouseEvent) {
    mouseHandler(e, 'select')
}

/**
 * OnMove and OnClick mouse handler.
 * The function defines component/element under cursor and set its coordinates to Store.
 * @param {Event} event — event object
 * @param {String} actionType — mouse hovers or selects under element
 */
function mouseHandler(event: MouseEvent, actionType: 'hover' | 'select') {
    const ctrlPressed = isCtrlPressed(event)

    // Element under cursor
    const target = event.target as HTMLElement

    if (ctrlPressed) {
        const $component = target.closest(`[data-em-d-gen-comp-id]`) as HTMLElement

        // Тип выделенного компонента: move
        let moveActionType: StoreArticleTypes.FlashedElemType =
            actionType === 'hover' ? 'moveHover' : 'moveSelect'

        if ($component) {
            const dataCompId = parseInt($component.dataset.emDGenCompId) || null
            setFlashRectangle(moveActionType, dataCompId, null)
        }
        else {
            setFlashRectangle(moveActionType, null, null)
        }
    }
    else {
        const $element = target.closest(`[data-em-d-comp-id]`) as HTMLElement

        if ($element) {
            const dataCompId = parseInt($element.dataset.emDCompId) || null
            const dataElemId = parseInt($element.dataset.emDElemId) || null

            setFlashRectangle(actionType, dataCompId, dataElemId)
        }
        else {
            setFlashRectangle(actionType, null, null)
        }
    }
}

/**
 * Функция запускает экшен подсвечивающий элемент
 * @param {String} actionType — тип подсветки: 'hover' | 'select' | 'moveHover' | 'moveSelect'
 * @param {Number} dataCompId — id данных компонента подсвечиваемого компонента/элемента
 * @param {Number} dataElemId — id данных элемента подсвечиваемого компонента/элемента
 */
function setFlashRectangle(actionType: StoreArticleTypes.FlashedElemType, dataCompId: number | null, dataElemId: number | null) {
    store.dispatch( actions.article.setFlashRectangles(
        actionType, dataCompId, dataElemId
    ))
}

/**
 * Функция возвращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
function isCtrlPressed(event: MouseEvent) {
    const isMac = navigator.platform.startsWith('Mac')
    return !isMac && event.ctrlKey || isMac && event.metaKey
}