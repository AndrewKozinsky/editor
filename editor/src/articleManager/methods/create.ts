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

/**
 * The function creates a new component data with passed tempCompId
 * @param {Object} article — article object
 * @param {Array} tempCompArr — components templates array
 * @param {String} tempCompId — component template id
 */
export function createComponent(
    this: typeof articleManager,
    article: ArticleTypes.Article,
    tempCompArr: TempCompTypes.TempComps,
    tempCompId: TempCompTypes.Id
) {
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

    if (!tempComp.content.elems?.length) {
        return {
            compElems: null,
            maxCompId: newMaxCompId
        }
    }

    // Turn html-string to HTMLElement
    const parser = new DOMParser()
    const doc = parser.parseFromString(tempComp.content.html, 'text/html')
    const $component = doc.body.childNodes[0] as HTMLElement

    // Составлю объект, где будут данные id шаблона элемента и шаблон элемента:
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
        const $elem = $component.querySelector(`[data-em-id="${tElemMapItem.elemId}"]`) as HTMLElement

        const elemAttrs = createElemAttribs(tElem)
        if (elemAttrs) newElemData.dCompElemAttrs = elemAttrs

        // Пока не знаю нужно ли это делать
        /*if (tElem.hidden) {
            newElemData.layer = {
                hidden: true
            }
        }*/

        if (tElem.elemTextInside) {
            newElemData.dCompElemChildren = createSimpleTextComponent(
                ++newMaxCompId,
                // Предварительно заменить символы напоминающие пробел обычным пробелом
                $elem.innerText.replace( /\s\s+/g, ' ' )
            )
        }
        else {
            newElemData.dCompElemChildren = []
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
    for (let attribTemp of tElem?.elemAttrs) {

        let dElemAttr: ArticleTypes.Attrib

        // В каком виде будет заноситься значение атрибута?
        // Если предполагается ввод через текстовое поле, то значение атрибута будет текстовым
        // В любых других случаях будет массив с идентификаторами готовых значений атрибута
        let dElemAttrValue: string |  ArticleTypes.ComponentElemAttribValue =
            attribTemp.elemAttrView === 'text' ? '' : []

        // Объект с данными id атрибута и его незаполненного значения.
        // Значения по умолчанию будут записываться ниже.
        dElemAttr = {
            tCompElemAttrId: attribTemp.elemAttrId,
            dCompElemAttrValue: dElemAttrValue
        }

        // Если поле ввода значения атрибута текстовое и есть значение по умолчанию...
        if (attribTemp.elemAttrView === 'text' && attribTemp.elemAttrLockedValue) {
            // ... то поставить значение по умолчанию в качестве значения атрибута
            dElemAttr.dCompElemAttrValue = attribTemp.elemAttrLockedValue
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
 * @param {Number} dCompId — id компонента текстового компонента
 * @param {String} text — текст
 */
export function createSimpleTextComponent(dCompId: number, text: string = ''): ArticleTypes.SimpleTextComponent {
    return {
        dCompType: 'simpleTextComponent',
        dCompId,
        text
    }
}
