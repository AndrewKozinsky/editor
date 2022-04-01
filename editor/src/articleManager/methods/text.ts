import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'


/**
 * Функция обновляет текст в текстовом компоненте и возвращает объект с данными для создания нового элемента истории
 * @param {Object} article — данные статьи.
 * @param {Object} dTextComp — данные текстового компонента где нужно изменить текст.
 * @param {String} newText — новый текст текстового компонента
 */
export function updateTextInComponent(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    dTextComp: ArticleTypes.SimpleTextComponent,
    newText?: string
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    const updatedDTextComp = Object.assign({}, dTextComp)
    if (typeof newText === 'string') {
        updatedDTextComp.text = newText
    }

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: makeImmutableCopy(dComps, dTextComp, updatedDTextComp)
    }
}
