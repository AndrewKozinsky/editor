import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from '../articleManager'

/**
 * Удаление компонента или элемента в зависимости от переданных параметров.
 * Функцию можно запускать если известно, что эта операция возможна.
 * @param {Object} article — данные статьи
 * @param {Object} compCoords — координаты удаляемого компонента/элемента
 */
export function deleteItem(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
): StoreArticleTypes.CreateNewHistoryItem {
    // Если выделен компонент или корневой элемент,
    if (['rootElement', 'textComponent'].includes(compCoords.tagType)) {
        // Удалить весь компонент
        return this.deleteComponent(article, compCoords.dataCompId)
    }
    else if (compCoords.tagType === 'element') {
        // Если выделен элемент, то удалить его
        return this.deleteElement(article, compCoords)
    }
}

/**
 * Удаление компонента
 * @param {Object} article — данные статьи
 * @param {Number} dataCompId — id данных удаляемого компонента
 */
export function deleteComponent(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    dataCompId: ArticleTypes.Id
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Массив, где находится удаляемый компонент
    const parentArr = this.getCompParentArray(dComps, dataCompId)

    // idx позиции компонента в массиве
    const dCompIdx = parentArr.findIndex(dComp => dComp.dCompId === dataCompId)

    // Удалить компонент из массива, где он сейчас находится
    const updatedParentArr = parentArr.slice()
    updatedParentArr.splice(dCompIdx, 1)

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, parentArr, updatedParentArr)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}

/**
 * Удаление элемента компонента
 * @param {Object} article — данные статьи
 * @param {Object} compCoords — координаты удаляемого компонента/элемента
 */
export function deleteElement(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Данные компонента
    const dComp = this.getComponent(dComps, compCoords.dataCompId)
    if (!dComp || dComp.dCompType === 'simpleTextComponent') return

    // Массив, где находится удаляемый элемент
    const elemsArr = this.getDElemInnerElemsArrByElemId(dComp.dElems.dCompElemInnerElems, compCoords.dataElemId)

    // Скопировать массив и удалить элемент
    const updatedElemsArr = elemsArr.concat()
    const elemIdx = elemsArr.findIndex(dElem => {
        return dElem.dCompElemId === compCoords.dataElemId
    })
    updatedElemsArr.splice(elemIdx, 1)

    // Поставить изменённый массив в updatedDComps
    const updatedDComps = makeImmutableCopy(dComps, elemsArr, updatedElemsArr)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}
