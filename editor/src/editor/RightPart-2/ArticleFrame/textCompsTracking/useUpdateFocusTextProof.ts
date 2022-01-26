import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetArticleSelectors from 'store/article/articleSelectors'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import { isCtrlPressed } from '../../../../utils/domUtils'

/** Хук отслеживает выделенный компонент.
 * Если это текстовый компонент, то ставит его текст в свойство focusTextProof.text в Хранилище. */
export function useTrackSelectedElemToUpdateFocusTextProof() {
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    const [oldTextCompId, setOldTextCompId] = useState<null | TempCompTypes.Id>(null)

    useEffect(function () {
        if (!flashedElems) return
        const { selectedElem } = flashedElems

        // Выполнять код ниже только если изменился id выделенного компонента.
        if (selectedElem.dataCompId === oldTextCompId) return
        else setOldTextCompId(selectedElem.dataCompId)

        // Если текстовый компонент не выделен, то обнулять focusTextProof
        if (selectedElem.tagType !== 'textComponent') {
            store.dispatch( actions.article.updateFocusTextProof({
                cursorStart: null,
                cursorEnd: null
            }))

            return
        }

        // Получение данных выделенного текстового компонента
        const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId)
        if (dTextComp.dCompType !== 'simpleTextComponent') return

        // Обновить текст в сведениях о выделенном текстовом компоненте
        store.dispatch( actions.article.updateFocusTextProof({
            text: dTextComp.text
        }))
    }, [flashedElems, oldTextCompId])
}




export function useUpdateFocusPosition() {
    const { $links } = useGetArticleSelectors()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    useEffect(function () {
        if (!$links || !flashedElems) return
        const { $document } = $links
        const { selectedElem } = flashedElems

        $document.addEventListener('mouseup', getUpdateFocusPositionAfterClick($document, selectedElem))
        $document.addEventListener('keyup', getUpdateFocusPositionAfterClick($document, selectedElem))
        // $document.addEventListener('keyup', updateFocusPositionAfterKeyUp)
    }, [$links, flashedElems])
}

function getUpdateFocusPositionAfterClick(
    $document: StoreArticleTypes.DocumentLink,
    selectedElem: StoreArticleTypes.FlashedElem
) {
    return function () {
        if (selectedElem.tagType !== 'textComponent') return

        // Получение положения курсора
        const selection = $document.getSelection()
        const { anchorOffset, focusOffset } = selection

        // Обновить сведения о выделенном текстовом компоненте
        store.dispatch( actions.article.updateFocusTextProof({
            cursorStart: anchorOffset,
            cursorEnd: focusOffset
        }))
    }
}

/*
function updateFocusPositionAfterKeyUp(e: KeyboardEvent) {
    // Получение текста текстового компонента
    const { article, selectedElem } = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(article.dComps, selectedElem.dataCompId)
    if (dTextComp.dCompType !== 'simpleTextComponent') return

    const { cursorStart, cursorEnd } = store.getState().article.focusTextProof

    let newCursorStart: number = cursorStart
    let newCursorEnd: number = cursorEnd

    const ctrlPressed = isCtrlPressed(e)

    if (e.code === 'ArrowLeft' && !ctrlPressed) {
        // Если курсор схлопнутый, то передвинуть влево на 1 символ
        if (newCursorStart === newCursorEnd) {
            newCursorStart = newCursorEnd = cursorStart - 1
        }
        // Если выделен диапазон символов, то передвинуть на самый левый символ
        else {
            newCursorEnd = newCursorStart
        }
    }
    else if (e.code === 'ArrowRight' && !ctrlPressed) {
        // Если курсор схлопнутый, то передвинуть вправо на 1 символ
        if (newCursorStart === newCursorEnd) {
            newCursorStart = newCursorEnd = cursorStart + 1
        }
        // Если выделен диапазон символов, то передвинуть на самый правый символ
        else {
            newCursorStart = newCursorEnd
        }
    }

    // Если курсор выходит за пределы текста, то вернуть его в эти пределы
    if (newCursorStart < 0) newCursorStart = 0
    if (newCursorEnd < 0) newCursorEnd = 0
    if (newCursorStart > dTextComp.text.length) newCursorStart = dTextComp.text.length
    if (newCursorEnd > dTextComp.text.length) newCursorEnd = dTextComp.text.length

    // Обновить сведения о выделенном текстовом компоненте
    store.dispatch( actions.article.updateFocusTextProof({
        cursorStart: newCursorStart,
        cursorEnd: newCursorEnd
    }))
}*/
