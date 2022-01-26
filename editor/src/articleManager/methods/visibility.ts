import StoreArticleTypes from 'store/article/articleTypes'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import { createDeepCopy } from 'utils/miscUtils'
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

/**
 * Функция изменяет тег элемента на переданный
 * @param {Object} article — данные статьи
 * @param {Number} dCompId — id данных компонента
 * @param {Number} dElemId — id данных элемента, в котором нужно поменять тег
 * @param {string} tagValue — id или название тега, на который нужно поменять текущий тег
 */
export function changeElemTag(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    dCompId: ArticleTypes.Id,
    dElemId: ArticleTypes.Id,
    tagValue: string
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    const dElem = articleManager.getDataElemInDataCompArr(dComps, dCompId, dElemId)
    const updatedDElem = Object.assign({}, dElem)

    // Поставить в данные тега присланный тег (id или название)
    updatedDElem.dCompElemTag = tagValue

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, dElem, updatedDElem)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}

/**
 * Функция изменяет тег элемента на переданный
 * @param {Object} article — данные статьи
 * @param {Number} dCompId — id данных компонента
 * @param {Number} dElemId — id данных элемента, в котором нужно поменять тег
 * @param {String} attrId — id атрибута для изменения
 * @param {Array} attrValue — массив идентификаторов или значение атрибута
 */
export function changeElemAttr(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    dCompId: ArticleTypes.Id,
    dElemId: ArticleTypes.Id,
    attrId: TempCompTypes.ElemAttrValueId,
    attrValue: ArticleTypes.ComponentElemAttribValue,
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Данные элемента в котором будут менять значение атрибута
    const dElem = articleManager.getDataElemInDataCompArr(dComps, dCompId, dElemId)

    // Объект со значением атрибута
    const dAttr = dElem.dCompElemAttrs.find(dAttr => {
        return dAttr.tCompElemAttrId === attrId
    })

    const updatedDAttr = createDeepCopy(dAttr)
    updatedDAttr.dCompElemAttrValue = attrValue

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, dAttr, updatedDAttr)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}
