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
 * {String} type — тип обновления текста в текстовом компоненте
 */
export function updateDataInTextComp(
    type: 'common' | 'paste' | 'history',
    $textComp?: Element
) {
    if (!textManagerData.textCompId) return
    if (textManagerData.initialText === textManagerData.newText) return

    if (!$textComp) {
        const { $body } = getState().article.$links
        $textComp = articleManager.get$elemBy$body($body, textManagerData.textCompId)
    }

    // Найти html-элемент и удалить его текст (после поставится новый)
    if ($textComp.firstChild) {
        $textComp.firstChild.textContent = ''
    }

    // Получение данных текстового компонента
    const currentHistoryItem = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(currentHistoryItem.article.dComps, textManagerData.textCompId) as ArticleTypes.SimpleTextComponent

    let newText = textManagerData.newText

    // Поставить в данные текстового компонента новый текст чтобы Реакт поставил его в HTML.
    // Создать новый объект истории со ссылкой на копию текстового компонента
    const compsAndMaxCompId = articleManager.updateTextInComponent(
        currentHistoryItem.article, dTextComp, newText
    )

    // Обновить текущий объект истории
    store.dispatch( articleActions.updateCurrentHistoryItem(compsAndMaxCompId) )

    if (type === 'common') {
        // Обнулить textManagerData
        textManagerData.setInitialText('')
        textManagerData.setNewText('')
        // Поставить флаг, что новый элемент истории для занесения нового текста ещё не поставлен.
        textManagerData.setNewHistoryItemCreated(false)
        textManagerData.setTextCompId(null)
    }
    else if (type === 'paste') {
        // Обновить textManagerData
        textManagerData.setInitialText(newText)
    }
    else if (type === 'history') {
        // Подождать пока загрузятся новые данные выделенного текстового компонента
        setTimeout(function () {
            const currentHistoryItem = articleManager.getCurrentHistoryItem()
            const dTextComp = articleManager.getComponent(currentHistoryItem.article.dComps, textManagerData.textCompId) as ArticleTypes.SimpleTextComponent

            textManagerData.setInitialText(dTextComp.text)
            textManagerData.setNewText(dTextComp.text)
            textManagerData.setNewHistoryItemCreated(false)
            textManagerData.setTextCompId(dTextComp.dCompId)
        }, 60)
    }
}
