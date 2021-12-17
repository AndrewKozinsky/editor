import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import StoreArticleTypes from 'store/article/articleTypes'
import { number } from 'yup'

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
    const $target = event.target as HTMLElement

    // Если нажата клавиша CTRL, то хотят поставить перемещающий прямоугольник
    if (ctrlPressed) {
        const $component: HTMLElement = $target.closest('[data-em-d-gen-comp-id]')

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
    // Если клавиша CTRL не нажата, то хотят поставить выделяющий прямоугольник
    else {
        // Получить объект с данными курсор стоит над текстовым компонентом или элементом
        let elemAndTextComp = getElementAndTextComponent($target)

        // Если курсор стоит над текстовым компонентом и нажали кнопку мыши чтобы, поставить курсор
        if (elemAndTextComp.textComp && actionType === 'select') {
            // Получение id данных текстового компонента под курсором
            const textCompCompId = parseInt(elemAndTextComp.textComp.dataset.emDTextCompId) || null

            // Запустить экшен ставящий id текстового компонента в Хранилище
            setTextCompId(textCompCompId)

            // Скрыть выделяющий прямоугольник
            setFlashRectangle(actionType, null, null)
        }
        // Если курсор стоит над элементом
        else if (elemAndTextComp.element) {
            const dataCompId = parseInt(elemAndTextComp.element.dataset.emDCompId) || null
            const dataElemId = parseInt(elemAndTextComp.element.dataset.emDElemId) || null

            setFlashRectangle(actionType, dataCompId, dataElemId)

            // Запустить экшен обнуляющий id текстового компонента в Хранилище
            if (actionType === 'select') setTextCompId(null)
        }
        // Курсор не стоит ни над тем и другим, поэтому обнулить данные о выделениях
        else {
            // Скрыть выделяющий прямоугольник
            setFlashRectangle(actionType, null, null)

            // Запустить экшен обнуляющий id текстового компонента в Хранилище
            if (actionType === 'select') setTextCompId(null)
        }
    }
}

/**
 * Функция запускает экшен подсвечивающий элемент
 * @param {String} actionType — тип подсветки: 'hover' | 'select' | 'moveHover' | 'moveSelect'
 * @param {Number} dataCompId — id данных компонента подсвечиваемого компонента/элемента
 * @param {Number} dataElemId — id данных элемента подсвечиваемого компонента/элемента
 */
function setFlashRectangle(
    actionType: StoreArticleTypes.FlashedElemType, dataCompId: number | null, dataElemId: number | null
) {
    store.dispatch( actions.article.setFlashRectangles(
        actionType, dataCompId, dataElemId
    ))
}

/**
 * Функция запускает экшен ставящий id данных выделенного текстового компонента
 * @param {Number} dataCompId — id данных выделенного текстового компонента
 */
function setTextCompId(dataCompId: number | null) {
    store.dispatch( actions.article.setTextCompId(dataCompId))
}

/**
 * Функция возвращает булево значение нажата ли клавиша ctrl (Win) или Cmd (Mac).
 * @param {Object} event — объект события
 */
function isCtrlPressed(event: MouseEvent) {
    const isMac = navigator.platform.startsWith('Mac')
    return !isMac && event.ctrlKey || isMac && event.metaKey
}

type ElementAndTextComponentType = {
    element: null | HTMLElement,
    textComp: null | HTMLElement
}

/**
 * Функция пробегается вверх от переданного $target и находит элемент подходящий под селектор [data-em-d-text-comp-id]
 * При этом игнорируются текстовые компоненты.
 * @param {HTMLElement} $target — изначальный элемент от которого нужно искать элемент
 */
function getElementAndTextComponent($target: HTMLElement): ElementAndTextComponentType {
    let $currentElem: HTMLElement = $target

    const resultObj: ElementAndTextComponentType = {
        element: null,
        textComp: null
    }

    for (;$currentElem;) {
        // Завершить поиск если наткнулись на <body> или <html>
        if (
            $currentElem.tagName.toUpperCase() === 'BODY' ||
            $currentElem.tagName.toUpperCase() === 'HTML'
        ) {
            return resultObj
        }

        // Завершить поиск если наткнулись на текстовый компонент
        if ($currentElem.matches('[data-em-d-text-comp-id]')) {
            resultObj.textComp = $currentElem
            return resultObj
        }

        if ($currentElem.matches('[data-em-d-comp-id]')) {
            resultObj.element = $currentElem
            return resultObj
        }

        // @ts-ignore
        $currentElem = $currentElem.parentNode
            ? $currentElem.parentNode
            : null
    }

    return resultObj
}