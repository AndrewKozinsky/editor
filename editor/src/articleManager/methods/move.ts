import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import articleManager from '../articleManager'

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
    place: 'left' | 'right'
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Перемещаемый компонент
    const movedDComp = this.getComponent(dComps, moveCompId) as ArticleTypes.Component

    // Массив, где находится перемещаемый компонент
    const moveCompParentArr = this.getCompParentArray(dComps, movedDComp.dCompId)

    // idx позиции компонента в массиве
    const movedDCompIdx = moveCompParentArr.findIndex(dComp => dComp.dCompId === moveCompId)

    let updatedDComps = dComps.slice()

    // Если перемещаемый компонент находится в корневом массиве...
    if (dComps === moveCompParentArr) {
        // Удалить компонент из корневого массива
        updatedDComps.splice(movedDCompIdx, 1)
    }
    else {
        // Убрать перемещаемый компонент из массива, где он сейчас находится
        const updatedMoveCompParentArr = moveCompParentArr.slice()
        updatedMoveCompParentArr.splice(movedDCompIdx, 1)

        // Поставить изменённый массив в updatedDComps
        updatedDComps = makeImmutableCopy(updatedDComps, moveCompParentArr, updatedMoveCompParentArr)
    }

    // Поставить перемещаемый компонент или наверх, или вниз
    if (place === 'left') updatedDComps.unshift(movedDComp)
    else if (place === 'right') updatedDComps.push(movedDComp)

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}

/**
 * Функция перемещает компонент выше или ниже целевого компонента
 * @param {Object} article — статья
 * @param {Object} targetCompId — id данных целевого компонента (к которому перемещают перемещаемый компонент)
 * @param {Number} moveCompId — id данных перемещаемого компонента
 * @param {String} direction — в каком направлении переместить компонент: top (выше) или bottom (ниже)
 */
export function moveCompNearComp(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    targetCompId: ArticleTypes.Id,
    moveCompId: ArticleTypes.Id,
    direction: 'left' | 'right'
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Перемещаемый компонент
    const moveDComp = this.getComponent(dComps, moveCompId)

    // Получение массива, в котором находится перемещаемый компонент и его индекса
    const moveCompParentArr = this.getCompParentArray(dComps, moveCompId)
    const moveCompIdx = this.getDCompIdxInArray(moveCompParentArr, moveCompId)

    // Удалить компонент из массива и составить новый массив
    let updatedMoveCompParentArr = moveCompParentArr.slice()
    updatedMoveCompParentArr.splice(moveCompIdx, 1)

    // Поставить новый массив в массив всех компонентов
    let updatedDComps = makeImmutableCopy(dComps, moveCompParentArr, updatedMoveCompParentArr)

    // ========================

    // Получение массива, в котором находится целевой компонент и его индекса
    const targetCompParentArr = this.getCompParentArray(updatedDComps, targetCompId)
    const targetCompIdx = this.getDCompIdxInArray(targetCompParentArr, targetCompId)

    // Позиция в массиве, в которую будет перемещён компонент в зависимости от направления перемещения
    const positionIdx = direction === 'left'
        ? targetCompIdx // left // МОЖЕТ ТУТ НУЖНО НАПИСАТЬ - 1?
        : targetCompIdx + 1     // right

    // Скопировать целевой массив и переместить туда перемещаемый компонент
    let updatedTargetCompParentArr = targetCompParentArr.slice()
    updatedTargetCompParentArr.splice(positionIdx, 0, moveDComp)

    // ========================

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
    const movedDComp = this.getComponent(dComps, moveCompId)

    // Массив, где находится перемещаемый компонент
    const moveCompParentArr = this.getCompParentArray(dComps, movedDComp.dCompId)
    if (!moveCompParentArr) return

    // Удалить перемещаемый компонент из родительского массива
    const updatedMoveCompParentArr = moveCompParentArr.filter(dComp => dComp.dCompId !== movedDComp.dCompId)

    // Сделать новый объект истории статьи без перемещаемого компонента
    let updatedDComps = makeImmutableCopy(dComps, moveCompParentArr, updatedMoveCompParentArr)

    // Целевой элемент в который будет поставлен перемещаемый компонент
    const targetDElem = this.getDataElemInDataCompArr(dComps, targetCompCoords.dataCompId, targetCompCoords.dataElemId)

    // Массив детей целевого элемента
    const targetDElemChildren = targetDElem.dCompElemChildren

    // Скопировать массив детей целевого элемента и поставить перемещаемый компонент
    const targetDElemChildrenCopy = [...targetDElemChildren, movedDComp]

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

    // Сюда будет присвоен обновлённый массив компонентов
    let updatedDComps: ArticleTypes.Components

    if (['rootElement', 'textComponent'].includes(tagType)) {
        const parentArr = this.getCompParentArray(dComps, dataCompId)
        const updatedParentArr = parentArr.slice()

        // Индекс положения перемещаемого компонента
        const idx = parentArr.findIndex(dComp => dComp.dCompId === dataCompId)

        // Удалить перемещаемый компонент из массива
        updatedParentArr.splice(idx, 1)

        // Позиция в массиве, в которую будет перемещён компонент в зависимости от направления перемещения
        const newIdx = direction === 'up'
            ? idx - 1  // up
            : idx + 1  // down

        // Переместить компонент в новое положение
        updatedParentArr.splice(newIdx, 0, dComp)

        // Поставить новый массив детей в объект истории статьи
        updatedDComps = makeImmutableCopy(dComps, parentArr, updatedParentArr)
    }
    else if (tagType === 'element' && dComp.dCompType === 'component') {
        // Данные выделенного элемента
        const dElem = this.getDElemInDComp(dComp, dataElemId)

        // Массив, где находится удаляемый элемент
        const elemsArr = this.getDElemInnerElemsArrByElemId(dComp.dElems.dCompElemInnerElems, compCoords.dataElemId)
        // Индекс положения элемента
        const idx = elemsArr.findIndex(dElem => dElem.dCompElemId === dataElemId)

        // Удалить элемент
        const updatedElemsArr = elemsArr.slice()
        updatedElemsArr.splice(idx, 1)

        if (direction === 'up') {
            updatedElemsArr.splice(idx - 1, 0, dElem)
        }
        else if (direction === 'down') {
            updatedElemsArr.splice(idx + 1, 0, dElem)
        }

        // Поставить новый массив детей в объект истории статьи
        updatedDComps = makeImmutableCopy(dComps, elemsArr, updatedElemsArr)
    }

    return {
        maxCompId: article.dMeta.dMaxCompId,
        components: updatedDComps
    }
}
