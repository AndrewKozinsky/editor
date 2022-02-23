import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ParsingData, { ParsingDataComponents, ParsingDataMeta } from '../MarkupModal/ParsingDataType'
import MetaType from '../../../RightPart-1/ArticleSection/ArtForm/Meta/MetaType'

/**
 * Функция формирует JSON с данными статьи.
 * Он будет использоваться пользователем для формирования разметки на своём сайте.
 * @param {Array} dComps — массив компонентов статьи
 * @param {string} articleName — название статьи.
 * @param {Array} tComps — массив шаблонов компонентов
 * @param meta
 */
export function createParsingData(
    dComps: ArticleTypes.Components,
    articleName: string,
    tComps: TempCompTypes.TempComp[],
    meta: MetaType.Items
) {
    const obj: ParsingData.Article = {
        general: {
            articleName: articleName
        },
        meta: getMetaData(meta),
        components: getComponentsData(dComps, tComps)
    }

    return JSON.stringify(obj)
}


/**
 * Функция формирует массив метаданных
 * @param {Array} meta — массив метаданных
 */
function getMetaData(meta: MetaType.Items): ParsingDataMeta.Inputs {
    const parsedMetaItemsArr: ParsingDataMeta.Inputs = []

    meta.forEach(metaObj => {
        if (metaObj.type === 'header') return

        parsedMetaItemsArr.push({
            label: metaObj.label,
            name: metaObj.name,
            value: getMetaInputValue(metaObj)
        })
    })

    return parsedMetaItemsArr
}

/**
 * Функция возвращает выбранное значение поля ввода
 * @param {Object} metaInput — данные поля ввода
 */
function getMetaInputValue(metaInput: MetaType.Input): string {
    if (metaInput.values) {
        const readyValues: string[] = []

        metaInput.value.forEach(valueId => {
            const valueObj = metaInput.values.find(valObj => valObj.id === valueId)
            readyValues.push(valueObj.value)
        })

        return readyValues.join(' ')
    }

    return metaInput.value[0]
}


/**
 * Функция формирует массив компонентов с данными
 * @param {Array} dComps — массив компонентов статьи
 * @param {Array} tComps — массив шаблонов компонентов
 */
function getComponentsData(
    dComps: ArticleTypes.Components,
    tComps: TempCompTypes.TempComps
): ParsingDataComponents.MixComponents {
    return dComps.map(dComp => {
        if (dComp.dCompType === 'component') {
            const tComp = articleManager.getTemplate(tComps, dComp.tCompId)

            return {
                compType: 'component',
                compTemplateId: tComp.content.templateId,
                compElements: getCompElementsData(tComps, tComp, [dComp.dElems])[0]
            }
        }
        else if (dComp.dCompType === 'simpleTextComponent') {
            return {
                compType: 'text',
                text: dComp.text,
            }
        }
    })
}

/**
 * Функция формирует массив данных элементов
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Object} tComp — шаблон компонента
 * @param {ArticleTypes.ComponentElems} dElems
 */
function getCompElementsData(
    tComps: TempCompTypes.TempComps,
    tComp: TempCompTypes.TempComp,
    dElems: ArticleTypes.ComponentElems
): ParsingDataComponents.ComponentElems {
    return dElems.map(dElem => {
        const tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)

        // Объект с данными перебираемого элемента
        const elemParsedData: ParsingDataComponents.ComponentElem = {
            elemTemplateId: dElem.tCompElemId, // 'banner'
        }

        // Информация о теге
        const tagParsedData = getElemTag(dElem, tElem)
        if (tagParsedData) {
            elemParsedData.elemTag = tagParsedData
        }

        // Информация об атрибутах
        const attrsParsedData = getElemAttrs(dElem, tElem)
        if (attrsParsedData) {
            elemParsedData.elemAttributes = attrsParsedData
        }

        // Информация о вложенных тегах
        const innerElemsParsedData = getInnerElems(dElem, tComp, tComps)
        if (innerElemsParsedData) {
            elemParsedData.elemInnerElems = innerElemsParsedData
        }

        // Информация о дочерних компонентах
        const childrenParsedData = getChildren(tComps, dElem.dCompElemChildren)
        if (childrenParsedData) {
            elemParsedData.elemChildren = childrenParsedData
        }

        return elemParsedData
    })
}

/**
 * Функция возвращает название тега элемента если он задан
 * @param {Object} dElem — данные элемента
 * @param {Object} tElem — шаблон элемента
 */
function getElemTag(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem) {
    if (!dElem.dCompElemTag) return null

    // Если в шаблоне массив в свойстве elemTagsValues,
    // то это массив идентификаторов.
    if (Array.isArray(tElem.elemTags.elemTagsValues)) {
        // Поэтому найти имя тега по идентификатору
        const tagInfo = tElem.elemTags.elemTagsValues.find(elemTagObj => {
            return elemTagObj.elemTagValueId === dElem.dCompElemTag
        })

        // Возвращу имя тега
        return tagInfo.elemTagValueName
    }
    // В противном случае это готовое имя тега и его сразу можно вернуть
    else {
        return dElem.dCompElemTag
    }
}

/**
 * Функция возвращает атрибуты элемента если они заданы
 * @param {Object} dElem — данные элемента
 * @param {Object} tElem — шаблон элемента
 */
function getElemAttrs(
    dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem
): ParsingDataComponents.Attribs {
    // Set attributes
    if (!dElem.dCompElemAttrs?.length) return

    const dElemAttrsValues: ParsingDataComponents.Attribs = []

    // Перебрать массив атрибутов из данных
    for (let dAttr of dElem.dCompElemAttrs) {
        // Получение шаблона атрибута
        const tElemAttr = tElem.elemAttrs.find(tElemAttr => {
            return tElemAttr.elemAttrId === dAttr.tCompElemAttrId
        })

        const attrValue: string[] = []

        // Поставить в массив значений заблокированное значение
        if (tElemAttr.elemAttrLockedValue) {
            attrValue.push(tElemAttr.elemAttrLockedValue)
        }

        if (Array.isArray(dAttr.dCompElemAttrValue)) {
            for (let j = 0; j < dAttr.dCompElemAttrValue.length; j++) {
                const dAttrValue = dAttr.dCompElemAttrValue[j]

                tElemAttr.elemAttrValues.forEach(tAttrValue => {
                    if (tAttrValue.elemAttrValueId === dAttrValue) {
                        attrValue.push(tAttrValue.elemAttrValueValue)
                    }
                })
            }
        }
        else {
            attrValue.push(dAttr.dCompElemAttrValue)
        }

        dElemAttrsValues.push({
            attrName: tElemAttr.elemAttrName,
            attrValue: attrValue.join(' ')
        })
    }

    return dElemAttrsValues
}

/**
 * Функция возвращает массив с данными вложенных элементов если они заданы
 * @param {Object} dElem — данные элемента
 * @param {Object} tComp — шаблон компонента
 * @param {Array} tComps — массив шаблонов компонентов
 */
function getInnerElems(
    dElem: ArticleTypes.ComponentElem,
    tComp: TempCompTypes.TempComp,
    tComps: TempCompTypes.TempComps,
): ParsingDataComponents.ComponentElems {
    if (!dElem.dCompElemInnerElems.length) return null

    return getCompElementsData(tComps, tComp, dElem.dCompElemInnerElems)
}

/**
 * Функция возвращает дочерние компоненты элемента если они существуют
 * @param {Array} tComps — массив шаблонов компонентов
 * @param {Array} dComps — массив компонентов статьи
 */
function getChildren(
    tComps: TempCompTypes.TempComps,
    dComps: ArticleTypes.Components,
) {
    if (!dComps) return null

    return getComponentsData(dComps, tComps)
}