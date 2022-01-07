import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from '../articleManager'

/**
 * Перемещение компонента в какую-то часть статьи в зависимости от вводных параметров.
 * Функцию можно запускать если известно, что эта операция возможна.
 * @param {Object} article — данные статьи
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 */
export function moveComponentToProperPosition(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id
) {
    // Если целевой компонент не выделен, то переместить компонент в нижнюю часть статьи
    if (!targetCompCoords.dataCompId) {
        return this.moveComponentToRoot(article, moveCompId, 'bottom')
    }
    // Если целевой компонент выделен, то поместить следом за ним
    else if (targetCompCoords.dataCompId && !targetCompCoords.dataElemId) {
        return this.moveCompNearComp(article, targetCompCoords, moveCompId, 'down')
    }
    // Если выделен элемент не содержащий другие элементы, то переместить в него.
    else if (targetCompCoords.dataCompId && targetCompCoords.dataElemId) {
        // Если элемент является корневым и содержит вложенные элементы,
        // то поместить компонент ниже целевого компонента
        if (targetCompCoords.tagType === 'rootElement') {
            return this.moveCompNearComp(article, targetCompCoords, moveCompId, 'down')
        }
        // В остальных случаях поместить компонент внутрь целевого элемента
        else {
            return this.moveComponentToElement(article, targetCompCoords, moveCompId)
        }
    }
}

/**
 * Функция перемещает компонент в корень статьи (наверх или вниз)
 * @param {Object} article — статья
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @param {String} place — в какую часть корня статьи переместить компонент: top (наверх) или bottom (вниз)
 */
export function moveComponentToRoot(
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
}

/**
 * Функция перемещает компонент выше или ниже целевого компонента
 * @param {Object} article — статья
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @param {String} place — в каком направлении переместить компонент: top (выше) или bottom (ниже)
 */
export function moveCompNearComp(
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
}

/**
 * Функция перемещает компонент в элемент
 * @param {Object} article — статья
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @returns {Object} — возвращает объект со всеми компонентами статьи и максимальным id
 */
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
}

/**
 * Функция перемещает компонент или элемент выше, или ниже в его массиве
 * @param {Object} article — статья
 * @param {Object} compCoords — координаты перемещаемого компонента/элемента
 * @param {String} direction — направление перемещения
 */
export function moveItemToUpOrDown(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
    direction: 'up' | 'down'
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article
    const { dataCompId, dataElemId, tagType} = compCoords

    const dComp = this.getComponent(dComps, dataCompId)
    if (dComp.dCompType === 'simpleTextComponent') return

    // Сюда будет присвоен обновлённый массив компонентов
    let updatedDComps: ArticleTypes.Components

    if (['component', 'rootElement'].includes(tagType )) {
        const parentArr = this.getCompParentArray(dComps, dataCompId)
        const updatedParentArr = parentArr.slice()

        // Индекс положения компонента
        const idx = parentArr.findIndex(dComp => dComp.dCompId === dataCompId)
        updatedParentArr.splice(idx, 1)

        if (direction === 'up') {
            updatedParentArr.splice(idx - 1, 0, dComp)
        }
        else if (direction === 'down') {
            updatedParentArr.splice(idx + 1, 0, dComp)
        }

        // Поставить новый массив детей в объект истории статьи
        updatedDComps = makeImmutableCopy(dComps, parentArr, updatedParentArr)
    }
    else {
        // Данные выделенного элемента
        const dElem = this.getDataElemInDataComp(dComp, dataElemId)

        // Индекс положения элемента
        const idx = dComp.dElems.findIndex(dElem => dElem.dCompElemId === dataElemId)
        const updatedElemsArr = dComp.dElems.slice()

        if (direction === 'up') {
            updatedElemsArr.splice(idx - 1, 0, dElem)
        }
        else if (direction === 'down') {
            updatedElemsArr.splice(idx + 1, 0, dElem)
        }

        // Поставить новый массив детей в объект истории статьи
        updatedDComps = makeImmutableCopy(dComps, dComp.dElems, updatedElemsArr)
    }

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}
