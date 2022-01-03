import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import { FlashedElemsCoords } from '../../../articleManager/methods/hooks'
import useGetArticleSelectors from '../../../store/article/articleSelectors'
import ArticleTypes from '../../../store/article/codeType/articleCodeType'
import TempCompTypes from '../../../store/article/codeType/tempCompCodeType'
import { AdjTextInputsType } from './AdjustInputs'

export function useIsVisible() {
    const [isVisible, setIsVisible] = useState(false)

    const flashedElemCoords = articleManager.hooks.getFlashedElemCoords()
    const article = articleManager.hooks.getCurrentArticle()
    const { tempComps } = useGetArticleSelectors()

    useEffect(function () {
        if (!flashedElemCoords) return

        const tElem = getTElem(article, flashedElemCoords, tempComps)

        setIsVisible(
            !!tElem?.elemAttrs?.length
        )

    }, [article, flashedElemCoords, tempComps])

    return isVisible
}

function getTElem(
    article: ArticleTypes.Article,
    flashedElemCoords: FlashedElemsCoords,
    tempComps: TempCompTypes.TempComps
) {
    const { dataCompId, dataElemId } = flashedElemCoords.selectedElem
    if (!dataCompId || !dataElemId) return null

    // Данные компонента и элемента
    const dComp = articleManager.getComponent(article.dComps, dataCompId)
    if (dComp.dCompType === 'simpleTextComponent') return null
    const dElem = articleManager.getDataElemInDataComp(dComp, dataElemId)

    if (dComp && dElem) {
        return articleManager.getTElemInTCompsArr(tempComps, dComp.tCompId, dElem.tCompElemId)
    }

    return null
}

export function getInputsConfigExample(): AdjTextInputsType[] {
    return [
        {
            type: 'text',
            data: {
                label: 'Подпись 1',
                grayText: '(class)',
                name: 'name',
                value: 'value',
                onChange: () => {},
            }
        },
        {
            type: 'checkbox',
            data: {
                label: 'Подпись 2',
                grayText: '(class)',
                inputType: 'checkbox',
                groupName: 'Group name',
                inputsArr: [
                    {label: 'Значение 1', value: 'value 1', grayText: 'class'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: ['value 1'],
                onChange: () => {},
            }
        },
        {
            type: 'radio',
            data: {
                label: 'Подпись 3',
                grayText: '(class)',
                inputType: 'radio',
                groupName: 'Group name',
                inputsArr: [
                    {label: 'Значение 1', value: 'value 1'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: ['value 1'],
                onChange: () => {},
            }
        },
        {
            type: 'select',
            data: {
                label: 'Подпись 4',
                grayText: '(class)',
                name: 'Имя списка',
                options: [
                    {label: 'Значение 1', value: 'value 1'},
                    {label: 'Значение 2', value: 'value 2'},
                ],
                value: 'value 1',
                onChange: () => {},
            }
        }
    ]
}
