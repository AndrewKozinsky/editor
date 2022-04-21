import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import articleManager from '../articleManager'
import { FlashedElemsCoords } from './hooks'

/** Хук возвращает данные по выделенному компоненту, элементу, шаблону компонента или элемента (если доступно) */
export default function useGetFlashedElemDataAndTemplate() {
    const article = articleManager.hooks.getCurrentArticle()
    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const { tempComps } = useGetArticleSelectors()

    const [dComp, setDComp] = useState<null | ArticleTypes.Component>(null)
    const [dElem, setDElem] = useState<null | ArticleTypes.ComponentElem>(null)

    const [tComp, setTComp] = useState<null | TempCompTypes.TempComp>(null)
    const [tElem, setTElem] = useState<null | TempCompTypes.Elem>(null)

    useEffect(function () {
        if (!article) return

        if (!article.dComps.length) {
            setDComp(null)
            setDElem(null)
            setTComp(null)
            setTElem(null)

            return
        }

        const { dComp, dElem } = getCompAndElemData(article, flashedElemCoords)
        const { tComp, tElem } = getCompAndElemTemplate(tempComps, dComp, dElem)

        setDComp(dComp)
        setDElem(dElem)

        setTComp(tComp)
        setTElem(tElem)
    }, [article, flashedElemCoords])

    return { dComp, dElem, tComp, tElem }
}

/**
 * Функция возвращает данные выделенного компонента и элемента
 * @param {Object} article — объект данных статьи
 * @param {Object} flashedElemCoords — координаты выделенного компонента/элемента
 */
function getCompAndElemData(article: ArticleTypes.Article, flashedElemCoords: FlashedElemsCoords) {
    let dComp: null | ArticleTypes.Component = null
    let dElem: null | ArticleTypes.ComponentElem = null

    if (!flashedElemCoords || !flashedElemCoords.selectedElem) {
        return { dComp, dElem }
    }

    const { dataCompId, dataElemId } = flashedElemCoords.selectedElem

    // Данные компонента
    if (dataCompId) {
        const dataComp = articleManager.getComponent(article.dComps, dataCompId)
        if (dataComp.dCompType !== 'simpleTextComponent') {
            dComp = dataComp
        }
    }

    // Данные элемента
    if (dataElemId) {
        dElem = articleManager.getDElemInDComp(dComp, dataElemId)
    }

    return { dComp, dElem }
}

/**
 * Функция возвращает шаблоны выделенного компонента и элемента (если доступно)
 * @param {Array} tempComps — массив шаблонов компонентов
 * @param {Object} dComp — данные компонента
 * @param {Object} dElem — данные элемента
 */
function getCompAndElemTemplate(
    tempComps: TempCompTypes.TempComps,
    dComp: null | ArticleTypes.Component,
    dElem: null | ArticleTypes.ComponentElem
) {
    let tComp: null | TempCompTypes.TempComp = null
    let tElem: null | TempCompTypes.Elem = null

    if (dComp) {
        tComp = articleManager.getTemplate(tempComps, dComp.tCompId)
    }
    if (dElem) {
        tElem = articleManager.getTElemInTComp(tComp, dElem.tCompElemId)
    }

    return { tComp, tElem }
}
