import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager'

/**
 * Функция проходится по всем компонентам в данных статьи и удаляет те компоненты, для которых нет шаблонов
 * @param {Object} article — данные статьи
 * @param {Array} dComps — массив данных компонентов
 * @param {Array} tComps — массив шаблонов компонентов
 */
export default function correctArticle(
    article: ArticleTypes.Article, dComps: ArticleTypes.Components, tComps: TempCompTypes.TempComps
) {
    for (let i = 0; i < dComps.length; i++) {
        const dComp = dComps[i]

        if (dComp.dCompType === 'component') {
            // Шаблон компонента
            const tComp = articleManager.getTemplate(tComps, dComp.tCompId)

            if (!tComp) {
                dComps.splice(i, 1)
                continue
            }

            // Добавление недостающих данных элементов в соответствии с элементами из шаблона
            addMissingDElems(dComp, tComp.content.elems)

            // Сделать чтобы элементы в данных соответствовали элементам в шаблоне компонента
            makeMatchBetweenTCompsAndDComps(article, dComp.dElems, tComp.content.elems)

            // Пройтись по элементам и исправить их дочерние компоненты
            for (let k = 0; k < dComp.dElems.length; k++) {
                const dElem = dComp.dElems[k]

                if (Array.isArray(dElem.dCompElemChildren)) {
                    correctArticle(article, dElem.dCompElemChildren, tComps)
                }
            }
        }
    }
}

/**
 * Функция добавляет недостающие данные элементов в соответствии с элементами из шаблона.
 * @param {Object} dComp — данные компонента
 * @param {Array} tElems — массив элементов шаблона
 */
function addMissingDElems(dComp: ArticleTypes.Component, tElems: TempCompTypes.Elems) {
    // Получение максимального id данных элемента.
    // Он потребуется для задания новых идентификаторов
    let maxDElemId = articleManager.getMaxDElemsId(dComp)

    for (let i = 0; i < tElems.length; i++) {
        const tElem = tElems[i]

        const dElem = articleManager.getDElemByTElem(dComp, tElem.elemId)

        if (!dElem) {
            dComp.dElems.push({
                dCompElemId: ++maxDElemId,
                tCompElemId: tElem.elemId
            })
        }
    }
}

/**
 * Функция настраивает соответствие (убирает противоречия) между шаблоном и данными компонента
 * @param {Object} article — данные статьи
 * @param {Array} dElems — массив данных элементов
 * @param {Array} tElems — массив элементов шаблона
 */
function makeMatchBetweenTCompsAndDComps(
    article: ArticleTypes.Article, dElems: ArticleTypes.ComponentElems, tElems: TempCompTypes.Elems
) {
    // Удалить из данных элементы, для которых нет элементов в шаблоне
    for (let i = 0; i < dElems.length; i++) {
        const dElem = dElems[i]

        const tElem = tElems.find(tElem => {
            return dElem.tCompElemId === tElem.elemId
        })

        if (!tElem) {
            dElems.splice(i, 1)
            --i
            continue
        }

        // Настроить соответствие между тегами в шаблоне и данными элемента
        makeMatchInTags(dElem, tElem)
        // Настроить соответствие между атрибутами в шаблоне и данными элемента
        makeMatchInAttrs(dElem, tElem)

        // Поправить отсутствие/наличие текстового компонента в зависимости от того требуется ли он
        setEmptyTextComponent(article, dElem, tElem)
    }
}

/**
 * Функция настраивает соответствие между тегами в шаблоне и данными элемента
 * @param {Object} dElem — данные элемента
 * @param {Object} tElem — шаблон элемента
 */
function makeMatchInTags(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem) {
    const dTag = dElem.dCompElemTag

    // Ничего не делать если про тег не сказано в данных
    if (!dTag) return

    // Если в шаблоне ничего не сказано про тег, то удалить данные про тег
    else if (!tElem.elemTags || !tElem.elemTags.elemTagsValues.length) {
        delete dElem.dCompElemTag
        return
    }

    // Если в шаблоне элемента находится массив значений, то значит в данных должен быть id.
    // Найти этот id в tElem.elemTags.elemTagsValues.
    // Если такого нет, то удалить.
    if (Array.isArray(tElem.elemTags.elemTagsValues)) {
        const tTag = tElem.elemTags.elemTagsValues.find(tTag => {
            return tTag.elemTagValueId === dTag
        })

        if (!tTag) delete dElem.dCompElemTag
    }
}

/**
 * Функция настраивает соответствие между атрибутами в шаблоне и в данных
 * @param {Object} dElem — данные элемента
 * @param {Object} tElem — шаблон элемента
 */
function makeMatchInAttrs(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem) {
    // Ничего не делать если в данных нет информации об атрибутах
    if (!dElem.dCompElemAttrs) return

    // Если в данных сказано про атрибуты, но в шаблоне про это нет, то удалить данные атрибутов
    if (!tElem.elemAttrs || !tElem.elemAttrs.length) {
        delete dElem.dCompElemAttrs
        return
    }

    const tAttrs = tElem.elemAttrs

    for (let i = 0; i < dElem.dCompElemAttrs.length; i++) {
        const dAttr = dElem.dCompElemAttrs[i]
        const dAttrId = dAttr.tCompElemAttrId
        const dAttrValues = dAttr.dCompElemAttrValue

        // Найти шаблон этого атрибута
        const tAttr = tAttrs.find(tAttr => {
            return tAttr.elemAttrId === dAttrId
        })

        // Если такого шаблона нет, то удалить данные об атрибуте
        if (!tAttr) {
            dElem.dCompElemAttrs.splice(i, 1)
            continue
        }

        // Если в tAttr в качестве значений указан массив, то и в значении dAttr тоже должен быть массив
        if (Array.isArray(tAttr.elemAttrValues) && !Array.isArray(dAttrValues)) {
            dElem.dCompElemAttrs.splice(i, 1)
            continue
        }

        // Так как и в tAttr и в dAttr в качестве значений указан массив, то проверить,
        // что значения в массиве в dAttr имеются в массиве значений tAttr
        for (let k = 0; k < dAttrValues.length; k++) {
            const tAttrValue = tAttr.elemAttrValues.find(tAttrValue => {
                return tAttrValue.elemAttrValueId === dAttrValues[k]
            })

            if (!tAttrValue) {
                dElem.dCompElemAttrs.splice(i, 1)
            }
        }
    }
}

/**
 * Функция регулирует текстовые компоненты в массиве дочерних компонентов элемента данных
 * @param {Object} article — данные статьи
 * @param {Object} dElem — данные элемента
 * @param {Object} tElem — шаблон элемента
 */
function setEmptyTextComponent(article: ArticleTypes.Article, dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem) {
    // Поставить пустой текстовый компонент в массив детей если в шаблоне указано свойство elemTextInside, а текстового компонента нет
    if (tElem.elemTextInside) {
        if ([undefined, null].includes(dElem.dCompElemChildren) || Array.isArray(dElem.dCompElemChildren)) {
            const newEmptyTextComp = articleManager.createSimpleTextComponent(article.dMeta.dMaxCompId + 1)

            dElem.dCompElemChildren = newEmptyTextComp
            // Поставить значение максимального id компонента
            article.dMeta.dMaxCompId = newEmptyTextComp.dCompId
        }
    }
    // Если текст не предусмотрен...
    else {
        // Если у dCompElemChildren нет значения или это не массив (тогда там находится текстовый компонент),
        // то поставить пустой массив
        if (!dElem.dCompElemChildren || !Array.isArray(dElem.dCompElemChildren)) {
            dElem.dCompElemChildren = []
        }
    }
}
