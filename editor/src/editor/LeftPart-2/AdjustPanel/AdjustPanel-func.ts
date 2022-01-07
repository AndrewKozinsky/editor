import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'

/** Функция возвращает название выделенного компонента и элемента (если выделено) */
export function useGetCompAndElemNames() {
    const [compName, setCompName] = useState('')
    const [elemName, setElemName] = useState('')

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        const { tComp, tElem } = flashedElemInfo

        setCompName(tComp?.content?.name || '')
        setElemName(tElem?.elemName || '')
    }, [flashedElemInfo])

    return {
        compName,
        elemName
    }
}
