import { useEffect } from 'react'
import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import textManagerData from './textManagerData'

/**
 * Хук следит за координатами выделенного компонента.
 * Если это не текстовый компонент, но раньше был выделен текстовый,
 * то запускает функцию ставящую новый текст в данные текстового компонента, который была выделен ранее.
 */
export function useManageUpdatingDTextComp() {
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const selectedElem = flashedElems?.selectedElem

    useEffect(function () {
        if (!selectedElem) return

        if (!selectedElem.tagType) {
            updateTextCompInArticleData()
        }
    }, [selectedElem])
}


/** Функция запускаемая когда нужно поставить в данные текстового компонента текст введённый в этом компоненте.
 * Когда пользователь изменяет текстовый компонент новый текст записывается в textManagerData. Но в данных отсутствует.
 * Эту функцию нужно запускать когда требуется новый текст в данные текстового компонента.
 * Сначала удаляется новый текст и ставится старый, затем новый текст записывается в данные, после Реакт перерисует статью.
 * */
export function updateTextCompInArticleData() {
    // Ничего не делать, если текстовый компонент не был выделен или изначальный текст и новый не отличаются.
    if (!textManagerData.textCompId || textManagerData.initialText === textManagerData.newText) return

    const { $body } = getState().article.$links

    // Получение id текстового компонента
    const textCompId = textManagerData.textCompId

    // Найти html-элемент и удалить его текст (после поставлю новый)
    const $textComp = articleManager.get$elemBy$body($body, textCompId)
    $textComp.firstChild.textContent = ''

    // Получение данных текстового компонента
    const currentHistoryItem = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(currentHistoryItem.article.dComps, textCompId) as ArticleTypes.SimpleTextComponent

    // Поставить в данные текстового компонента новый текст чтобы Реакт поставил его в HTML.
    // Создать новый объект истории со ссылкой на копию текстового компонента
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        currentHistoryItem.article, dTextComp, textManagerData.newText
    )

    // Обновить текущий объект истории
    store.dispatch( articleActions.updateCurrentHistoryItem(compsAndMaxCompId) )

    // Обнулить textManagerData
    textManagerData.setTextCompId(null)
    textManagerData.setInitialText('')
    textManagerData.setNewText('')
    textManagerData.setNewHistoryItemCreated(false)
}
