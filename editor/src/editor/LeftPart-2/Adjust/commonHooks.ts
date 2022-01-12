import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import TempCompTypes from 'store/article/codeType/tempCompCodeType'
import { AttrsAdjInputsType, TagAdjInputsType } from './AdjustInputs/AdjustInputs'
// import { getTagInputsConfig } from './AdjustTag/getTagInputsConfig'
// import { getAttrsInputsConfig } from './AdjustAttrs/getAttrsFormConfig'

/** Функция возвращает объект конфигурации для генерирования полей ввода изменения атрибутов выделенного элемента */
/*export default function useGetInputsConfig(configType: 'tag' | 'attrs') {
    const [config, setConfig] = useState<AttrsAdjInputsType[] | TagAdjInputsType[]>([])

    // Данные о выделенном элементе
    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    // Хук getFlashedElemDataAndTemplate() возвращает объект flashedElemInfo с данными о выделенном элементе
    // В useEffect стоит зависимость на отслеживание изменения flashedElemInfo.
    // Проблема в том, что это приводит к циклическому вызову useGetInputsConfig потому что
    // getFlashedElemDataAndTemplate() всегда возвращает новый объект, а useEffect() проверяет на это
    // Поэтому хук useIsOldAndNewElemsEqual() проверяет что данные по выделенному элементу действительно изменились.
    const isPrevAndNewElemsEqual = useIsPrevAndNewElemsEqual(flashedElemInfo.dElem, flashedElemInfo.tElem)

    useEffect(function () {
        const { dElem, tElem } = flashedElemInfo
        if (!dElem || !tElem || isPrevAndNewElemsEqual) return

        if (configType === 'tag') {
            setConfig(
                getTagInputsConfig(dElem, tElem)
            )
        }
        /!*else if (configType === 'attrs') {
            setConfig(
                getAttrsInputsConfig(dElem, tElem)
            )
        }*!/

    }, [flashedElemInfo])

    return config
}*/

/**
 * Хук проверяет, что ранее выделенный элемент равняется переданному
 * @param {ArticleTypes.ComponentElem} dElem
 * @param {TempCompTypes.Elem} tElem
 * @returns {boolean}
 */
/*function useIsPrevAndNewElemsEqual(dElem: ArticleTypes.ComponentElem, tElem: TempCompTypes.Elem): boolean {
    const [prevDElemId, setPrevDElemId] = useState<null | ArticleTypes.Id>(null)
    const [prevTElemId, setPrevTElemId] = useState<null | TempCompTypes.ElemId>(null)
    const [isPrevAndNewElemsEqual, setIsPrevAndNewElemsEqual] = useState(false)

    useEffect(function () {
        const newDElemId = dElem?.dCompElemId || null
        const newTElemId = tElem?.elemId || null

        setIsPrevAndNewElemsEqual(
            newDElemId === prevDElemId && newTElemId === prevTElemId
        )

        setPrevDElemId(newDElemId)
        setPrevTElemId(newTElemId)
    }, [dElem, tElem, prevDElemId, prevTElemId])

    return isPrevAndNewElemsEqual
}*/
