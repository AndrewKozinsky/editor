import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'
import StoreArticleTypes from 'store/article/articleTypes'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'

/** Хук отслеживает предыдущий и текущий выделенный компонент.
 * Если предыдущий выделенный компонент был текстовым компонентом, то хук получает его текст из html и сравнивает с текстом в данных.
 * Если тексты не совпадают, то текст из html будет вставлен в данные текстового компонента, который был выделен ранее. */
export function useTrackSelectedElemForText() {
    const { $links } = useGetArticleSelectors()
    const flashedElems = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()

    // id выделенного компонента и его тип
    const [lastSelectedCompId, setLastSelectedCompId] = useState<null | ArticleTypes.Id>(null)
    const [lastSelectedCompType, setLastSelectedCompType] = useState<StoreArticleTypes.FlashedTagType>(null)

    useEffect(function () {
        if (!$links || !flashedElems || !article) return
        const { selectedElem } = flashedElems

        // Если компонент не изменился, то ничего не делать
        if (selectedElem.dataCompId === lastSelectedCompId) return

        // Поставить новый id выделенного компонента и его тип
        setLastSelectedCompId(selectedElem.dataCompId)
        setLastSelectedCompType(selectedElem.tagType)

        // Если раннее был выделен текстовый компонент...
        if (lastSelectedCompType === 'textComponent') {
            // ... то проверить разнится ли текст из HTML с данными.
            // Если да, то обновить данные в соответствии с текстом из HTML.
            updateTextComp(lastSelectedCompId, $links.$body, article)
        }
    }, [flashedElems])
}

/**
 * Функция ищет в $body элемент содержащий текст текстового компонента, сравнивает его с текстом в данных.
 * Если строки разнятся, то ставит текст из HTML в данные через создание нового элемента истоии
 * @param {Number} textCompId — id выделенного текстового компонента
 * @param {HTMLBodyElement} $body — ссылка на <body> с разметкой шаблона
 * @param {Object} article — данные статьи
 */
function updateTextComp(
    textCompId: ArticleTypes.Id,
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

    const newText = $textComp.textContent

    // Получить новый объект истории с новым текстом в текстовом слое
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        article, dTextComp, newText
    )

    // Сохранить новый объект истории
    store.dispatch(articleActions.createAndSetHistoryItem(
        compsAndMaxCompId
    ))

    // Приходится принудительно ставить новый текст потому что после обновления текста в данных
    // они вставляются до введённого текста и текст двоится.
    $textComp.textContent = newText
}

/** Функция принудительно создаёт новый элемент истории если есть отредактированный текст */
export function forceCreateHistoryItemWithNewText() {
    const historyItem = articleManager.getCurrentHistoryItem()
    if (!historyItem) return

    // Ничего не делать если нет выделенного текстового компонента
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

    setTimeout(function () {
        // Получить html-объект компонента
        const $textComp = articleManager.get$elemBy$body($body, selectedElem.dataCompId)

        // Поставить текст из данных чтобы не было сложения текста из данных и текста в contenteditable
        const { dComps } = articleManager.getCurrentHistoryItem().article
        const dTextComp = articleManager.getComponent(dComps, selectedElem.dataCompId)
        if (dTextComp.dCompType === 'simpleTextComponent') {
            $textComp.textContent = dTextComp.text
        }

        // Выделить те буквы, которые были выделены изначально
        $document.getSelection().setBaseAndExtent(
            $textComp.firstChild, anchorOffset, $textComp.firstChild, focusOffset
        )
    }, 100)
}
