import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleActions from 'store/article/articleActions'
import articleManager from '../../../articleManager/articleManager'

/** Хук правит данные статьи, чтобы убрать возможные ошибки и предотвратить падение функций, которые будут собирать статью. */
export default function useCorrectArticleData() {
    const dispatch = useDispatch()
    const { tempComps, history, historyCurrentIdx } = useGetArticleSelectors()

    const [articleWasCorrected, setArticleWasCorrected] = useState(false)

    useEffect(function () {
        if (!history.length || !tempComps || articleWasCorrected) return

        const article = history[historyCurrentIdx].article

        // Пройти через компоненты в данных и изменить их чтобы они соответствовали шаблонам
        // ВОЗМОЖНО ЭТО СТОИТ ВЫНЕСТИ В articleManager
        goThroughDataComps(article, article.dComps, tempComps)

        // Поставить в Хранилище, что данные подготовлены и можно их соединять с шаблонами для отрисовки статьи
        dispatch( articleActions.setArticleDataPrepared(true) )

        // Пусть исправление данных статьи срабатывает только при отрытии.
        // Позже можно изменить это поведение чтобы исправление срабатывало всякий раз как изменяют
        // шаблоны компонентов открытой статьи
        setArticleWasCorrected(true)
    }, [tempComps, history, historyCurrentIdx])
}

/**
 * Функция проходится по всем компонентам в данных статьи и удаляет те компоненты, для которых нет шаблонов
 * @param {Object} article — данные статьи
 * @param {Array} dComps — массив данных компонентов
 * @param {Array} tComps — массив шаблонов компонентов
 */
function goThroughDataComps(article: ArticleTypes.Article, dComps: ArticleTypes.Components, tComps: TempCompTypes.TempComps) {
    for (let i = 0; i < dComps.length; i++) {
        const dComp = dComps[i]

        if (dComp.dCompType === 'component') {
            const tComp = tComps.find(tComp => {
                if (dComp.tCompId === tComp.id) {
                    return true
                }
            })

            if (!tComp) {
                dComps.splice(i, 1)
                continue
            }

            // Сделать чтобы элементы в данных соответствовали элементам в шаблоне компонента
            makeMatchBetweenTCompsAndDComps(article, dComp.dElems, tComp.content.elems)

            if (dComp.dElems) {
                for (let k = 0; k < dComp.dElems.length; k++) {
                    const dElem = dComp.dElems[k]

                    if (Array.isArray(dElem.dCompElemChildren)) {
                        goThroughDataComps(article, dElem.dCompElemChildren, tComps)
                    }
                }
            }
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
            // НУЖНО ЕЩЁ ОБРАБОТАТЬ СЛУЧАЙ КОГДА ИМЯ ГРУППЫ В ШАБЛОНЕ НЕ СООТВЕТСТВУЕТ ИМЕНИ ГРУППЫ В ДАННЫХ, ХОТЯ ID элемента совпадают
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
    // Ничего не делать если про тег не сказано в данных
    if (!dElem.dCompElemTag) {
        return
    }
    // Если в данных сказано про тег, но в шаблоне про это нет, то удалить данные про тег
    else if (dElem.dCompElemTag && (!tElem.elemTags || !tElem.elemTags.elemTagsValues.length)) {
        delete dElem.dCompElemTag
        return
    }

    const dTag = dElem.dCompElemTag

    // Если название тега написано строкой, то в шаблоне должен стоять вид отображения text
    if (typeof dTag === 'string') {
        if (tElem.elemTags.elemTagsView !== 'text') {
            delete dElem.dCompElemTag
        }
    }
    // Если тег в данных написан числом, то это id, поэтому проверить, что этот id есть в шаблоне
    else {
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
    // Ничего не делать если в данных нет информации о атрибутах
    if (!dElem.dCompElemAttrs) {
        return
    }
    // Если в данных сказано про атрибуты, но в шаблоне про это нет, то удалить данные про атрибуты
    else if (dElem.dCompElemAttrs && (!tElem.elemAttrs || !tElem.elemAttrs.length)) {
        delete dElem.dCompElemAttrs
        return
    }

    const tAttrs = tElem.elemAttrs

    for (let i = 0; i < dElem.dCompElemAttrs.length; i++) {
        const dAttr = dElem.dCompElemAttrs[i]
        const dAttrId = dAttr.dCompElemAttrId
        const dAttrValue = dAttr.dCompElemAttrValue

        const tAttr = tAttrs.find(tAttr => {
            return tAttr.elemAttrId === dAttrId
        })

        if (!tAttr) {
            dElem.dCompElemAttrs.splice(i, 1)
        }

        // Если значение атрибута написано строкой, то в шаблоне должен стоять вид отображения text
        if (typeof dAttrValue === 'string') {
            if (tAttr.elemAttrView !== 'text') {
                dElem.dCompElemAttrs.splice(i, 1)
            }
        }
        // Если значение атрибута написано числом, то это id, поэтому проверить, что этот id есть в шаблоне
        else {
            const tAttrValue = tAttr.elemAttrValues.find(tAttrValue => {
                return tAttrValue.elemAttrValueId === dAttr.dCompElemAttrId
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
        if ([undefined, null].indexOf(dElem.dCompElemChildren) > -1 || Array.isArray(dElem.dCompElemChildren)) {
            const newEmptyTextComp = articleManager.createSimpleTextComponent(article.dMeta.dMaxCompId)

            dElem.dCompElemChildren = newEmptyTextComp
            // Поставить значение максимального id компонента
            article.dMeta.dMaxCompId = newEmptyTextComp.dCompId
        }
    }
    // Если текст не предусмотрен и у dCompElemChildren нет значения, то поставить пустой массив
    else {
        if (!dElem.dCompElemChildren || !Array.isArray(dElem.dCompElemChildren)) {
            dElem.dCompElemChildren = []
        }
    }
}