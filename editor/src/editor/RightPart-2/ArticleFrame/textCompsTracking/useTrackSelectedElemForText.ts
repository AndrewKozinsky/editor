import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from '../../../../utils/miscUtils'

/** Хук отслеживает выделенный компонент.
 * Если это текстовый компонент, то ставит его текст в свойство focusTextProof.text в Хранилище. */
export function useTrackSelectedElemForText() {
    const { $links } = useGetArticleSelectors()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    // id выделенного текстового компонента
    const [textCompId, setTextCompId] = useState<null | ArticleTypes.Id>(null)

    useEffect(function () {
        if (!$links || !flashedElems || !article) return
        const { selectedElem } = flashedElems

        // Выполнять код ниже только если изменился id выделенного компонента.
        if (selectedElem.dataCompId === textCompId) return
        else setTextCompId(selectedElem.dataCompId)

        // Если раннее был выделен текстовый компонент...
        if (textCompId) {
            // ... то проверить разнится ли текст из HTML с данными.
            // Если да, то обновить данные в соответствии с текстом из HTML.
            updateTextComp(textCompId, $links.$body, article)
        }

        // Если выделили текстовый компонент
        if (selectedElem.tagType === 'textComponent') {
            setTextCompId(selectedElem.dataCompId)
        }
        else {
            setTextCompId(null)
        }

    }, [flashedElems, textCompId])
}

/**
 * Функция ищет в $body элемент содержащий текст текстового компонента, сравнивает его с текстом в данных.
 * Если строки разнятся, то ставит текст из HTML в данные через создание нового элемента истоии
 * @param {Number} textCompId — id выделенного текстового компонента
 * @param {HTMLBodyElement} $body — ссылка на <body> с разметкой шаблона
 * @param {Object} article — данные статьи
 */
function updateTextComp(
    textCompId: null | ArticleTypes.Id,
    $body: StoreArticleTypes.BodyLink,
    article: ArticleTypes.Article
) {
    // Получить html-объект текстового компонента из $body
    const $textComp = articleManager.get$elemBy$body($body, textCompId)

    // Получить данные этого текстового компонента из статьи
    const dTextComp = articleManager.getComponent(article.dComps, textCompId)
    if (!dTextComp || dTextComp.dCompType !== 'simpleTextComponent') return

    // Если текст не отличается, то ничего не делать
    if ($textComp.textContent === dTextComp.text) return

    // В противном случае обновить текст и сохранить новый объект истории
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        article, dTextComp, $textComp.textContent
    )

    store.dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))
}

/** Функция принудительно создаёт новый элемент истории если есть отредактированный текст */
export function forceCreateHistoryItemWithNewText() {
    // Ничего не делать если нет выделенного текстового компонента
    const historyItem = articleManager.getCurrentHistoryItem()
    if (!historyItem) return

    const selectedElem = historyItem.selectedElem
    if (selectedElem.tagType !== 'textComponent') return

    // Получить координаты выделения
    const { $document, $body } = getState().article.$links
    const { anchorOffset, focusOffset } = $document.getSelection()

    // Убрать выделение компонента в данных статьи
    store.dispatch(articleActions.setFlashedElement('select', null))

    // Потом снова поставить чтобы создался новый объект истории.
    // Так как текст заменился, то выделение перейдёт в нулевую позицию
    setTimeout(function () {
        store.dispatch(articleActions.setFlashedElement(
            'select', 'textComponent', selectedElem.dataCompId
        ))
    }, 0)

    // Выделить те буквы, которые были выделены изначально
    setTimeout(function () {
        // Получить html-объект компонента
        const $textComp = articleManager.get$elemBy$body($body, selectedElem.dataCompId)

        $document.getSelection().setBaseAndExtent(
            $textComp.firstChild, anchorOffset, $textComp.firstChild, focusOffset
        )
    }, 100)
}
