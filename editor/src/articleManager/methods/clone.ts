import makeImmutableCopy from 'libs/makeImmutableCopy/makeImmutableCopy'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import StoreArticleTypes from 'store/article/articleTypes'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { createDeepCopy } from 'utils/miscUtils'
import articleManager from '../articleManager'

/**
 * Клонирование определённого компонента/элемента и вставка следом.
 * Функцию можно запускать если известно, что эта операция возможна.
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Object} article — данные статьи
 * @param {Object} compCoords — координаты копируемого компонента/элемента
 * @param {Number} deep — глубина копирования: 1 (компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function cloneItem(
    this: typeof articleManager,
    tempCompArr: TempCompTypes.TempComps,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
    deep: 1 | 2 | 3,
): StoreArticleTypes.CreateNewHistoryItem {
    const { tagType } = compCoords

    // Если клонируют корневой тег, то клонировать его...
    if (tagType === 'rootElement') {
        return cloneComponent(tempCompArr, article, compCoords.dataCompId, deep)
    }
    // Если клонируют элемент
    else if (tagType === 'element') {
        return cloneElement(tempCompArr, article, compCoords, deep)
    }
    // Если клонируют текстовый компонент
    else if (tagType === 'textComponent') {
        return cloneTextComponent(article, compCoords.dataCompId, deep)
    }
}

/**
 * Функция подготавливает данные и запускает клонирование компонента
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Object} article — статья
 * @param {Number} dCompId — id данных клонируемого компонента
 * @param {Number} deep — глубина копирования: 1 (голый компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function cloneComponent(
    tempCompArr: TempCompTypes.TempComps,
    article: ArticleTypes.Article,
    dCompId: ArticleTypes.Id,
    deep: 1 | 2 | 3
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Клонируемый компонент и его копия
    const dComp = articleManager.getComponent(dComps, dCompId)
    const cloneDComp = createDeepCopy(dComp) as ArticleTypes.Component

    // Подготовить копию (обновить id компонента и вложенных компонентов, сохранить или убрать атрибуты)
    let newComponentResult = prepareCompClone(dComps, cloneDComp, tempCompArr, deep, article.dMeta.dMaxCompId)

    // Массив, где находится клонируемый компонент и его позиция
    const parentArr = articleManager.getCompParentArray(dComps, dCompId)
    const idx = parentArr.findIndex(dComp => dComp.dCompId === dCompId)

    // Поставить скопированный компонент в копию массива
    let updatedParentArr = parentArr.slice()
    updatedParentArr.splice(idx + 1, 0, newComponentResult.newItem)

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newComponentResult.maxCompId,
        components: makeImmutableCopy(dComps, parentArr, updatedParentArr)
    }
}

type NewCompResultType = { maxCompId: number, newItem: ArticleTypes.MixComponent }

/**
 * Функция подготавливает данные и запускает клонирование элемента
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Object} article — статья
 * @param {Object} compCoords — объект с координатами клонируемого элемента
 * @param {Number} deep — глубина копирования: 1 (голый компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 */
export function cloneElement(
    tempCompArr: TempCompTypes.TempComps,
    article: ArticleTypes.Article,
    compCoords: StoreArticleTypes.FlashedElem,
    deep: 1 | 2 | 3,
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Компонент, где находится клонируемый элемент, и он сам
    const dComp = articleManager.getComponent(dComps, compCoords.dataCompId) as ArticleTypes.Component
    const dElem = articleManager.getDElemInDComp(dComp, compCoords.dataElemId)

    // Позиция клонируемого элемента в его массиве
    const dElemInnerElemsArr = articleManager.getDElemInnerElemsArrByElemId(dComp.dElems.dCompElemInnerElems, dElem.dCompElemId)
    // Получить idx позиции копируемого элемента
    const idx = dElemInnerElemsArr.findIndex(dElem => dElem.dCompElemId === compCoords.dataElemId)

    // Получение глубокой копии элемента
    const cloneDElem = createDeepCopy(dElem)

    // Максимальный id данных элемента
    const maxElemId = articleManager.getMaxElemId([dComp.dElems])

    // Подготовить копию (сохранить или убрать атрибуты, подготовить вложенные компоненты)
    const tComp = articleManager.getTemplate(tempCompArr, dComp.tCompId)
    const newElemResult = prepareElemClone(
        article.dComps, dComp, cloneDElem, tempCompArr, tComp, deep, article.dMeta.dMaxCompId, maxElemId + 1
    )

    // Добавить элемент в новый массив элементов компонента
    let updatedDElems = dElemInnerElemsArr.slice()
    updatedDElems.splice(idx + 1, 0, newElemResult.newItem)

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newElemResult.maxCompId,
        components: makeImmutableCopy(dComps, dElemInnerElemsArr, updatedDElems)
    }
}

/**
 * Функция подготавливает скопированный компонент в зависимости от глубины копирования.
 * @param {Object} dComp — данные компонента
 * @param {Number} dMaxCompId — максимальный id компонента в статье
 * @param {Number} deep — глубина копирования: 1 и 2 (компонент без текста), 3 (с текстом)
 */
function prepareTextCompClone(
    dComp: ArticleTypes.SimpleTextComponent,
    dMaxCompId: number,
    deep: 1 | 2 | 3,
) {
    // Максимальный id компонента
    let newMaxCompId = dMaxCompId + 1
    dComp.dCompId = newMaxCompId

    // Если делают не глубокую копию, то стереть текст
    if ([1, 2].includes(deep)) {
        dComp.text = ''
    }

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newMaxCompId,
        newItem: dComp
    }
}

/**
 * Функция подготавливает скопированный компонент в зависимости от глубины копирования.
 * @param {Array} dComps — массив всех компонентов статьи
 * @param {Object} dComp — данные компонента
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Number} deep — глубина копирования: 1 (голый компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 * @param {Number} dMaxCompId — максимальный id компонента в статье
 */
function prepareCompClone(
    dComps: ArticleTypes.Components,
    dComp: ArticleTypes.Component,
    tempCompArr: TempCompTypes.TempComps,
    deep: 1 | 2 | 3,
    dMaxCompId: number,
) {
    // Максимальный id компонента, который будет увеличиваться после прохода всех вложенных компонентов
    let newMaxCompId = dMaxCompId

    // Задать новый id данных клонированному компоненту
    dComp.dCompId = ++newMaxCompId

    // Шаблон компонента
    const tComp = articleManager.getTemplate(tempCompArr, dComp.tCompId)

    // Перебор элементов компонента
    articleManager.dElemsEnumeration([dComp.dElems], (dElem: ArticleTypes.ComponentElem) => {
        // Подготовить каждый элемент и вложенные в него компоненты
        const prepareElemCloneResult = prepareElemClone(
            dComps, dComp, dElem, tempCompArr, tComp, deep, newMaxCompId
        )

        newMaxCompId = prepareElemCloneResult.maxCompId
    })

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newMaxCompId,
        newItem: dComp
    }
}

/**
 * Функция подготавливает скопированный элемент в зависимости от глубины копирования.
 * @param {Array} dComps — массив всех компонентов статьи
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 * @param {Array} tempCompArr — массив шаблонов компонентов
 * @param {Object} tComp — шаблон компонента
 * @param {Number} deep — глубина копирования: 1 (голый компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 * @param {Number} dMaxCompId — максимальный id данных компонента в статье
 * @param {Number} elemId — id данных элемента. Если он передан, то его нужно задать. Он задаётся только если нужно изменить существующий id элемента (при клонировании элемента)
 */
function prepareElemClone(
    dComps: ArticleTypes.Components,
    dComp: ArticleTypes.Component,
    dElem: ArticleTypes.ComponentElem,
    tempCompArr: TempCompTypes.TempComps,
    tComp: TempCompTypes.TempComp,
    deep: 1 | 2 | 3,
    dMaxCompId: number,
    elemId?: number
) {
    // Счётчик максимального значения id данных компонентов в статье
    let newMaxCompId = dMaxCompId
    // Счётчик максимального id данных элементов
    let newMaxElemId = elemId || dElem.dCompElemId

    // Поставить или переданный id данных элемента или новый
    dElem.dCompElemId = newMaxElemId

    // Пройтись по всем вложенным элементам
    articleManager.dElemsEnumeration([dElem], (dElem) => {
        dElem.dCompElemId = newMaxElemId++

        // Получение шаблона элемента
        const tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)

        // Если первая глубина копирования, то очистить все атрибуты, если нет, то оставить
        if (deep === 1 && dElem.dCompElemAttrs) {
            // Перебрать все данные атрибутов
            for (let i = 0; i < dElem.dCompElemAttrs.length; i++) {
                // Данные перебираемого атрибута
                const dElemAttr = dElem.dCompElemAttrs[i]

                // Получение шаблона перебираемого атрибута
                const tElemAttr = tElem.elemAttrs.find(tElemAttr => {
                    return tElemAttr.elemAttrId === dElemAttr.tCompElemAttrId
                })
                // Получение и установка пустого значения данных перебираемого атрибута
                dElem.dCompElemAttrs[i].dCompElemAttrValue = articleManager.getDElemAttrEmptyValue(tElemAttr)
            }
        }
        if ([1, 2].includes(deep)) {
            dElem.dCompElemChildren = []
        }
        // Для третьей вложенные компоненты остаются
        else if (deep === 3 && dElem.dCompElemChildren) {
            for (let dComp of dElem.dCompElemChildren) {
                let prepareCompCloneResult: NewCompResultType

                if (dComp.dCompType === 'component') {
                    prepareCompCloneResult = prepareCompClone(
                        dComps, dComp, tempCompArr, deep, newMaxCompId
                    )
                }
                else if (dComp.dCompType === 'simpleTextComponent') {
                    prepareCompCloneResult = prepareTextCompClone(
                        dComp, newMaxCompId, deep
                    )
                }

                newMaxCompId = prepareCompCloneResult.maxCompId
            }
        }
    })

    return {
        maxCompId: newMaxCompId,
        newItem: dElem
    }
}


/**
 * Функция подготавливает данные и запускает клонирование компонента
 * @param {Object} article — статья
 * @param {Number} dCompId — id данных клонируемого компонента
 * @param {Number} deep — глубина копирования: 1 и 2 (компонент без текста), 3 (с текстом)
 */
export function cloneTextComponent(
    article: ArticleTypes.Article,
    dCompId: ArticleTypes.Id,
    deep: 1 | 2 | 3,
): StoreArticleTypes.CreateNewHistoryItem {
    const { dComps } = article

    // Клонируемый текстовый компонент и его копия
    const dComp = articleManager.getComponent(dComps, dCompId)
    const cloneDComp = createDeepCopy(dComp) as ArticleTypes.SimpleTextComponent

    // Подготовить копию (обновить id компонента, сохранить или убрать атрибуты)
    let newComponentResult: NewCompResultType = prepareTextCompClone(cloneDComp, article.dMeta.dMaxCompId, deep)

    // Массив, где находится клонируемый компонент и его позиция
    const parentArr = articleManager.getCompParentArray(dComps, dCompId)
    const idx = parentArr.findIndex(dComp => dComp.dCompId === dCompId)

    // Поставить скопированный компонент в копию массива
    let updatedParentArr = parentArr.slice()
    updatedParentArr.splice(idx + 1, 0, newComponentResult.newItem)

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newComponentResult.maxCompId,
        components: makeImmutableCopy(dComps, parentArr, updatedParentArr)
    }
}
