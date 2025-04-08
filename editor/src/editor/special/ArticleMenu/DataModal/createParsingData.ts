import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from 'articleManager/articleManager'
import ParsingData, { ParsingDataComponents, ParsingDataMeta } from '../MarkupModal/ParsingDataType'
import MetaType from 'editor/RightPart-1/ArticleSection/ArtForm/Meta/MetaType'

/**
 * Функция формирует JSON с данными статьи.
 * Он будет использоваться пользователем для формирования разметки на своём сайте.
 * @param {Number} articleId — id статьи
 * @param {Array} dComps — массив компонентов статьи
 * @param {string} articleName — название статьи.
 * @param {Array} tComps — массив шаблонов компонентов
 * @param meta
 */
export function createParsingData(
    articleId: number,
    dComps: ArticleTypes.Components,
    articleName: string,
    tComps: TempCompTypes.TempComp[],
    meta: MetaType.Items
): string {
    const obj: ParsingData.Article = {
        general: {
            articleId,
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
    const parsedMetaItems: ParsingDataMeta.Inputs = {}

    if (!meta) return null

    meta.forEach(metaObj => {
        if (metaObj.type === 'header') return

        parsedMetaItems[metaObj.name] = {
            label: metaObj.label,
            value: getMetaInputValue(metaObj)
        }
    })

    return parsedMetaItems
}

/**
 * Функция возвращает выбранное значение поля ввода
 * @param {Object} metaInput — данные поля ввода
 */
function getMetaInputValue(metaInput: MetaType.Input): string {
    if (!metaInput.value) return null

    if (metaInput.values) {
        if (metaInput.value) {
            const readyValues: string[] = []
            metaInput.value.forEach(valueId => {
                const valueObj = metaInput.values.find(valObj => valObj.id === valueId)
                readyValues.push(valueObj.value)
            })

            return readyValues.join(' ')
        }
        else {
            return ''
        }
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
    const components: ParsingDataComponents.MixComponents = []

    dComps.forEach(dComp => {
        if (dComp.dCompType === 'component') {
            // Пропустить если главный элемент скрыт
            if (dComp.dElems.dCompElemLayer?.layerHidden) return

            const tComp = articleManager.getTemplate(tComps, dComp.tCompId)

            components.push({
                compId: dComp.dCompId,
                compType: 'component',
                compTemplateId: tComp.content.templateId,
                compElems: getCompElementsData(tComps, tComp, [dComp.dElems])[0]
            })
        }
        else if (dComp.dCompType === 'simpleTextComponent') {
            // Пропустить если текстовый компонент скрыт
            if (dComp.dCompLayer?.layerHidden) return

            components.push({
                compType: 'text',
                text: dComp.text,
            })
        }
    })

    return components
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
    const elements: ParsingDataComponents.ComponentElems = []

    dElems.forEach(dElem => {
        if (dElem.dCompElemLayer?.layerHidden) return

        const tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)

        // Объект с данными перебираемого элемента
        const elemParsedData: ParsingDataComponents.ComponentElem = {
            elemTemplateId: dElem.tCompElemId, // 'banner'
            elemAttrs: [],
            elemChildren: []
        }

        // Информация о теге
        const tagParsedData = getElemTag(dElem, tElem)
        if (tagParsedData) {
            elemParsedData.elemTag = tagParsedData
        }

        // Информация об атрибутах
        const attrsParsedData = getElemAttrs(dElem, tElem)
        if (attrsParsedData) {
            elemParsedData.elemAttrs = attrsParsedData
        }

        // Информация о вложенных тегах
        const innerElemsParsedData = getInnerElems(dElem, tComp, tComps)
        if (innerElemsParsedData) {
            elemParsedData.elemInnerElems = innerElemsParsedData
        }
        else {
            elemParsedData.elemInnerElems = []
        }

        // Информация о дочерних компонентах
        const childrenParsedData = getChildren(tComps, dElem.dCompElemChildren)
        if (childrenParsedData) {
            elemParsedData.elemChildren = childrenParsedData
        }

        elements.push(elemParsedData)
    })

    return elements
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
    if (!dElem.dCompElemInnerElems?.length) return null

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

