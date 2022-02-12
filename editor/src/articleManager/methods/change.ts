import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import articleManager from '../articleManager'
import { createDeepCopy } from 'utils/miscUtils'

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
 * Функция изменяет атрибут элемента на переданный
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
