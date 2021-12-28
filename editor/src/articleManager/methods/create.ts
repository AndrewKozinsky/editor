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

    const newElemsArr = tempComp.content.elems.map((tElem, i) => {

        const newElemData: ArticleTypes.ComponentElem = {
            dCompElemId: i + 1,
            tCompElemId: tElem.elemId,
            dCompElemGroup: getElemGroupNameFromHTML($component, tElem.elemId)
        }

        const elemAttrs = createElemAttribs(tElem)
        if (elemAttrs) newElemData.dCompElemAttrs = elemAttrs

        // Пока не знаю нужно ли это делать
        /*if (tElem.hidden) {
            newElemData.layer = {
                hidden: true
            }
        }*/

        if (tElem.elemTextInside) {
            ++newMaxCompId
            newElemData.dCompElemChildren = createSimpleTextComponent(newMaxCompId)
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

/**
 * Функция получает html-компонент, находит элемент с переданным идентификатором и возвращает имя группы,
 * к которой принадлежит элемент
 * @param {HTMLElement} $component — html-компонент
 * @param {String} tElemId — id шаблона элемента
 */
function getElemGroupNameFromHTML($component: HTMLElement, tElemId: string) {
    const $wrapper = document.createElement('div')
    $wrapper.append($component)

    let $elem: HTMLElement = $wrapper.querySelector(`[data-em-id=${tElemId}]`)

    return $elem
        ? $elem.dataset.emGroup
        : null
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
            dCompElemAttrId: attribTemp.elemAttrId,
            dCompElemAttrValue: dElemAttrValue
        }

        if (attribTemp.elemAttrValues?.length === 0) return

        // Перебор значений в шаблоне элемента
        for (let i = 0; i < attribTemp.elemAttrValues.length; i++) {
            // Ничего не делать если перебираемое значение не отмечено как значение по умолчанию
            const tAttrValue = attribTemp.elemAttrValues[i]
            if (!tAttrValue.elemAttrValueChecked) continue

            // Поставить значение по умолчанию в зависимости от формата хранения значений
            if (attribTemp.elemAttrView === 'text') {
                dElemAttr.dCompElemAttrValue = tAttrValue.elemAttrValueValue
            }
            else if (Array.isArray(dElemAttr.dCompElemAttrValue)) {
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
 * @param {Number} maxCompId — максимальный id компонента существующий в статье
 */
export function createSimpleTextComponent(maxCompId: number): ArticleTypes.SimpleTextComponent {
    return {
        dCompType: 'simpleTextComponent',
        dCompId: maxCompId + 1,
        text: ''
    }
}
