import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import { store } from 'store/rootReducer'
import StoreArticleTypes from 'store/article/articleTypes'
import articleActions from 'store/article/articleActions'
import { isCtrlPressed } from 'utils/domUtils'

/**
 * The hook sets OnMove and OnClick mouse handlers to IFrame document.
 * They save information about component/element under cursor in Store
 */
export default function useSetMouseHandlersForFlashRects() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [mouseMoveHandlerSet, setMouseMoveHandlerSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || mouseMoveHandlerSet) return

        // Set handlers mousemove and mousedown
        $links.$document.addEventListener('mousemove', hoverHandler)
        $links.$document.addEventListener('mousedown', selectHandler)

        // Set flag that handlers were set
        setMouseMoveHandlerSet(true)
    }, [$links, mouseMoveHandlerSet])
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
    // @ts-ignore
    const ctrlPressed = isCtrlPressed(event)

    // Element under cursor
    const $target = event.target as HTMLElement

    // Если нажата клавиша CTRL, то хотят поставить перемещающий прямоугольник
    if (ctrlPressed) {
        // Поиск компонента
        const $component: HTMLElement = $target.closest('[data-em-d-gen-comp-id]')

        // Тип выделенного компонента: move
        let moveActionType: StoreArticleTypes.FlashedElemType =
            actionType === 'hover' ? 'moveHover' : 'moveSelect'

        if ($component) {
            const dataCompId = parseInt($component.dataset.emDGenCompId) || null
            const dataElemId = parseInt($component.dataset.emDElemId) || null

            setFlashRectangle(moveActionType, 'rootElement', dataCompId, dataElemId)
        }
        else {
            setFlashRectangle(moveActionType, null, null, null)
        }
    }
    // Если клавиша CTRL не нажата, то хотят поставить выделяющий прямоугольник
    else {
        // Получить координаты компонента/элемента над которым стоит курсор
        let elemFlashCoords = getElemFlashCoords($target)

        setFlashRectangle(actionType, elemFlashCoords.tagType, elemFlashCoords.dataCompId, elemFlashCoords.dataElemId)
    }
}

/**
 * Функция запускает экшен подсвечивающий элемент
 * @param {String} actionType — тип подсветки: 'hover' | 'select' | 'moveHover' | 'moveSelect'
 * @param {Boolean} tagType — тип тега над которым завис курсор: component, rootElement или element
 * @param {Number} dataCompId — id данных компонента подсвечиваемого компонента/элемента
 * @param {Number} dataElemId — id данных элемента подсвечиваемого компонента/элемента
 */
function setFlashRectangle(
    actionType: StoreArticleTypes.FlashedElemType,
    tagType: StoreArticleTypes.FlashedTagType,
    dataCompId: number | null,
    dataElemId: number | null
) {
    store.dispatch( articleActions.setFlashRectangles(
        actionType, tagType, dataCompId, dataElemId
    ))
}


/**
 * Функция пробегается вверх от переданного $target и находит элемент подходящий под селектор [data-em-d-text-comp-id]
 * При этом игнорируются текстовые компоненты.
 * @param {HTMLElement} $target — изначальный элемент от которого нужно искать элемент
 */
function getElemFlashCoords($target: HTMLElement): StoreArticleTypes.FlashedElem {
    let $currentElem: HTMLElement = $target

    // Над чем находится курсор:
    const resultObj: StoreArticleTypes.FlashedElem = {
        tagType: null, // Тип элемента: Текстовый компонент, Элемент, который не является корневым тегом или Элемент, который является корневым тегом
        dataCompId: null, // id данных компонента
        dataElemId: null // id данных элемента
    }

    for (;$currentElem;) {
        // Завершить поиск если наткнулись на <body> или <html>
        if (
            $currentElem.tagName.toUpperCase() === 'BODY' ||
            $currentElem.tagName.toUpperCase() === 'HTML'
        ) {
            return resultObj
        }

        const dGenCompId = $currentElem.dataset.emDGenCompId
        const dCompId = $currentElem.dataset.emDCompId
        const dElemId = $currentElem.dataset.emDElemId

        // Если это текстовый компонент
        if (dGenCompId && !dCompId && !dElemId) {
            resultObj.tagType = 'textComponent'
            resultObj.dataCompId = parseInt(dGenCompId)
            break
        }
        // Если корневой тег
        else if (dGenCompId && dCompId) {
            resultObj.tagType = 'rootElement'
            resultObj.dataCompId = parseInt(dCompId)
            resultObj.dataElemId = parseInt(dElemId)
            break
        }
        // Если элемент не являющийся корневым
        else if (!dGenCompId && dCompId && dElemId) {
            resultObj.tagType = 'element'
            resultObj.dataCompId = parseInt(dCompId)
            resultObj.dataElemId = parseInt(dElemId)
            break
        }

        // Сделать текущим элементом предка этого элемента
        $currentElem = $currentElem.parentElement
            ? $currentElem.parentElement
            : null
    }

    return resultObj
}
