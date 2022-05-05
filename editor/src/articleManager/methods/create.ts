import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import articleManager from 'articleManager/articleManager'
import { wrap$elemWithDiv } from 'utils/domUtils'

/**
 * Функция создаёт данные статьи. Если ничего не передать, то будут данные для новой статьи.
 * @param {Number} dMaxCompId — максимальный id компонента
 * @param {Array} dComps — массив компонентов статьи
 */
export function createArticle(
    dMaxCompId: number = 0, dComps: ArticleTypes.Components = []
): ArticleTypes.Article {
    return {
        dMeta: {
            version: 1,
            dMaxCompId
        },
        dComps
    }
}

export type CreateNewCompResultType = {
    compData: ArticleTypes.MixComponent
    maxCompId: number
}
type MetaObj = { maxCompId: number, maxElemId: number }

/**
 * The function creates a new component data with passed tempCompId
 * @param {Number} dMaxCompId — максимальный id статьи
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function createComponent(
    this: typeof articleManager,
    dMaxCompId: number,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id
): CreateNewCompResultType {
    const tempComp = this.getTemplate(tempCompArr, tempCompId)
    const metaObj: MetaObj = { maxCompId: dMaxCompId, maxElemId: 0 }

    const compData: ArticleTypes.Component = {
        dCompType: 'component',
        dCompId: ++metaObj.maxCompId,
        tCompId: tempComp.id
    }

    // Получение html-компонента из шаблона.
    const $component = articleManager.get$componentByTComp(tempComp)

    // Данные элементов
    compData.dElems = createCompElements(
        [], wrap$elemWithDiv($component).children, metaObj, tempComp
    )[0]

    return {
        compData,
        maxCompId: metaObj.maxCompId
    }
}

/**
 * Функция рекурсивно формирует массив с данными элементов.
 * @param {Array} resultArr — массив с данными элементов
 * @param {HTMLCollection} $children — html-коллекция с перебираемыми детьми
 * @param {Object} metaObj — данные о максимальном id элемент и компонента
 * @param {Object} tempComp — шаблон компонента
 */
function createCompElements(
    resultArr: ArticleTypes.ComponentElems, $children: HTMLCollection, metaObj: MetaObj,
    tempComp: TempCompTypes.TempComp
): null | ArticleTypes.ComponentElems {
    if (!$children) return null

    // Перебор html-коллекции
    for(let i = 0; i < $children.length; i++) {
        const $child = $children[i] as HTMLElement

        // Если это не элемент с data-em-id, то проверить его детей
        if (!$child.matches(`[data-em-id]`)) {
            createCompElements(resultArr, $child.children, metaObj, tempComp)
            continue
        }

        // Шаблон элемента
        const tElem = tempComp.content.elems.find(tElem => {
            return tElem.elemId === $child.dataset.emId
        })

        // Данные элемента
        const elemData: ArticleTypes.ComponentElem = {
            dCompElemId: ++metaObj.maxElemId,
            tCompElemId: $child.dataset.emId
        }

        // Если по умолчанию элемент должен быть скрыт, то скрыть его в слоях
        if (tElem.elemHidden) {
            elemData.dCompElemLayer = {
                layerHidden: true
            }
        }

        const elemAttrs = createElemAttribs(tElem)
        if (elemAttrs) elemData.dCompElemAttrs = elemAttrs

        elemData.dCompElemChildren = []

        addTextComponent($child, tElem, metaObj, elemData)

        // Формирование массива вложенных элементов
        const dInnerElems = createCompElements([], $child.children, metaObj, tempComp)
        if (dInnerElems) {
            elemData.dCompElemInnerElems = dInnerElems
        }

        resultArr.push(elemData)
    }

    return resultArr.length
        ? resultArr
        : null
}

/**
 * Функция добавляет текстовый компонент в данные элемента при необходимости
 * @param {HTMLElement} $child — html-элемент
 * @param {Object} tElem — объект шаблона элемента
 * @param {Object} metaObj — данные о максимальном id элемент и компонента
 * @param {Object} elemData — данные элемента
 */
function addTextComponent($child: HTMLElement, tElem: TempCompTypes.Elem, metaObj: MetaObj, elemData: ArticleTypes.ComponentElem) {
    // Текст элемента
    // Предварительно заменить символы напоминающие пробел обычным пробелом
    const elemInnerText = $child.innerText.replace( /\s\s+/g, ' ' )

    // Если в шаблоне указано поставить текстовый компонент
    // или в элементе из шаблона нет дочерних элементов, но есть текст
    if (tElem.addTextComponent || $child.children.length === 0 && elemInnerText) {
        const textComponent = createSimpleTextComponent(
            elemInnerText,
            ++metaObj.maxCompId,
        )

        elemData.dCompElemChildren.push(textComponent.compData)
    }
}


/**
 * Функция формирует массив атрибутов элемента с пустыми значениями.
 * Если какие-то значения атрибутов помечены отмеченными по умолчанию, то они ставятся в этот массив
 * чтобы при создании нужные значения уже были проставлены
 * @param {Object} tElem — объект шаблона элемента
 */
function createElemAttribs(tElem: TempCompTypes.Elem): null | ArticleTypes.Attribs {
    if (!tElem.elemAttrs) return null

    const dElemAttrs: ArticleTypes.Attribs = []

    // Перебор атрибутов элемента
    for (let attribTemp of tElem.elemAttrs) {
        let dElemAttr: ArticleTypes.Attrib

        // В каком виде будет заноситься значение атрибута?
        // Если предполагается ввод через текстовое поле, то значение атрибута будет текстовым
        // В любых других случаях будет массив с идентификаторами готовых значений атрибута
        let dElemAttrValue: string | ArticleTypes.ComponentElemAttribValue =
            attribTemp.elemAttrView === 'text' || !Array.isArray(attribTemp.elemAttrValues)
                ? '' : []

        // Объект с данными id атрибута и его незаполненного значения.
        // Значения по умолчанию будут записываться ниже.
        dElemAttr = {
            tCompElemAttrId: attribTemp.elemAttrId,
            dCompElemAttrValue: dElemAttrValue
        }

        // Если поле ввода значения атрибута предполагает массив предопределённых значений,
        // то засунуть в массив идентификаторов установленных атрибутов те значения,
        // которые обозначены как значения по умолчанию
        if (Array.isArray(dElemAttr.dCompElemAttrValue)) {
            for (let i = 0; i < attribTemp.elemAttrValues.length; i++) {
                // Ничего не делать если перебираемое значение не отмечено как значение по умолчанию
                const tAttrValue = attribTemp.elemAttrValues[i]
                if (!tAttrValue.elemAttrValueChecked) continue

                // Поставить значение по умолчанию
                dElemAttr.dCompElemAttrValue.push(tAttrValue.elemAttrValueId)
            }
        }

        // Поставить в массив атрибутов элемента сформированный объект атрибута элемента
        dElemAttrs.push(dElemAttr)
    }

    return dElemAttrs
}

/**
 * Функция создаёт объект пустого текстового компонента
 * @param {String} text — текст в создаваемом компоненте
 * @param {Number} dCompId — id нового текстового компонента
 */
export function createSimpleTextComponent(
    text: string = '',
    dCompId?: number,
): CreateNewCompResultType {
    const compData: ArticleTypes.SimpleTextComponent = {
        dCompType: 'simpleTextComponent',
        dCompId,
        text
    }

    return {
        compData,
        maxCompId: dCompId
    }
}
