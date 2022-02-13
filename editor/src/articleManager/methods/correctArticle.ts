import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { wrap$elemWithDiv } from 'utils/domUtils'
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
            // Получение html-компонента из шаблона.
            const $component = articleManager.get$componentByTComp(tComp)

            if (!tComp) {
                dComps.splice(i, 1)
                continue
            }

            // Создание эталонной структуры данных, которая должна быть у текущего компонента
            const referenceDElems = getReferenceDElemsStructure(
                [], wrap$elemWithDiv($component).children, tComp
            )

            // Добавление в данные элементы, которые должны присутствовать исходя из эталонного массива данных
            addRequiredDElems(dComp, [dComp.dElems], referenceDElems)

            // Удаление из данных лишних элементов (не присутствующих в эталонном массиве данных)
            removeUnnecessaryDElems([dComp.dElems], referenceDElems)

            // Сделать соответствие в тегах, атрибутах и детях элементов между данными и шаблонами элементов
            makeMatchBetweenElemTagAttrsAndText(article, [dComp.dElems], tComp.content.elems, tComps)
        }
    }
}

type ReferenceDElemStructureType = {
    tCompElemId: string,
    dCompElemInnerElems?: ReferenceDElemStructureType[]
}

/**
 * Функция рекурсивно формирует массив с данными элементов.
 * @param {Array} resultArr — массив с данными элементов
 * @param {HTMLCollection} $children — html-коллекция с перебираемыми детьми
 * @param {Object} tempComp — шаблон компонента
 */
function getReferenceDElemsStructure(
    resultArr: ReferenceDElemStructureType[], $children: HTMLCollection, tempComp: TempCompTypes.TempComp
): null | ReferenceDElemStructureType[] {
    if (!$children) return null

    // Перебор html-коллекции
    for(let i = 0; i < $children.length; i++) {
        const $child = $children[i] as HTMLElement

        // Найти элемент с data-em-id
        const $elemWithDataEmId: HTMLElement = $child.matches(`[data-em-id]`)
            ? $child
            : $child.querySelector(`[data-em-id]`) as HTMLElement

        if (!$elemWithDataEmId) continue

        // Данные элемента
        const elemData: ReferenceDElemStructureType = {
            tCompElemId: $elemWithDataEmId.dataset.emId
        }

        // Формирование массива вложенных элементов
        const dInnerElems = getReferenceDElemsStructure([], $elemWithDataEmId.children, tempComp)
        if (dInnerElems) {
            elemData.dCompElemInnerElems = dInnerElems
        }

        resultArr.push(elemData)
    }

    return resultArr.length ? resultArr : null
}


/**
 * Функция добавляет в данные элементы, которые должны присутствовать исходя из эталонного массива данных
 * @param {Object} dComp — данные компонента
 * @param {Array} dElems — массив данных элементов
 * @param {Array} referenceDElems — массив эталонных данных элементов для понимания какие элементы должны присутствовать в данных
 */
function addRequiredDElems(
    dComp: ArticleTypes.Component,
    dElems: ArticleTypes.ComponentElems,
    referenceDElems: ReferenceDElemStructureType[]
) {
    // Перебор эталонного массива элементов
    for (let i = 0; i < referenceDElems.length; i++) {
        const refElem = referenceDElems[i]

        // Найти в данных элемент с таким же id шаблона элемента как в эталонном элементе
        const foundedDElem = dElems.find(dElem => dElem.tCompElemId === refElem.tCompElemId)

        // Если в данных нет такого элемента...
        if (!foundedDElem) {
            // Найти элементы с требуемым id шаблона в других местах
            let necessaryDElems: ArticleTypes.ComponentElems = []

            articleManager.dElemsEnumeration(dElems, (dElem) => {
                if (dElem.tCompElemId === refElem.tCompElemId) {
                    necessaryDElems.push(dElem)
                }
            })

            // Если элементы найдены, то добавить в dElems
            if (necessaryDElems.length) {
                dElems.push(...necessaryDElems)
            }
            // Если не найдены, то создать новый пустой элемент и добавить в dElems
            else {
                const newDElem: ArticleTypes.ComponentElem = {
                    dCompElemId: articleManager.getMaxElemId([dComp.dElems]) + 1,
                    tCompElemId: refElem.tCompElemId,
                    dCompElemChildren: []
                }

                dElems.push(newDElem)
            }
        }

        // Найти все элементы в данных с шаблоном как у эталонного элемента
        const foundedDElems = dElems.filter(dElem => dElem.tCompElemId === refElem.tCompElemId)

        // Если у эталонного элемента есть массив вложенных элементов...
        if (refElem.dCompElemInnerElems) {
            // Рекурсивно запустить функцию addRequiredDElems для всех текущих элементов
            for (let j = 0; j < foundedDElems.length; j++) {
                if (!foundedDElems[j].dCompElemInnerElems) {
                    foundedDElems[j].dCompElemInnerElems = []
                }

                addRequiredDElems(dComp, foundedDElems[j].dCompElemInnerElems, refElem.dCompElemInnerElems)
            }
        }
    }
}


/**
 * Функция удаляет из данных элементы не предусмотренные в шаблоне
 * @param {Array} dElems — массив данных элементов
 * @param {Array} referenceDElems — массив эталонных данных элементов для понимания какие элементы должны присутствовать в данных
 */
function removeUnnecessaryDElems(
    dElems: ArticleTypes.ComponentElems,
    referenceDElems: ReferenceDElemStructureType[]
) {
    // Перебор массива данных элементов
    for (let i = 0; i < dElems.length; i++) {
        const dElem = dElems[i]

        // Найти в эталонных данных элемент с таким же шаблоном
        const foundedRefElem = referenceDElems.find(refElem => refElem.tCompElemId === dElem.tCompElemId)

        if (!foundedRefElem) {
            dElems.splice(i, 1)
            --i
            continue
        }

        // Если есть массив вложенных элементов...
        if (foundedRefElem.dCompElemInnerElems) {
            removeUnnecessaryDElems(dElem.dCompElemInnerElems, foundedRefElem.dCompElemInnerElems)
        }
        else {
            delete dElem.dCompElemInnerElems
        }
    }
}


/**
 * Функция настраивает соответствие в тегах, атрибутах и детях элементов между данными и шаблонами элементов
 * @param {Object} article — данные статьи
 * @param {Array} dElems — массив данных элементов
 * @param {Array} tElems — массив элементов шаблона
 * @param {Array} tComps — массив шаблонов компонентов
 */
function makeMatchBetweenElemTagAttrsAndText(
    article: ArticleTypes.Article,
    dElems: ArticleTypes.ComponentElems,
    tElems: TempCompTypes.Elems,
    tComps: TempCompTypes.TempComps
) {
    // Перебрать все элементы
    articleManager.dElemsEnumeration(dElems, (dElem) => {
        const tElem = articleManager.getTElemInTElems(dElem.tCompElemId, tElems)

        // Настроить соответствие между тегами в шаблоне и данными элемента
        makeMatchInTags(dElem, tElem)

        // Настроить соответствие между атрибутами в шаблоне и данными элемента
        makeMatchInAttrs(dElem, tElem)

        // Поправить отсутствие/наличие текстового компонента в зависимости от того требуется ли он
        setEmptyTextComponent(article, dElem, tElem)

        // Исправить дочерние компоненты элемента
        if (dElem.dCompElemChildren) {
            correctArticle(article, dElem.dCompElemChildren, tComps)
        }
    })
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
