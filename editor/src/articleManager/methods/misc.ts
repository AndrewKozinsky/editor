import { updateArticleRequest } from 'requests/editor/article/updateArticleRequest'
import StoreArticleTypes from 'store/article/articleTypes'
import articleActions from 'store/article/articleActions'
import { store } from 'store/rootReducer'
import articleManager from 'articleManager/articleManager'
import { updateDataInTextComp } from 'editor/RightPart-2/ArticleFrame/textTracking/manageUpdatingDTextComp'
import fireEvent from '../../event/fireEvent'


/**
 * The function saves code of an article to a server
 * @param {Array} historyArr — articles history array
 * @param {Number} historyCurrentIdx — current history item index
 * @param {String} articleId — article uuid which I have to save in a server
 */
export async function saveArticle(
    this: typeof articleManager,
    historyArr: StoreArticleTypes.HistoryItems,
    historyCurrentIdx: number,
    articleId: null | number
) {
    if (!articleId) return

    // Поставить текст текстового компонента в данные если он выделен и его отредактировали
    updateDataInTextComp('common')

    // Поставить флаг, что статья сохранена на текущем шаге
    store.dispatch( articleActions.setArticleIsSaved() )

    // Get current history item object
    const historyItem = this.getCurrentHistoryItem(historyArr, historyCurrentIdx)

    // Save article code in a server
    await updateArticleRequest(articleId, {content: historyItem.article})
}

/**
 * Функция удаляющая редактируемую статью
 * @param {String} articleId — article id which I have to save in a server
 */
export async function deleteArticle( this: typeof articleManager, articleId: null | number ) {
    if (!articleId) return

    // Закрыть статью
    fireEvent({event: 'closeArticle'})
}

/**
 * Функция ставит фокус в текстовый компонент в редактируемой статье
 * @param {Document} $iFrameDoc — iFrame в котором находится статья
 * @param {number} textCompId — id данных текстового компонента
 */
export function setFocusInTextComponent(
    this: typeof articleManager,
    $iFrameDoc: StoreArticleTypes.DocumentLink,
    textCompId: number
) {
    // Текстовый компонент
    const $textComponent: HTMLElement = $iFrameDoc.querySelector(`[data-em-d-gen-comp-id="${textCompId}"]`)
    if (!$textComponent) return

    // Поставить фокус (будет на нулевом символе)
    $textComponent.focus()

    // Получить объект выделения и поставить в конец
    const selection = $iFrameDoc.getSelection()

    // В текстовом компоненте могут быть несколько текстовых узлов.
    // Требуется получить последний текстовый узел и поставить фокус на его последний символ.
    const nodeLength = $textComponent.childNodes
    const textNode = $textComponent.childNodes[nodeLength.length - 1]

    if (textNode) {
        selection.collapse(textNode, textNode.textContent.length)
    }
}