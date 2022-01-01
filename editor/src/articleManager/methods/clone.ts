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

    // Если выделили компонент или корневой тег, то клонировать его...
    if (['component', 'rootElement'].includes(tagType)) {
        return cloneComponent(tempCompArr, article, compCoords.dataCompId, deep)
    }
    // Если выделили элемент
    else {
        return cloneElement(tempCompArr, article, compCoords, deep)
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
    const dComp = articleManager.getComponent(dComps, dCompId) as ArticleTypes.Component
    const cloneDComp = createDeepCopy(dComp)

    // Подготовить копию (обновить id компонента и вложенных компонентов, сохранить или убрать атрибуты)
    const newComponentResult = prepareCompClone(dComps, cloneDComp, tempCompArr, deep, article.dMeta.dMaxCompId)

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

    // Компонент, где находится клонируемый элемент, сам элемент и его позиция в массиве
    const dComp = articleManager.getComponent(dComps, compCoords.dataCompId) as ArticleTypes.Component
    const dElem = articleManager.getDataElemInDataComp(dComp, compCoords.dataElemId)
    const idx = dComp.dElems.findIndex(dElem => dElem.dCompElemId === compCoords.dataElemId)

    // Получение копии элемента
    const cloneDElem = createDeepCopy(dElem)

    // Максимальный id данных элемента потому что новому элементу нужно задать отличающийся id данных
    const maxElemId = getMaxElemId(article.dComps, compCoords.dataCompId)

    // Подготовить копию (сохранить или убрать атрибуты, подготовить вложенные компоненты)
    const tComp = articleManager.getTemplate(tempCompArr, dComp.tCompId)
    const tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)
    const newElemResult = prepareElemClone(article.dComps, dComp, cloneDElem, tempCompArr, tElem, deep, article.dMeta.dMaxCompId, maxElemId + 1)

    // Добавить элемент в новый массив элементов компонента
    let updatedDElems = dComp.dElems.slice()
    updatedDElems.splice(idx + 1, 0, newElemResult.newItem)

    // Возвратить данные для вставки нового пункта массива истории
    return {
        maxCompId: newElemResult.maxCompId,
        components: makeImmutableCopy(dComps, dComp.dElems, updatedDElems)
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

    if (dComp.dElems) {
        // Перебор элементов компонента
        dComp.dElems.forEach(dElem => {
            // Получение шаблона элемента
            const tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)

            // Подготовить каждый элемент и вложенные в него компоненты
            const prepareElemCloneResult = prepareElemClone(
                dComps, dComp, dElem, tempCompArr, tElem, deep, newMaxCompId
            )

            newMaxCompId = prepareElemCloneResult.maxCompId
        })
    }

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
 * @param {Object} tElem — шаблон элемента
 * @param {Number} deep — глубина копирования: 1 (голый компонент), 2 (с атрибутами), 3 (с атрибутами и детьми)
 * @param {number} dMaxCompId — максимальный id данных компонента в статье
 * @param {number} elemId — id данных элемента. Если он передан, то его нужно задать.
 */
function prepareElemClone(
    dComps: ArticleTypes.Components,
    dComp: ArticleTypes.Component,
    dElem: ArticleTypes.ComponentElem,
    tempCompArr: TempCompTypes.TempComps,
    tElem: TempCompTypes.Elem,
    deep: 1 | 2 | 3,
    dMaxCompId: number,
    elemId?: number
) {
    // Счётчик максимального значения id данных компонентов в статье
    let newMaxCompId = dMaxCompId

    // Если передали новый id данных элемента, то поставить его
    if (elemId) dElem.dCompElemId = elemId

    // Если первая глубина копирования, то удалить все атрибуты, если нет, то оставить
    if (deep === 1) {
        delete dElem.dCompElemAttrs
    }

    // Для всех остальных групп копирования...
    if ([1, 2, 3].includes(deep)) {
        // Если в элементе должен быть текстовый компонент...
        if (tElem.elemTextInside) {
            if (Array.isArray(dElem.dCompElemChildren)) return

            // Для 1 и 2 настройки копирования весь текст обнуляется
            if ([1, 2].includes(deep)) {
                dElem.dCompElemChildren = articleManager.createSimpleTextComponent(++newMaxCompId)
            }
            // Для третьей текст будет такой же как и в клонируемом элементе
            else if (deep === 3) {
                dElem.dCompElemChildren = articleManager.createSimpleTextComponent(
                    ++newMaxCompId, dElem.dCompElemChildren.text
                )
            }
        }
        // Если в элемент принимает другие компоненты в качестве детей...
        else {
            // Для 1 и 2 настройки копирования все вложенные компоненты удаляются
            if ([1, 2].includes(deep)) {
                dElem.dCompElemChildren = []
            }
            // Для третьей вложенные компоненты остаются
            else if (deep === 3) {
                if (!Array.isArray(dElem.dCompElemChildren)) return

                for (let dComp of dElem.dCompElemChildren) {
                    const prepareCompCloneResult = prepareCompClone(
                        dComps, dComp, tempCompArr, deep, newMaxCompId
                    )

                    newMaxCompId = prepareCompCloneResult.maxCompId
                }
            }
        }
    }

    return {
        maxCompId: newMaxCompId,
        newItem: dElem
    }
}

/**
 * Функция возвращает максимальный id данных элемента.
 * @param {Array} dComps — массив всех компонентов статьи
 * @param {Number} dCompId — id данных клонируемого компонента
 */
function getMaxElemId(
    dComps: ArticleTypes.Components,
    dCompId: ArticleTypes.Id,
) {
    const targetDComp = articleManager.getComponent(dComps, dCompId) as ArticleTypes.Component

    let maxElemId = 1
    if (targetDComp.dElems) {
        targetDComp.dElems.forEach(dElem => {
            if (dElem.dCompElemId > maxElemId) {
                maxElemId = dElem.dCompElemId
            }
        })
    }

    return maxElemId
}
