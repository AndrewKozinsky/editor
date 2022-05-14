import articleManager from 'articleManager/articleManager'
import { store } from 'store/rootReducer'
import articleActions from 'store/article/articleActions'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { getState } from 'utils/miscUtils'
import textManagerStore from './textManagerStore'


/**
 * Функция запускаемая когда нужно поставить в данные текстового компонента текст введённый в этом компоненте.
 * Когда пользователь изменяет текстовый компонент новый текст записывается в textManagerStore. Но в данных отсутствует.
 * Эту функцию нужно запускать когда требуется поставить новый текст в данные текстового компонента.
 * Сначала удаляется новый текст и ставится старый, затем новый текст записывается в данные, после Реакт перерисует статью.
 * {String} type — тип обновления текста в текстовом компоненте
 */
export function updateDataInTextComp(
    type: 'common' | 'paste' | 'history',
    $textComp?: Element
) {
    if (!textManagerStore.textCompId) return
    if (textManagerStore.initialText === textManagerStore.newText) return

    if (!$textComp) {
        const { $body } = getState().article.$links
        $textComp = articleManager.get$elemBy$body($body, textManagerStore.textCompId)
    }

    // Получение данных текстового компонента
    const currentHistoryItem = articleManager.getCurrentHistoryItem()
    const dTextComp = articleManager.getComponent(
        currentHistoryItem.article.dComps, textManagerStore.textCompId
    ) as ArticleTypes.SimpleTextComponent


    if (type === 'common' || type === 'paste') {
        // Поставить в данные текстового компонента новый текст чтобы Реакт поставил его в HTML.
        // Создать новый объект истории со ссылкой на копию текстового компонента
        const compsAndMaxCompId = articleManager.updateTextInComponent(
            currentHistoryItem.article, dTextComp, textManagerStore.newText
        )

        // Обновить текущий объект истории
        store.dispatch( articleActions.updateCurrentHistoryItem(compsAndMaxCompId, true) )
    }


    if (type === 'common') {

    }
    else if (type === 'paste') {
        // Обновить textManagerStore
        textManagerStore.setInitialText(textManagerStore.newText)
        textManagerStore.setNewHistoryItemCreated(false)

        // Если создали новый компонент и затем вставили текст, то там нет текстового узла, поэтому создать
        if (!$textComp.firstChild) {
            const newTextNode = document.createTextNode('')
            $textComp.appendChild(newTextNode)
        }

        // Оставь это закомментированным пока
        // $textComp.firstChild.textContent = textManagerStore.newText
    }
    else if (type === 'history') {
        let newText = dTextComp.text

        $textComp.firstChild.textContent = newText

        textManagerStore.newText = newText
        textManagerStore.setNewHistoryItemCreated(false)
    }
}
