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
    // Если выделен компонент или корневой элемент,
    if (['component', 'rootElement'].includes(compCoords.tagType)) {
        // то удалить весь компонент
        return changeVisibilityOfComp(article, compCoords.dataCompId)
    }
    else {
        // Если выделен элемент, то удалить его
        return changeVisibilityOfElem(article, compCoords)
    }
}

/**
 * Переключение видимости компонента.
 * @param {Object} article — данные статьи
 * @param {Number} dataCompId — id данных выделенного компонента
 * @returns {StoreArticleTypes.CreateNewHistoryItem}
 */
function changeVisibilityOfComp(
    article: ArticleTypes.Article,
    dataCompId: ArticleTypes.Id
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    const dComp = articleManager.getComponent(dComps, dataCompId)
    const updatedDComp = Object.assign({}, dComp)

    if (updatedDComp.dCompType === 'simpleTextComponent') return

    if (!updatedDComp.dCompLayer) {
        updatedDComp.dCompLayer = {layerHidden: true}
    }
    else {
        updatedDComp.dCompLayer.layerHidden = !updatedDComp.dCompLayer.layerHidden
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
function changeVisibilityOfElem(
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
