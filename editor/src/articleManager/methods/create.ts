import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import articleManager from 'articleManager/articleManager'

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

/**
 * The function creates a new component data with passed tempCompId
 * @param {Object} article — объект статьи
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function createComponent(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id
): CreateNewCompResultType {
    const tempComp = this.getTemplate(tempCompArr, tempCompId)
    let maxCompId = article.dMeta.dMaxCompId

    const compData: ArticleTypes.Component = {
        dCompType: 'component',
        dCompId: ++maxCompId,
        tCompId: tempComp.id
    }

    const elementsFnResult = createCompElements(tempComp, maxCompId)
    if (elementsFnResult.compElems) {
        compData.dElems = elementsFnResult.compElems
        maxCompId = elementsFnResult.maxCompId
    }

    return {
        compData,
        maxCompId
    }
}

type CreateCompElementsReturnType = {
    compElems: null | ArticleTypes.ComponentElems,
    maxCompId: number
}

/**
 * The function creates elements in a new component
 * @param {Object} tempComp — a component template
 * @param {Number} maxCompId — a maximum component id in an article
 */
function createCompElements(tempComp: TempCompTypes.TempComp, maxCompId: number): CreateCompElementsReturnType {
    let newMaxCompId = maxCompId

    const $component = articleManager.get$componentByTComp(tempComp)

    // Составлю массив объектов, где будут данные id шаблона элемента и шаблон элемента:
    // [
    //     {elemId: 'general', tElem: tElem},
    //     {elemId: 'cell', tElem: tElem},
    //     {elemId: 'cell', tElem: tElem}
    // ],
    const tElemsMap = getTElemsMap($component, tempComp.content.elems)

    const newElemsArr = tElemsMap.map((tElemMapItem, i) => {
        // Объект с данными перебираемого элемента
        const newElemData: ArticleTypes.ComponentElem = {
            dCompElemId: i + 1,
            tCompElemId: tElemMapItem.elemId,
        }

        // Шаблон перебираемого элемента
        const { tElem } = tElemMapItem

        // html перебираемого элемента
        // Он ищется и в верхнем теге компонента и в его дочерних тегах
        let $elem: HTMLElement = $component.dataset.emId
            ? $component
            : $component.querySelector(`[data-em-id="${tElemMapItem.elemId}"]`)

        const elemAttrs = createElemAttribs(tElem)
        if (elemAttrs) newElemData.dCompElemAttrs = elemAttrs

        newElemData.dCompElemChildren = []

        if (tElem.addTextComponent) {
            const textComponent = createSimpleTextComponent(
                // Предварительно заменить символы напоминающие пробел обычным пробелом
                $elem.innerText.replace( /\s\s+/g, ' ' ),
                ++newMaxCompId,
            )

            newElemData.dCompElemChildren.push(textComponent.compData)
        }

        return newElemData
    })

    return {
        compElems: newElemsArr,
        maxCompId: newMaxCompId
    }
}

type TElemsMapItem = {
    elemId: string,
    tElem: TempCompTypes.Elem
}
type TElemsMap = TElemsMapItem[]

/**
 * Функция составляет массив объектов, где будут данные id шаблона элемента и шаблон элемента. Например:
 * [
 *     { elemId: 'general', tElem: tElem },
 *     { elemId: 'cell', tElem: tElem },
 *     { elemId: 'cell', tElem: tElem }
 * ],
 * @param {HTMLElement} $component
 * @param {TempCompTypes.Elems} tempElems
 * @returns {TElemsMap}
 */
function getTElemsMap($component: HTMLElement, tempElems: TempCompTypes.Elems): TElemsMap {
    const $wrapper = document.createElement('div')
    $wrapper.append($component)
    const $elems = $wrapper.querySelectorAll('[data-em-id]')

    const tElemsMap: TElemsMap = []

    for (let $elem of $elems) {
        if (!($elem instanceof HTMLElement)) continue

        const { emId } = $elem.dataset

        const tElemItem = {
            elemId: emId,
            tElem: tempElems.find(tElem => tElem.elemId === emId)
        }

        tElemsMap.push(tElemItem)
    }

    return tElemsMap
}

/**
 * Функция формирует массив атрибутов элемента с пустыми значениями.
 * Если какие-то значения атрибутов помечены отмеченными по умолчанию, то они ставятся в этот массив
 * чтобы при создании нужные значения уже были проставлены
 * @param {Object} tElem — a template element object
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

