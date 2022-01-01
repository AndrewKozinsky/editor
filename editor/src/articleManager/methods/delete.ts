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
    if (['component', 'rootElement'].includes(compCoords.tagType)) {
        // то удалить весь компонент
        return this.deleteComponent(article, compCoords.dataCompId)
    }
    else {
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
    const elemsArr = dComp.dElems

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

/**
 * Функция перемещает компонент в корень статьи (наверх или вниз)
 * @param {Object} article — статья
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @param {String} place — в какую часть корня статьи переместить компонент: top (наверх) или bottom (вниз)
 */
/*export function moveComponentToRoot(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    moveCompId: ArticleTypes.Id,
    place: 'top' | 'bottom' = 'bottom'
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Перемещаемый компонент
    const movedDComp = this.getComponent(dComps, moveCompId) as ArticleTypes.Component

    // Массив, где находится перемещаемый компонент
    const parentArr = this.getCompParentArray(dComps, movedDComp.dCompId)

    // idx позиции компонента в массиве
    const movedDCompIdx = parentArr.findIndex(dComp => dComp.dCompId === moveCompId)

    let updatedDComps = dComps.slice()

    // Если перемещаемый компонент находится в корневом массиве...
    if (dComps === parentArr) {
        // Удалить компонент из корневого массива
        updatedDComps.splice(movedDCompIdx, 1)
    }
    else {
        // Убрать перемещаемый компонент из массива, где он сейчас находится
        const updatedParentArr = parentArr.slice()
        updatedParentArr.splice(movedDCompIdx, 1)

        // Поставить изменённый массив в updatedDComps
        updatedDComps = makeImmutableCopy(updatedDComps, parentArr, updatedParentArr)
    }

    // Поставить перемещаемый компонент или наверх, или вниз
    if (place === 'top') updatedDComps.unshift(movedDComp)
    else if (place === 'bottom') updatedDComps.push(movedDComp)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}*/

/**
 * Функция перемещает компонент выше или ниже целевого компонента
 * @param {Object} article — статья
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @param {String} place — в каком направлении переместить компонент: top (выше) или bottom (ниже)
 */
/*export function moveCompNearComp(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id,
    place: 'up' | 'down' = 'down'
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Перемещаемый компонент
    const moveDComp = this.getComponent(dComps, moveCompId)
    if (moveDComp.dCompType === 'simpleTextComponent') return

    // Получение массива, в котором находится перемещаемый компонент и его индекса
    const moveCompParentArr = this.getCompParentArray(dComps, moveCompId)
    const moveCompIdx = this.getDCompIdxInArray(moveCompParentArr, moveCompId)

    // Удалить компонент из массива и составить новый массив
    let updatedMoveCompParentArr = moveCompParentArr.slice()
    updatedMoveCompParentArr.splice(moveCompIdx, 1)

    // Поставить новый массив в массив всех компонентов
    let updatedDComps = makeImmutableCopy(dComps, moveCompParentArr, updatedMoveCompParentArr)

    // ========================

    // Получение массива, в котором находится перемещаемый компонент и его индекса
    const targetCompParentArr = this.getCompParentArray(dComps, targetCompCoords.dataCompId)
    const targetCompIdx = this.getDCompIdxInArray(targetCompParentArr, targetCompCoords.dataCompId)

    // Поместить перемещаемый компонент в копию целевого массива
    let updatedTargetCompParentArr = targetCompParentArr.slice()
    if (place === 'up') updatedTargetCompParentArr.splice(targetCompIdx - 1, 0, moveDComp)
    else if (place === 'down') updatedTargetCompParentArr.splice(targetCompIdx, 0, moveDComp)

    updatedDComps = makeImmutableCopy(updatedDComps, targetCompParentArr, updatedTargetCompParentArr)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}*/

/**
 * Функция перемещает компонент в элемент
 * @param {Object} article — статья
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @returns {Object} — возвращает объект со всеми компонентами статьи и максимальным id
 */
/*
export function moveComponentToElement(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Перемещаемый компонент
    const movedDComp = this.getComponent(dComps, moveCompId) as ArticleTypes.Component

    // Массив, где находится перемещаемый компонент
    const parentArr = this.getCompParentArray(dComps, movedDComp.dCompId)
    if (!parentArr || !Array.isArray(parentArr)) return

    // Удалить перемещаемый компонент из родительского массива
    const updatedParentArr = parentArr.filter(dComp => dComp.dCompId !== movedDComp.dCompId)

    // Сделать новый объект истории статьи без перемещаемого компонента
    let updatedDComps = makeImmutableCopy(dComps, parentArr, updatedParentArr)

    // Целевой элемент
    const targetDElem = this.getDataElemInDataCompArr(dComps, targetCompCoords.dataCompId, targetCompCoords.dataElemId)
    // Массив детей целевого элемента
    const targetDElemChildren = targetDElem.dCompElemChildren
    if (!Array.isArray(targetDElemChildren)) return

    // Скопировать массив детей целевого элемента и поставить перемещаемый компонент
    const targetDElemChildrenCopy = targetDElemChildren.concat()
    targetDElemChildrenCopy.push(movedDComp)

    // Поставить новый массив детей целевого элемента в объект истории статьи
    updatedDComps = makeImmutableCopy(updatedDComps, targetDElemChildren, targetDElemChildrenCopy)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}*/
