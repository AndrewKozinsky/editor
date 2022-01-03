import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { FlashedElemsCoords } from 'articleManager/methods/hooks'
import useGetArticleSelectors from 'store/article/articleSelectors'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { FieldGroupPropType } from '../../../common/formElements/FieldGroup/FieldGroup'
import { SelectPropType } from '../../../common/formElements/Select/Select'
import { TextInputPropType } from '../../../common/formElements/TextInput/TextInput'
import { AdjTextInputsType } from './AdjustInputs'

export default function useGetInputsConfig() {
    const [config, setConfig] = useState<AdjTextInputsType[]>([])

    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        if (!tempComps || !flashedElemCoords || !article) return

        const getDElemAndTElemResult = getDElemAndTElem(article, flashedElemCoords, tempComps)
        if (!getDElemAndTElemResult) return

        const { dElem, tElem } = getDElemAndTElemResult
        if (!dElem || !tElem) return

        const inputsConfig = getInputsConfig(dElem, tElem)

        setConfig(inputsConfig)
    }, [article, flashedElemCoords, tempComps])

    return config
}

function getDElemAndTElem(
    article: ArticleTypes.Article,
    flashedElemCoords: FlashedElemsCoords,
    tempComps: TempCompTypes.TempComps,
) {
    const { dComp, dElem } = getCompAndElemData(article, flashedElemCoords)
    if (!dElem) return

    const tElem = getElemTemplate(tempComps, dComp, dElem)

    return { dElem, tElem }
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

function getElemTemplate(
    tempComps: TempCompTypes.TempComps,
    dComp: null | ArticleTypes.Component,
    dElem: null | ArticleTypes.ComponentElem
): null | TempCompTypes.Elem {

    const tComp = articleManager.getTemplate(tempComps, dComp.tCompId)
    return articleManager.getTElemInTComp(tComp, dElem.tCompElemId)
}

function getInputsConfig(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): AdjTextInputsType[] {
    if (!tElem.elemAttrs) return []

    //@ts-ignore
    return tElem.elemAttrs.map(elemAttr => {
        const inputType = getInputType(elemAttr)
        const dElemAttrObj = dElem.dCompElemAttrs.find(dCompElemAttr => {
            return dCompElemAttr.dCompElemAttrId === elemAttr.elemAttrId
        })

        return {
            type: inputType,
            data: getInputData(elemAttr, inputType, dElemAttrObj)
        }
    })
}

type InputTypes = 'radio' | 'checkbox' | 'select' | 'text'

function getInputType(tElemAttr: TempCompTypes.ElemAttr): InputTypes {
    if (tElemAttr.elemAttrView === 'radio') {
        return 'radio'
    }
    else if (tElemAttr.elemAttrView === 'checkbox') {
        return 'checkbox'
    }
    else if (tElemAttr.elemAttrView === 'select') {
        return 'select'
    }
    else {
        return 'text'
    }
}

function getInputData(
    tElemAttr: TempCompTypes.ElemAttr,
    inputType: InputTypes,
    dElemAttrObj: ArticleTypes.Attrib
): TextInputPropType | FieldGroupPropType | SelectPropType {
    const { label, grayText } = getLabelAndGrayText(tElemAttr)
    const value = getAttrCurrentValue(dElemAttrObj, inputType)

    if (inputType === 'text') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'checkbox') {
        return {
            label,
            grayText,
            inputType: 'checkbox',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getOptionsArr(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'radio') {
        return {
            label,
            grayText,
            inputType: 'radio',
            groupName: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            inputsArr: getOptionsArr(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
    else if (inputType === 'select') {
        return {
            label,
            grayText,
            name: tElemAttr.elemAttrId, // В качестве имени поля будет выступать id атрибута
            options: getOptionsArr(tElemAttr),
            value,
            onChange: onChangeHandler,
        }
    }
}

function getLabelAndGrayText(tElemAttr: TempCompTypes.ElemAttr) {
    const attrName = tElemAttr.elemAttrName
    const attrAltName = tElemAttr.elemAttrAlt

    if (!attrAltName) {
        return {
            label: attrName,
            grayText: ''
        }
    }
    return {
        label: attrAltName,
        grayText: attrName
    }
}

function getAttrCurrentValue(dElemAttrObj: ArticleTypes.Attrib, inputType: InputTypes) {
    if (inputType === 'text' || inputType === 'select') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : ''
    }
    else if (inputType === 'checkbox' || inputType === 'radio') {
        return dElemAttrObj?.dCompElemAttrValue
            ? dElemAttrObj?.dCompElemAttrValue
            : []
    }
}

function getOptionsArr(tElemAttr: TempCompTypes.ElemAttr,) {
    if (!tElemAttr?.elemAttrValues) return []

    return tElemAttr?.elemAttrValues.map(elemAttrValue => {
        let label = '', grayText = ''

        if (elemAttrValue.elemAttrValueAlt) {
            label = elemAttrValue.elemAttrValueAlt
            grayText = elemAttrValue.elemAttrValueValue
        }
        else {
            label = elemAttrValue.elemAttrValueValue
        }

        return {
            label,
            value: elemAttrValue.elemAttrValueId,
            grayText
        }
    })
}

function onChangeHandler(e: React.BaseSyntheticEvent) {
    const attrId = e.target.name // id изменённого атрибута
    const value = e.target.value //

    console.log(value)

}