import StoreArticleTypes from 'store/article/articleTypes'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import articleManager from '../articleManager'

/**
 * Переключение видимости компонента или элемента.
 * Функцию можно запускать если известно, что эта операция возможна.
 * @param {Object} article — данные статьи
 * @param {Object} compCoords — координаты удаляемого компонента/элемента
 */
export function changeVisibility(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
): StoreArticleTypes.CreateNewHistoryItem {
    // Если выделен корневой элемент,
    if (compCoords.tagType === 'textComponent') {
        // то поменять видимость текстового компонента
        return this.changeVisibilityOfTextComp(article, compCoords.dataCompId)
    }
    else {
        // Если выделен корневой элемент или обычный элемент, то изменить его видимость
        return this.changeVisibilityOfElem(article, compCoords)
    }
}

/**
 * Переключение видимости компонента.
 * @param {Object} article — данные статьи
 * @param {Number} dataCompId — id данных выделенного компонента
 * @returns {StoreArticleTypes.CreateNewHistoryItem}
 */
export function changeVisibilityOfTextComp(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    dataCompId: ArticleTypes.Id
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    const dComp = articleManager.getComponent(dComps, dataCompId)
    const updatedDComp = Object.assign({}, dComp)

    if (updatedDComp.dCompType === 'component') return

    if (updatedDComp?.dCompLayer?.layerHidden) {
        delete updatedDComp.dCompLayer.layerHidden
    }
    else {
        if (!updatedDComp.dCompLayer) {
            updatedDComp.dCompLayer = {layerHidden: true}
        }
        else if (!updatedDComp.dCompLayer.layerHidden) {
            updatedDComp.dCompLayer.layerHidden = true
        }
    }

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, dComp, updatedDComp)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}

/**
 * Переключение видимости элемента.
 * @param {Object} article — данные статьи
 * @param {Object} compCoords — координаты элемента у которого нужно переключить видимость.
 * @returns {StoreArticleTypes.CreateNewHistoryItem}
 */
export function changeVisibilityOfElem(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    const dElem = articleManager.getDataElemInDataCompArr(dComps, compCoords.dataCompId, compCoords.dataElemId)
    const updatedDElem = Object.assign({}, dElem)

    if (!updatedDElem.dCompElemLayer) {
        updatedDElem.dCompElemLayer = {layerHidden: true}
    }
    else {
        updatedDElem.dCompElemLayer.layerHidden = !updatedDElem.dCompElemLayer.layerHidden
    }

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, dElem, updatedDElem)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}
