import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import {getTagDisplayType, isUnpairedTag} from 'utils/domUtils'


/**
 * Функция проверяет можно ли перемещать компонент выделенный для перемещения
 * @param {String} direction — направление перемещения компонента: левее или правее.
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Array} dComps — массив всех компонентов
 * @param {Object} targetCompCoords — координаты целевого компоненте по отношению к которому будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 */
export function canMoveCompMoveToLeftOrRight(
    this: typeof articleManager,
    direction: 'left' | 'right',
    tempCompArr: TempCompTypes.TempComps,
    dComps: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id
) {
    // Нельзя перемещать если перемещаемый компонент не выделен
    if(!moveCompId) return false

    // Если выделенный элемент находится внутри перемещаемого компонента, то такое перемещение запрещено
    const movedDComp = this.getComponent(dComps, moveCompId)
    if (movedDComp && movedDComp.dCompType === 'component') {
        // Найти выделенный элемент внутри перемещаемого
        if (this.getItemInDComp(movedDComp, targetCompCoords.dataCompId, targetCompCoords.dataElemId)) {
            return false
        }
    }

    return true

    // После можно дописать код и определять, что если перемещаемый компонент после перемещения
    // будет находиться в том же месте, что и раньше, то такие перемещения запрещать
}

/**
 * The function check can you insert a component into the target element
 * Функция используется для вычисления может ли компонент в списке компонентов быть вставлен в выделенный элемент.
 * Для кнопки Вставка перемещаемого компонента в другой элемент используется функция
 * @param {Array} tComps — components templates array
 * @param {Array} dComps — array of data components
 * @param {Object} targetCompCoords — координаты целевого компоненте в который будет перемещаться компонент
 * @param {Number} moveCompId — id данных перемещаемого компонента
 */
export function canComponentPutInElement(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    dComps: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    moveCompId: ArticleTypes.Id // РЕКОМЕНДУЕТСЯ ВМЕСТО ID ПЕРЕМЕЩАЕМОГО КОМПОНЕНТА ЗАДАВАТЬ ID ШАБЛОНА КОМПОНЕНТА ПОТОМУ ЧТО ЭТОТ МЕТОД ИСПОЛЬЗУЕТСЯ ТАКЖЕ ДЛЯ ПРОВЕРКИ МОЖНО ЛИ ВСТАВИТЬ В ВЫДЕЛЕННЫЙ ЭЛЕМЕНТ ЕЩЁ НЕ СОЗДАННЫЙ КОМПОНЕНТ
) {
    // Если не выделен целевой элемент и перемещаемый компонент, то нельзя вставить перемещаемый компонент
    if (targetCompCoords.dataElemId === null || moveCompId === null) return false

    // Получение шаблона выделенного элемента
    const targetTElem = this.getTElemByDCompIdAndDElemId(
        dComps, targetCompCoords.dataCompId, targetCompCoords.dataElemId, tComps
    )
    if (!targetTElem) return false

    // Получение данных целевого элемента
    const targetDComp = this.getComponent(dComps, targetCompCoords.dataCompId)

    // Нельзя помещать компонент в текстовый компонент
    if (targetDComp.dCompType === 'simpleTextComponent') return false

    const targetDElem = this.getDElemInDComp(targetDComp, targetCompCoords.dataElemId)

    // Если html-элемент имеет вложенные html-элементы, то туда нельзя вставить перемещаемый компонент
    const has$ElemNested$Elements = this.has$ElemNested$Elements(tComps, targetDComp.tCompId, targetTElem.elemId)
    if (has$ElemNested$Elements) return false

    const $elem = this.get$elem(tComps, targetDComp.tCompId, targetDElem.tCompElemId)

    // Если целевой элемент является одиночным тегом (<img />, например), то туда нельзя вставить перемещаемый компонент
    if (isUnpairedTag($elem?.tagName)) return false


    // Перемещаемый компонент
    const movedDComp = this.getComponent(dComps, moveCompId)

    // Шаблон перемещаемого (или создаваемого) компонента
    if (movedDComp?.dCompType === 'component') {
        // Получение перемещаемого элемента
        const $moveRootElem = this.get$componentByTComps(tComps, movedDComp.tCompId)

        // Названия тегов перемещаемого и целевого элементов
        const moveElemTag = $moveRootElem.tagName
        const targetElemTag = $elem.tagName

        // Проверить разрешено ли перемещаемый тег перенести в целевой
        const canTagInsertInAnotherTag = this.canTagInsertInAnotherTag(moveElemTag, targetElemTag)
        if (!canTagInsertInAnotherTag) return false
    }

    // Если выделенный элемент находится внутри перемещаемого компонента, то такое перемещение запрещено
    if (movedDComp?.dCompType === 'component') {
        // Найти выделенный элемент внутри перемещаемого
        if (this.getItemInDComp(movedDComp, targetCompCoords.dataCompId, targetCompCoords.dataElemId)) {
            return false
        }
    }

    // В остальных случаях перемещаемый компонент можно поместить в выделенный элемент
    return true
}


/**
 * The function checks if $element in component template html-string has children
 * @param {Array} tComps — components templates array
 * @param {Number} tCompId — id шаблона компонента
 * @param {String} tElemId — element template id
 */
export function has$ElemNested$Elements(
    this: typeof articleManager,
    tComps: TempCompTypes.TempComps,
    tCompId: TempCompTypes.Id,
    tElemId: TempCompTypes.ElemId
) {
    // Get component template
    const tempComp =  this.getTemplate(tComps, tCompId)
    if (!tempComp) return true

    // Turn html-string to HTMLElement
    const $component = this.get$componentByTComp(tempComp)

    let $elem: HTMLElement = $component.closest(`[data-em-id=${tElemId}]`)
    if (!$elem) $elem = $component.querySelector(`[data-em-id=${tElemId}]`)
    if (!$elem) return true

    return !!$elem.childElementCount
}


/**
 * The function checks if I can make undo or redo history step
 * @param {String} direction — step direction: undo OR redo
 * @param {Array} historyArr — articles history array
 * @param {Number} currentIdx — current history array index
 */
export function canMakeHistoryStep(
    this: typeof articleManager,
    direction: 'undo' | 'redo',
    historyArr: StoreArticleTypes.HistoryItems,
    currentIdx: number
) {
    return (
        (direction === 'undo' && currentIdx - 1 !== -1) ||
        (direction === 'redo' && currentIdx + 1 < historyArr.length)
    )
}


/**
 * Функция проверяет можно ли удалить компонент/элемент по переданным координатам
 * @param {Array} dComps — массив компонентов статьи
 * @param {Object} targetCompCoords — координаты компоненте который будут удалять
 */
export function canDeleteElem(
    this: typeof articleManager,
    dComps: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
) {
    // Если выделен текстовый компонент или корневой элемент, то можно удалить весь компонент
    if (['rootElement', 'textComponent'].includes(targetCompCoords.tagType)) {
        return true
    }

    // Если выделен элемент...
    if (targetCompCoords.tagType === 'element') {
        const dComp = this.getComponent(dComps, targetCompCoords.dataCompId) as ArticleTypes.Component

        // Поиск массива dCompElemInnerElems где находится удаляемый элемент
        const dElemInnerElemsArr = this.getDElemInnerElemsArrByElemId(dComp.dElems.dCompElemInnerElems, targetCompCoords.dataElemId)
        if (!dElemInnerElemsArr) return false

        const dElem = this.getDElemInDComp(dComp, targetCompCoords.dataElemId)

        // Получить количество таких же элементов как выделенный
        const elemCount = this.getElemCountInInnerElemsArr(dElemInnerElemsArr, dElem)
        // Элемент можно удалить если его количество больше одного
        return elemCount > 1
    }

    return false
}

/**
 * Функция проверяет можно ли переместить выделенный компонент или элемент выше, или ниже в его массиве
 * @param {Array} dComps — массив компонентов статьи
 * @param {Object} targetCompCoords — координаты проверяемого компонента/элемента
 * @param {String} direction — направление перемещения
 */
export function canMoveItemToUpOrDown(
    this: typeof articleManager,
    dComps: ArticleTypes.Components,
    targetCompCoords: StoreArticleTypes.FlashedElem,
    direction: 'up' | 'down'
) {
    const { dataCompId, dataElemId, tagType} = targetCompCoords

    // Если компонент/элемент не выделен, то перемещение запрещено
    if (!tagType || !dComps.length) return false

    // idx перемещаемого компонента/элемента в его массиве и длина этого массива
    let idx: number
    let parentArrLength: number

    if (['rootElement', 'textComponent'].includes(tagType)) {
        const parentArr = this.getCompParentArray(dComps, dataCompId)
        if (!parentArr) return false

        // Индекс положения компонента и длина массива
        idx = parentArr.findIndex(dComp => dComp.dCompId === dataCompId)
        parentArrLength = parentArr.length
    }
    else if (tagType === 'element') {
        // Компонент содержащий выделенный элемент
        const dComp = this.getComponent(dComps, dataCompId)
        if (dComp.dCompType === 'simpleTextComponent') return false

        // Данные выделенного элемента
        const dElem = this.getDElemInDComp(dComp, dataElemId)

        // Составить массив элементов с таким же id шаблона элемента
        // потому что мне нужно проверить смогу ли я перемещать элемент в пределах элементов из его группы
        const dElemInnerElemsArr = this.getDElemInnerElemsArrByElemId(dComp.dElems.dCompElemInnerElems, dElem.dCompElemId)
        const elemsGroupArr = dElemInnerElemsArr.filter(el => el.tCompElemId === dElem.tCompElemId)

        // Индекс положения элемента и длина массива
        idx = elemsGroupArr.findIndex(dElem => dElem.dCompElemId === dataElemId)
        parentArrLength = elemsGroupArr.length
    }

    if (direction === 'up' && idx > 0) return true
    else if (direction === 'down' && idx < parentArrLength - 1) return true

    return false
}


/**
 * Функция проверяет можно ли клонировать компонент/элемент и вставить после выделенного элемента
 * @param {Array} dComps — массив компонентов статьи
 * @param {Object} compCoords — координаты выделенного компонента/элемента
 * * @param {Array} tempComps — массив шаблонов компонентов
 */
export function canClone(
    this: typeof articleManager,
    dComps: ArticleTypes.Components,
    compCoords: StoreArticleTypes.FlashedElem,
    tempComps: TempCompTypes.TempComps
) {
    // Разрешить клонирование если выделили текст, корневой элемент
    if (['textComponent', 'rootElement'].includes(compCoords.tagType)) {
        return true
    }
    // Запретить если ничего не выделили
    if (!compCoords.dataCompId) {
        return false
    }

    // Выделен элемент...
    // Получение данных и шаблона элемента
    const dComp = articleManager.getComponent(dComps, compCoords.dataCompId) as  ArticleTypes.Component
    const dElem = articleManager.getDElemInDComp(dComp, compCoords.dataElemId)
    const tElem = articleManager.getTElemByTCompIdAndTElemId(tempComps, dComp.tCompId, dElem.tCompElemId)

    // Если в шаблоне не запрещено делать копии, то разрешено.
    return !(tElem.elemCanDuplicate === false)
}

/**
 * Функция выясняет по id данных элемента является ли элемент корневым
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные выделенного элемента
 */
/*export function isElemIsRootByDElem(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    dComp: ArticleTypes.Component,
    dElem: ArticleTypes.ComponentElem,
) {
    // Get component html
    const $component = this.get$componentByTComps(tempCompArr, dComp.tCompId)
    if (!$component || !$component.dataset.emId) return false

    return $component.dataset.emId === dElem.tCompElemId
}*/


/**
 * Функция проверяет скрыт ли один из родителей переданного компонента/элемента
 * @param {Array} dItems — массив компонентов
 * @param {Object} targetDComp — данные целевого компонента у которого проверяется наличие скрытого предка
 * @param {Object} targetDElem — данные целевого элемента у которого проверяется наличие скрытого предка
 * @param {Boolean} parentItemHidden — скрыт ли компонент/элемент находящийся выше в иерархии
 * @param {Object} parentDComp — данные компонента к которому принадлежат перебираемый массив элементов
 */
export function isParentElemHidden(
    this: typeof articleManager,
    dItems: ArticleTypes.Components | ArticleTypes.ComponentElems, //  | ArticleTypes.ElemChildren,
    targetDComp: ArticleTypes.Component | ArticleTypes.SimpleTextComponent,
    targetDElem: null | ArticleTypes.ComponentElem = null,
    parentItemHidden: boolean = false,
    parentDComp: null | ArticleTypes.Component = null,
): boolean {
    if (!Array.isArray(dItems)) return false

    // Перебор массива компонентов
    for (let i = 0; i < dItems.length; i++) {
        // Перебираемый элемент
        const dItem = dItems[i]

        // Если это компонент...
        if ('dCompType' in dItem) {
            if (dItem.dCompType === 'simpleTextComponent') {
                if (dItem.dCompId === targetDComp.dCompId && parentItemHidden) {
                    return true
                }
            }
            else if (dItem.dCompType === 'component') {
                if (dItem.dCompId === targetDComp.dCompId && parentItemHidden) {
                    return true
                }

                const result = this.isParentElemHidden([dItem.dElems], targetDComp, targetDElem, parentItemHidden, dItem)
                if (result) return true
            }
        }

        // Если это элемент...
        else if ('dCompElemId' in dItem) {
            if (parentDComp.dCompId === targetDComp.dCompId && dItem.dCompElemId === targetDElem.dCompElemId && parentItemHidden) {
                return true
            }

            const isCurrentElemHidden = parentItemHidden || this.isItemHidden(parentDComp, dItem)

            if (dItem.dCompElemChildren) {
                const result = this.isParentElemHidden(dItem.dCompElemChildren, targetDComp, targetDElem, isCurrentElemHidden, parentDComp)
                if (result) return true
            }

            if (dItem.dCompElemInnerElems) {
                const result = this.isParentElemHidden(dItem.dCompElemInnerElems, targetDComp, targetDElem, isCurrentElemHidden, parentDComp)
                if (result) return true
            }
        }
    }

    return false
}

/**
 * Имеет ли компонент/элемент внутри другой компонент/элемент.
 * @param {Array} dComps — массив компонентов статьи
 * @param {Number} targetDCompId — id данных целевого компонента, где проверяется наличие дочернего компонента/элемента.
 * @param {Number} targetDElemId — id данных целевого элемента, где проверяется наличие дочернего компонента/элемента.
 * @param {Number} childDCompId — id данных искомого компонента (если передали без childDElemId)
 * @param {Number} childDElemId — id данных искомого элемента
 */
/*export function hasItemAnotherItem(
    this: typeof articleManager,
    dComps: ArticleTypes.Components,
    targetDCompId: ArticleTypes.Id,
    targetDElemId: null | ArticleTypes.Id,
    childDCompId: ArticleTypes.Id,
    childDElemId: null | ArticleTypes.Id,
): boolean {
    // Получение целевого компонента/элемента.
    let targetDItem = targetDElemId
            ? this.getDataElemInDataCompArr(dComps, targetDCompId, targetDElemId)
            : this.getComponent(dComps, targetDCompId)

    // Если в качестве целевого компонента указывается текстовый компонент, то вернуть ложь
    // потому что он не может содержать вложенные компоненты/элементы
    if ('dCompType' in targetDItem && targetDItem.dCompType === 'simpleTextComponent') {
        return false
    }

    // Если в качестве целевого компонента указывается обычный компонент
    if ('dCompType' in targetDItem) {
        if (!targetDItem.dElems?.length) return false

        // Перебрать элементы и искать дочерний элемент там...
        for (let i = 0; i < targetDItem.dElems.length; i++) {
            const currentDElem = targetDItem.dElems[i]

            const foundedChildItem = this.getItemInDElem(currentDElem, childDCompId, childDElemId)
            if (foundedChildItem) return true
        }
    }
    // Если в качестве целевого компонента указывается элемент
    else if (targetDItem.dCompElemId) {
        const foundedChildItem = this.getItemInDElem(targetDItem, childDCompId, childDElemId)
        if (foundedChildItem) return true
    }

    return false
}*/


/**
 * Можно ли один тег ставить в другой
 * @param {String} movedTag — имя вставляемого тега
 * @param {String} targetTag — имя целевого тега
 */
export function canTagInsertInAnotherTag(
    this: typeof articleManager, movedTag: string, targetTag: string,
) {
    const movedTagDisplayType = getTagDisplayType(movedTag)
    const targetTagDisplayType = getTagDisplayType(targetTag)

    if (['inline', 'inline-block'].includes(targetTagDisplayType) && movedTagDisplayType === 'block') {
        return false
    }

    return true
}

/**
 * Функция возвращает булево значение скрыт ли компонент или элемент
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
export function isItemHidden(
    dComp: ArticleTypes.MixComponent,
    dElem?: ArticleTypes.ComponentElem,
): boolean {
    if (dComp.dCompType === 'simpleTextComponent') {
        return !!dComp.dCompLayer?.layerHidden
    }
    else {
        return !!dElem.dCompElemLayer?.layerHidden
    }
}
