import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'
import ArticleTypes from 'store/article/codeType/articleCodeType'
import { AdjInputsType } from './AdjustInputs/AdjustInputs'
import { getTagInputsConfig } from './AdjustTag/getTagInputsConfig'
import { getAttrsInputsConfig } from './AdjustAttrs/getAttrsFormConfig'

/** Функция возвращает объект конфигурации для генерирования полей ввода изменения атрибутов выделенного элемента */
export default function useGetInputsConfig(configType: 'tag' | 'attrs') {
    const [config, setConfig] = useState<AdjInputsType[]>([])

    // Данные о выделенном элементе
    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    // Хук getFlashedElemDataAndTemplate() возвращает объект flashedElemInfo с данными о выделенном элементе
    // В useEffect стоит зависимость на отслеживание изменения flashedElemInfo.
    // Проблема в том, что это приводит к циклическому вызову useGetInputsConfig потому что
    // getFlashedElemDataAndTemplate() всегда возвращает новый объект, а useEffect() проверяет на это
    // Поэтому хук isPrevAndNewElemsEqual() проверяет что данные по выделенному элементу действительно изменились.
    const isPrevAndNewElemsEqual = useIsPrevAndNewElemsEqual(flashedElemInfo.dElem)

    useEffect(function () {
        const { dComp, dElem, tElem } = flashedElemInfo
        if (!dElem || !tElem || isPrevAndNewElemsEqual) return

        if (configType === 'tag') {
            setConfig(
                getTagInputsConfig(dComp, dElem, tElem)
            )
        }
        else if (configType === 'attrs') {
            setConfig(
                getAttrsInputsConfig(dComp, dElem, tElem)
            )
        }

    }, [flashedElemInfo])

    return config
}

/**
 * Хук проверяет, что ранее выделенный элемент равняется переданному.
 * Если в элементе поменялось значение тега или атрибута, то такие элементы не считаются равными.
 * @param {Object} dElem — данные элемента
 */
function useIsPrevAndNewElemsEqual(dElem: ArticleTypes.ComponentElem): boolean {
    const [prevDElem, setPrevDElem] = useState<null | ArticleTypes.ComponentElem>(null)

    // Равны ли предыдущий и текущий выделенный элемент
    const [isEqual, setIsEqual] = useState(false)

    useEffect(function () {
        setPrevDElem(dElem)

        setIsEqual( prevDElem === dElem )
    }, [dElem, prevDElem])

    return isEqual
}
