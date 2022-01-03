import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { FlashedElemsCoords } from 'articleManager/methods/hooks'
import useGetArticleSelectors from 'store/article/articleSelectors'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'

export function useGetCompAndElemNames() {
    const [compName, setCompName] = useState('')
    const [elemName, setElemName] = useState('')

    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        if (!tempComps || !flashedElemCoords || !article) return

        const { dComp, dElem } = getCompAndElemData(article, flashedElemCoords)
        const { tComp, tElem } = getCompAndElemTemplate(tempComps, dComp, dElem)

        setCompName(tComp?.content?.name || '')
        setElemName(tElem?.elemName || '')
    }, [article, flashedElemCoords, tempComps])

    return {
        compName,
        elemName
    }
}

function getCompAndElemData(article: ArticleTypes.Article, flashedElemCoords: FlashedElemsCoords) {
    let dComp: null | ArticleTypes.Component = null
    let dElem: null | ArticleTypes.ComponentElem = null

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
        dElem = articleManager.getDataElemInDataComp(dComp, dataElemId)
    }

    return { dComp, dElem }
}

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