import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import { createDeepCopy } from 'utils/miscUtils'
import articleManager from '../articleManager'

type maxCompIdType = { id: number }

export default function getCorrectedArticle(
    article: ArticleTypes.Article, tComps: TempCompTypes.TempComps
): StoreArticleTypes.CreateNewHistoryItem {
    const refDComps: ArticleTypes.Components = []

    const maxCompId: maxCompIdType = {id: 1}

    iterateOverComponents(article, article.dComps, refDComps, tComps, maxCompId)

    return {
        components: refDComps,
        maxCompId: maxCompId.id
    }
}

/**
 * Функция проходится по всем компонентам в данных статьи, генерирует данные компонентов, соответствующие текущему шаблону,
 * и изменяет их по оригинальным данным попутно проверяя, что данные соответствуют шаблону.
 * Эта функция запускается при открытии статьи и изменении шаблона компонента. Поэтому данные гарантированно будут соответствовать шаблонам.
 * @param {Object} article — данные статьи
 * @param {Array} originDComps — массив оригинальных компонентов
 * @param {Array} refDComps — массив эталонных компонентов
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} maxCompId — максимальный id данных компонентов в статье
 */
function iterateOverComponents(
    article: ArticleTypes.Article,
    originDComps: ArticleTypes.Components,
    refDComps: ArticleTypes.Components,
    tComps: TempCompTypes.TempComps,
    maxCompId: maxCompIdType
) {
    for (let i = 0; i < originDComps.length; i++) {
        const dCompOrigin = originDComps[i]

        if (dCompOrigin.dCompType === 'component') {
            // Шаблон компонента
            const tComp = articleManager.getTemplate(tComps, dCompOrigin.tCompId)

            if (!tComp) continue

            // Создание эталонной структуры данных, которая должна быть у текущего компонента
            const newCompResult = articleManager.createComponent(maxCompId.id, tComps, tComp.id)
            const refDComp = newCompResult.compData as  ArticleTypes.Component
            maxCompId.id = newCompResult.maxCompId

            // Поставить максимальный dCompId
            maxCompId.id++

            // Объект, где хранится максимальное id элемента данных эталонной структуры
            const maxElemId = {id: 1}

            // Добавление в эталонный компонент повторяющиеся элементы исходя из данных оригинального компонента
            addRepeatedElems([dCompOrigin.dElems], [refDComp.dElems], maxElemId, maxCompId)

            // Создать массив объектов с соответствием оригинального элемента и эталонного
            const matchElemsObj = makeMatchArr([dCompOrigin.dElems], [refDComp.dElems], tComp)

            // Сделать соответствие в тегах, атрибутах и детях элементов между оригинальными элементами и эталонными
            synchronizeElems(matchElemsObj, article, tComps, maxCompId)

            // Поставить новые данные в originDComps
            refDComps.push(refDComp)
        }
        else if (dCompOrigin.dCompType === 'simpleTextComponent') {
            const textCompCopy = {...dCompOrigin}
            textCompCopy.dCompId = maxCompId.id++

            refDComps.push(textCompCopy)
        }
    }
}


/**
 * Функция добавляет дублированные элементы в эталонный компонент
 * @param {Array} originDElems — элементы оригинального компонента
 * @param {Array} refDElems — элементы эталонного компонента (который создался по актуальному шаблону)
 * @param {Number} maxElemId — максимальный id данных элемента
 * @param {Object} maxCompId — максимальный id данных компонентов в статье
 */
function addRepeatedElems(originDElems: ArticleTypes.ComponentElems, refDElems: ArticleTypes.ComponentElems, maxElemId: {id: number}, maxCompId: maxCompIdType) {
    // Перебор эталонного массива элементов
    for (let i = 0; i < refDElems.length; i++) {
        const refDElem = refDElems[i]

        // Поставить максимальный id элемента потому что это рекурсивная функция добавляющая новые элементы.
        // Поэтому id данных элементов нужно обновить
        refDElem.dCompElemId = maxElemId.id++

        // Количество дублей этого элемента в оригинальном компоненте
        const amountOfElems = articleManager.getElemCountInInnerElemsArr(originDElems, refDElem)
        if (amountOfElems <= 1) continue

        // Если более одного элемента с этим шаблоном, то добавить копии.
        for (let j = 0; j < amountOfElems - 1; j++) {
            const refDElemCopy = createDeepCopy(refDElem)
            refDElemCopy.dCompElemId = maxElemId.id++

            // Если скопировали элемент с текстовым компонентом, то в копии элемента будут текстовый компонент с одинаковым id данных.
            // Функция ставит текстовому компоненту новый id данных.
            updateCompIdInCopiedElem(refDElemCopy, maxCompId)

            // Добавить копию после текущего элемента
            refDElems.splice(i + j, 0, refDElemCopy)
        }

        i += amountOfElems - 1
    }

    /*
    * Теперь нужно сделать соответствие между оригинальными и эталонными элементами.
    * Эти данные будут храниться в объекте такого типа:
    * {
    *   tHead: {
    *       origElems: [...],
    *       refElems: [...]
    *   },
    *   tBody: {
    *       origElems: [], // Возможно, что оригинальных элементов не будет под новый шаблон
    *       refElems: [...]
    *   },
    * }
    * */

    type OrigAndRefElemsMatching = {
        [tElemId: string]: {
            origElems: ArticleTypes.ComponentElems,
            refElems: ArticleTypes.ComponentElems,
        }
    }

    // В этот объект будет наполнено соответствие между оригинальными и эталонными элементами.
    const origAndRefElemsMatching: OrigAndRefElemsMatching = {}

    // Перебор эталонных элементов, чтобы наполнить origAndRefElemsMatching
    for (let i = 0; i < refDElems.length; i++) {
        const refDElem = refDElems[i]
        const tCompElemId = refDElem.tCompElemId

        // Поставить пустой объект если свойство с именем шаблона ещё не существует
        // в объекте origAndRefElemsMatching
        if (!origAndRefElemsMatching[tCompElemId]) {
            origAndRefElemsMatching[tCompElemId] = {
                origElems: [],
                refElems: []
            }
        }

        origAndRefElemsMatching[tCompElemId].refElems.push(refDElem)
    }

    // Перебор оригинальных элементов, чтобы наполнить origAndRefElemsMatching
    for (let i = 0; i < originDElems.length; i++) {
        const originDElem = originDElems[i]

        if (!origAndRefElemsMatching[originDElem.tCompElemId]) {
            continue
        }

        origAndRefElemsMatching[originDElem.tCompElemId].origElems.push(originDElem)
    }

    // Перебор всех элементов текущей вложенности и рекурсивный запуск addRepeatedElems() для вложенных элементов
    for (let key in origAndRefElemsMatching) {
        const origAndRefElemMatch = origAndRefElemsMatching[key]

        for (let i = 0; i < origAndRefElemMatch.refElems.length; i++) {
            const originDElem = origAndRefElemMatch.origElems[i]
            const refDElem = origAndRefElemMatch.refElems[i]

            if (!refDElem.dCompElemInnerElems) continue

            const originDElemInnerElems = originDElem?.dCompElemInnerElems || []

            addRepeatedElems(originDElemInnerElems, refDElem.dCompElemInnerElems, maxElemId, maxCompId)
        }
    }
}

/**
 * Функция проходит по всем элементам переданного элемента и ищет текстовый компонент.
 * Если находит, то задаёт ему новый id данных
 * @param {Object} refDElem — данные элемента
 * @param {Object} maxCompId — максимальный id данных компонентов в статье
 */
function updateCompIdInCopiedElem(refDElem: ArticleTypes.ComponentElem, maxCompId: maxCompIdType) {
    articleManager.dElemsEnumeration([refDElem], (dElem) => {
        if (!dElem.dCompElemChildren?.length) return

        for (let i = 0; i < dElem.dCompElemChildren.length; i++) {
            const dComp = dElem.dCompElemChildren[i]
            dComp.dCompId = maxCompId.id++
        }
    })
}


// Тип объекта в который записывается сопоставление оригинальных элементов и эталонных
type MatchElemsObjType = {
    [tElemId: string]: { // id шаблона элемента
        tElem: TempCompTypes.Elem // шаблон элемента
        originDElems: ArticleTypes.ComponentElem[] // Массив оригинальных данных элементов с этим tElemId
        refDElems: ArticleTypes.ComponentElem[] // Массив эталонных данных элементов с этим tElemId
    }
}

/**
 * Функция создаёт объект сопоставления оригинальных элементов и эталонных.
 * После через перебор этого объекта в эталонные элементы будут записываться данные из оригинальных
 * @param {Array} originDElems — элементы оригинального компонента
 * @param {Array} refDElems — элементы эталонного компонента (который создался по актуальному шаблону)
 * @param {Object} tComp — шаблон компонента
 */
function makeMatchArr(originDElems: ArticleTypes.ComponentElems, refDElems: ArticleTypes.ComponentElems, tComp: TempCompTypes.TempComp): MatchElemsObjType {
    // Объект, куда будут складываться соответствия элементов
    const matchElemsObj: MatchElemsObjType = {}

    // Перебор элементов эталонного компонента
    articleManager.dElemsEnumeration(refDElems, function (refDElem) {
        // id шаблона перебираемого элемента
        const refTElemId = refDElem.tCompElemId

        // Если в объекте нет такого свойства, то создать с пустым значением
        if (!matchElemsObj[refTElemId]) {
            matchElemsObj[refTElemId] = {
                tElem: articleManager.getTElemInTComp(tComp, refTElemId),
                originDElems: [], // оригинальные элементы с указанным refTElemId
                refDElems: [], // эталонные элементы с указанным refTElemId
            }
        }

        // Поставить туда эталонные элементы
        matchElemsObj[refTElemId].refDElems.push(refDElem)
    })

    // Перебрать оригинальные элементы и заполнить matchElemsObj
    articleManager.dElemsEnumeration(originDElems, function (originDElem) {
        const originDElemId = originDElem.tCompElemId

        if (!matchElemsObj[originDElemId]) return

        matchElemsObj[originDElemId].originDElems.push(originDElem)
    })

    return matchElemsObj
}


/**
 * Функция настраивает соответствие в тегах, атрибутах и детях элементов между данными и шаблонами элементов
 * @param {MatchElemsObjType} matchElemsObj
 * @param {Object} article — данные статьи
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} maxCompId — максимальный id данных компонентов в статье
 */
function synchronizeElems(
    matchElemsObj: MatchElemsObjType,
    article: ArticleTypes.Article,
    tComps: TempCompTypes.TempComps,
    maxCompId: maxCompIdType
) {
    for (let refTElemId in matchElemsObj) {
        const { originDElems, refDElems, tElem } = matchElemsObj[refTElemId]

        for (let i = 0; i < refDElems.length; i++) {
            const originDElem = originDElems[i]
            const refDElem = refDElems[i]

            if (!originDElem) continue

            // Настроить соответствие между тегами в шаблоне и данными элемента
            makeMatchInTags(refDElem, originDElem, tElem)

            // Настроить соответствие между атрибутами в шаблоне и данными элемента
            makeMatchInAttrs(refDElem, originDElem, tElem)

            // Поставить настройки слоя
            if (originDElem.dCompElemLayer) {
                refDElem.dCompElemLayer = {...originDElem.dCompElemLayer}
            }

            // Стереть все дочерние компоненты у эталонного элемента.
            // Если они есть у оригинального, то будут заполнены ими. Если нет, то пусть остаётся пустым.
            refDElem.dCompElemChildren = []

            // Если в эталонном элементе есть вложенные элементы, то пропустить дальнейшее исполнение кода итерации
            // чтобы не добавлять дочерние компоненты если они там есть.
            if (refDElem.dCompElemInnerElems?.length) continue

            // Исправить дочерние компоненты элемента
            if (originDElem.dCompElemChildren?.length) {
                // Обойти дочерние компоненты элемента
                iterateOverComponents(article, originDElem.dCompElemChildren, refDElem.dCompElemChildren, tComps, maxCompId)
            }
        }
    }
}


/**
 * Функция добавляет id или значение выбранного тега в эталонный тег из оригинального если в шаблоне он предусмотрен.
 * @param {Object} refDElem — данные эталонного элемента
 * @param {Object} originDElem — данные оригинального элемента
 * @param {Object} tElem — шаблон элемента
 */
function makeMatchInTags(
    refDElem: ArticleTypes.ComponentElem, originDElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem
) {
    const originDTag = originDElem.dCompElemTag

    // Ничего не делать если про тег не сказано в оригинальных данных
    if (!originDTag) return

    // Если в шаблоне элемента находится массив значений, то значит в оригинальных данных указан id значения.
    if (Array.isArray(tElem.elemTags.elemTagsValues)) {
        // Проверить, что указанный id есть в шаблоне.
        const foundedTag = tElem.elemTags.elemTagsValues.find(tagValueObj => {
            return tagValueObj.elemTagValueId === originDTag
        })

        // Если есть, то поставить его id в данные эталонного элемента.
        if (foundedTag) {
            refDElem.dCompElemTag = originDElem.dCompElemTag
        }
    }
    // В противном случае это точное значение
    else {
        refDElem.dCompElemTag = originDElem.dCompElemTag
    }
}


/**
 * Функция настраивает соответствие между атрибутами в шаблоне и в данных
 * @param {Object} refDElem — данные эталонного элемента
 * @param {Object} originDElem — данные оригинального элемента
 * @param {Object} tElem — шаблон элемента
 */
function makeMatchInAttrs(
    refDElem: ArticleTypes.ComponentElem, originDElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem
) {
    // Если в шаблоне элемента описаны атрибуты, то поставить в dCompElemAttrs пустой массив
    if (tElem.elemAttrs?.length && !refDElem.dCompElemAttrs) {
        refDElem.dCompElemAttrs = []
    }

    // Ничего не делать если в оригинальных данных ничего не сказано про атрибуты или их нет в шаблоне
    if (!originDElem.dCompElemAttrs?.length || !tElem.elemAttrs?.length) return

    // Перебрать массив атрибутов шаблона элемента
    for (let i = 0; i < tElem.elemAttrs.length; i++) {
        const tElemAttr = tElem.elemAttrs[i]

        // Данные этого атрибута из оригинального элемента
        const origDElemAttr = originDElem.dCompElemAttrs.find(origDElemAttr => {
            return origDElemAttr.tCompElemAttrId === tElemAttr.elemAttrId
        })

        // Пропустить если в данных оригинального элемента нет данных этого атрибута
        if (!origDElemAttr) continue

        makeMatchInAttr(refDElem, origDElemAttr, tElemAttr)
    }
}


/**
 * Функция ставит значения атрибута оригинального элемента эталонному если эти значения предусмотрены в шаблоне атрибута.
 * @param {Object} refDElem — данные эталонного элемента
 * @param {Object} origDElemAttr — объект атрибута оригинального элемента
 * @param {Object} tElemAttr — шаблон атрибута
 */
function makeMatchInAttr(
    refDElem: ArticleTypes.ComponentElem, origDElemAttr: ArticleTypes.Attrib, tElemAttr: TempCompTypes.ElemAttr
) {
    // Если в шаблоне атрибута находится массив значений, то значит в оригинальных данных указан id значения.
    if (Array.isArray(tElemAttr.elemAttrValues) && Array.isArray(origDElemAttr.dCompElemAttrValue)) {
        // Получить массив указанных id значений атрибута оригинального элемента, которые существуют в шаблоне
        const attrValuesIds: string[] = []

        origDElemAttr.dCompElemAttrValue.forEach(origDAttrValId => {
            tElemAttr.elemAttrValues.find(tElemAttrObj => {
                if (tElemAttrObj.elemAttrValueId === origDAttrValId) {
                    attrValuesIds.push(origDAttrValId)
                }
            })
        })

        if (!attrValuesIds.length) return

        // Из эталонного элемента получить объект с данными о текущем атрибуте
        const refDAttrObj = refDElem.dCompElemAttrs.find(refDAttrObj => refDAttrObj.tCompElemAttrId === tElemAttr.elemAttrId)
        // Поставить значение текущего атрибута эталонному элементу
        refDAttrObj.dCompElemAttrValue = attrValuesIds
    }
    // В противном случае это точное значение
    else {
        // Из эталонного элемента получить объект с данными о текущем атрибуте
        const refDAttrObj = refDElem.dCompElemAttrs.find(refDAttrObj => refDAttrObj.tCompElemAttrId === tElemAttr.elemAttrId)
        // Поставить значение текущего атрибута эталонному элементу
        refDAttrObj.dCompElemAttrValue = origDElemAttr.dCompElemAttrValue
    }
}
