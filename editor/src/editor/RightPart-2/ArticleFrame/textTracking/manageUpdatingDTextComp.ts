import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import textManagerData from './textManagerData'


/**
 * Функция запускаемая когда нужно поставить в данные текстового компонента текст введённый в этом компоненте.
 * Когда пользователь изменяет текстовый компонент новый текст записывается в textManagerData. Но в данных отсутствует.
 * Эту функцию нужно запускать когда требуется поставить новый текст в данные текстового компонента.
 * Сначала удаляется новый текст и ставится старый, затем новый текст записывается в данные, после Реакт перерисует статью.
 * @param {Boolean} clearNewText — нужно ли очищать текст? Если текст вставляют через вставку, то там есть запрет на вставку текста, поэтому этот параметр нужно поставить в false.
 * В других случаях новый текст записывается прямо в текстовый компонент, но Реакт про это не знает, поэтому после того, как я обновлю данные, то он вставит новый и текст и получится, что он будет двоиться.
 * Поэтому в этом случае требуется поставить true чтобы он очистил новый текст перед обновлением данных.
 * @param {Element} $textComp — ссылка на html-объект компонента.
 * @param {Boolean} getTextFromArtData — должен ли новый текст компонента быть взят из данных статьи. Требуется при перемещении по истории.
 */
export function updateDataInTextComp(clearNewText: boolean = true, $textComp?: Element, getTextFromArtData: boolean = false) {
    if (!textManagerData.textCompId) return

    if (!$textComp) {
        const { $body } = getState().article.$links
        $textComp = articleManager.get$elemBy$body($body, textManagerData.textCompId)
    }

    if (clearNewText) {
        // Найти html-элемент и удалить его текст (после поставлю новый)
        $textComp.firstChild.textContent = ''
    }

    // Получение данных текстового компонента
    const currentHistoryItem = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(currentHistoryItem.article.dComps, textManagerData.textCompId) as ArticleTypes.SimpleTextComponent

    // В зависимости от условия getTextFromArtData новым текстом будет или существующие данные из статьи или данные из textManagerData
    const newText = getTextFromArtData ? dTextComp.text : textManagerData.newText

    // Поставить в данные текстового компонента новый текст чтобы Реакт поставил его в HTML.
    // Создать новый объект истории со ссылкой на копию текстового компонента
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        currentHistoryItem.article, dTextComp, newText
    )

    // Обновить текущий объект истории
    store.dispatch( articleActions.updateCurrentHistoryItem(compsAndMaxCompId) )

    // Обнулить textManagerData
    textManagerData.setInitialText('')
    textManagerData.setNewText('')
    textManagerData.setNewHistoryItemCreated(false)
    textManagerData.setTextCompId(null)
}
