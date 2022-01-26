// import articleManager from 'articleManager/articleManager'
// import { useEffect, useState } from 'react'
// import StoreArticleTypes from 'store/article/articleTypes'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import actions from 'store/rootAction'
// import { store } from 'store/rootReducer'

/*export function useSetUpdateTextComponent() {
    const { $links } = useGetArticleSelectors()
    // Were mouse move handlers set?
    const [handlerWasSet, setHandlerWasSet] = useState(false)

    useEffect(function () {
        if (!$links.$document || handlerWasSet) return

        // Set handlers
        $links.$document.addEventListener('keydown', preventInsertForbiddenCharacters)
        $links.$document.addEventListener('keyup', updateTextComponent($links.$document))
        $links.$document.addEventListener('paste', pasteHandler)

        // Set flag that handlers were set
        setHandlerWasSet(true)
    }, [$links, handlerWasSet])
}*/

/**
 * Обработчик нажатия клавиш запрещающий действия по установки новой строки, установки жирного и курсивного текста,
 * запрет на Tab чтобы фокус не переходил на другое текстовое поле.
 * @param {Object} e — объект события нажатия клавиш
 */
/*function preventInsertForbiddenCharacters(e: KeyboardEvent) {
    if (
        ['Enter', 'Tab'].includes(e.key) ||
        ['KeyB', 'KeyI'].includes(e.code) && (e.metaKey || e.ctrlKey)
    ) {
        e.preventDefault()
    }
}*/

/** Обновление текстового компонента при вводе текста в <text-component /> */
/*function updateTextComponent($document: StoreArticleTypes.DocumentLink) {
    return function () {
        // Получение данных текстового компонента
        const historyItem = articleManager.getCurrentHistoryItem()
        const selectedTextCompId = historyItem.selectedElem.dataCompId
        const dTextComp = articleManager.getComponent(historyItem.article.dComps, selectedTextCompId)

        if (!dTextComp || dTextComp.dCompType !== 'simpleTextComponent') return

        // Получение <text-component /> где стоит фокус
        const $textComponent = $document.querySelector(`[data-em-d-gen-comp-id="${selectedTextCompId}"]`)

        // Поставить введённый текст в данные компонента
        // При таком способе не будет вызываться перерисовка статьи потому что в этом нет необходимости:
        // текст в <text-component /> и в данных будет одинаков
        dTextComp.text = $textComponent.textContent

    }
}*/

/** Обработчик вставки текста или файла */
/*
function pasteHandler(e: ClipboardEvent) {
    const clipboardData = e.clipboardData.getData('text/plain')

    // Если вставляют файл, то в clipboardData будет пустая строка
    if (clipboardData === '') {
        e.preventDefault()
    }
}*/
