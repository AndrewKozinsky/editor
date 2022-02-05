import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager'

/**
 * Функция проходится по всем компонентам в данных статьи и правит данные.
 * Например, удаляет те компоненты, для которых нет шаблонов
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

            // Функция удаляет данные элементов если под них нет шаблонов и добавляет если данных нет, но есть шаблоны
            makeMatchBetweenElems(dComp, tComp.content.elems)

            // Сделать соответствие в тегах, атрибутах и детях элементов между данными и шаблонами элементов
            makeMatchBetweenElemTagAttrsAndText(article, dComp.dElems, tComp.content.elems)

            // Пройтись по элементам и исправить их дочерние компоненты
            /*for (let k = 0; k < dComp.dElems.length; k++) {
                const dElem = dComp.dElems[k]

                if (Array.isArray(dElem.dCompElemChildren)) {
                    correctArticle(article, dElem.dCompElemChildren, tComps)
                }
            }*/
        }
    }
}

/**
 * Функция соотносит данные элементов в соответствии с элементами из шаблона.
 * @param {Object} dComp — данные компонента
 * @param {Array} tElems — массив элементов шаблона
 */
function makeMatchBetweenElems(dComp: ArticleTypes.Component, tElems: TempCompTypes.Elems) {

    // Получение максимального id данных элемента.
    // Он потребуется для задания новых идентификаторов
    let maxDElemId = articleManager.getMaxDElemsId(dComp)

    // Если в шаблоне есть элемент, который нет в данных, то создать данные этого элемента и добавить
    for (let i = 0; i < tElems.length; i++) {
        const tElem = tElems[i]

        const dElem = articleManager.getDElemByTElem(dComp, tElem.elemId)

        if (!dElem) {
            dComp.dElems.push({
                dCompElemId: ++maxDElemId,
                tCompElemId: tElem.elemId,
                dCompElemChildren: []
            })
        }
    }

    // Если в данных есть элемент для которого нет шаблона, то удалить его из данных
    for (let i = 0; i < dComp.dElems.length; i++) {
        const dElem = dComp.dElems[i]

        const tElem = articleManager.getTElemInTElems(dElem.tCompElemId, tElems)

        if (!tElem) {
            dComp.dElems.splice(i, 1)
            --i
        }
    }
}

/**
 * Функция настраивает соответствие в тегах, атрибутах и детях элементов между данными и шаблонами элементов
 * @param {Object} article — данные статьи
 * @param {Array} dElems — массив данных элементов
 * @param {Array} tElems — массив элементов шаблона
 */
function makeMatchBetweenElemTagAttrsAndText(
    article: ArticleTypes.Article, dElems: ArticleTypes.ComponentElems, tElems: TempCompTypes.Elems
) {
    // Перебрать все элементы
    for (let i = 0; i < dElems.length; i++) {
        const dElem = dElems[i]
        const tElem = articleManager.getTElemInTElems(dElem.tCompElemId, tElems)

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

    // Если в шаблоне ничего не сказано про атрибуты, но удалить данные атрибутов
    if (!tElem.elemAttrs || !tElem.elemAttrs.length) {
        delete dElem.dCompElemAttrs
        return
    }

    // Добавить пустой массив данных по атрибутам элемента если его нет
    if (!dElem.dCompElemAttrs) dElem.dCompElemAttrs = []

    // Поставить пустые значения недостающих атрибутов в данных
    for (let i = 0; i < tElem.elemAttrs.length; i++) {
        const tElemAttr = tElem.elemAttrs[i]

        // Найти данные атрибута
        const currentDElemAttr = dElem.dCompElemAttrs.find(dCompElemAttr => {
            return dCompElemAttr.tCompElemAttrId === tElemAttr.elemAttrId
        })

        // Если данные есть, то ничего не делать
        if (currentDElemAttr) continue

        // В противном случае поставить пустое значение...
        // Если значение атрибута будут вводить в текстовом поле, то в значении поставить пустую строку.
        // Все остальные поля ставят идентификаторы в массив, поэтому поставлю пустой массив.
        let dAttrValue = articleManager.getDElemAttrEmptyValue(tElemAttr)

        // Поставить в массив данных атрибутов id атрибута из шаблона и пустое значение
        dElem.dCompElemAttrs.push({
            tCompElemAttrId: tElemAttr.elemAttrId,
            dCompElemAttrValue: dAttrValue
        })
    }

    // Массив атрибутов из шаблона
    const tAttrs = tElem.elemAttrs

    // Перебрать данные атрибутов, чтобы соотнести данные и шаблоны элементов
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

        // Если в шаблоне нет свойства tAttr.elemAttrValues, то значит атрибут принимает точное значение
        // И если в данных в качестве значения находится массив идентификаторов, то его нужно удалить
        if (!tAttr.elemAttrValues && Array.isArray(dAttrValues)) {
            delete dAttr.dCompElemAttrValue
        }

        // Ничего не делать если в шаблоне не указан массив значений
        if (!tAttr.elemAttrValues) continue

        // Если в tAttr в качестве значений указан массив, то и в значении dAttr тоже должен быть массив
        if (Array.isArray(tAttr.elemAttrValues) && !Array.isArray(dAttrValues)) {
            dElem.dCompElemAttrs.splice(i, 1)
            continue
        }

        // Так как и в tAttr и в dAttr в качестве значений указан массив, то проверить,
        // что значения в массиве в dAttr имеются в массиве значений tAttr
        for (let k = 0; k < dAttrValues.length; k++) {
            if (!tAttr.elemAttrValues) debugger
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
    if (tElem.addTextComponent) {
        // Найти текстовый компонент в массиве
        const textCompInChildrenArr = dElem.dCompElemChildren.find(dComp => dComp.dCompType === 'simpleTextComponent')

        if (!textCompInChildrenArr) {
            const newEmptyTextComp = articleManager.createSimpleTextComponent('',article.dMeta.dMaxCompId + 1)
            dElem.dCompElemChildren.unshift(newEmptyTextComp.compData)

            // Поставить значение максимального id компонента
            article.dMeta.dMaxCompId = newEmptyTextComp.maxCompId
        }
    }
}
