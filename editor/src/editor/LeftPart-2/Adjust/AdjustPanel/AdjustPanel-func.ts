import { useEffect, useState } from 'react'
import articleManager from 'articleManager/articleManager'

/** Функция возвращает название выделенного компонента и элемента (если выделено) */
export function useGetCompAndElemNames() {
    const [compName, setCompName] = useState('')
    const [elemName, setElemName] = useState('')

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        const { tComp, tElem } = flashedElemInfo

        if (!tComp) {
            setCompName('')
            setElemName('')
            return
        }

        // В качестве имени компонента поставить название корневого тега
        const rootTElem = articleManager.getRootTElem(tComp)
        setCompName(rootTElem.elemName)

        // Имя элемента нужно писать только если выделенный элемент не является корневым
        const elemName = rootTElem.elemId !== tElem.elemId
            ? tElem?.elemName
            : ''

        setElemName(elemName)
    }, [flashedElemInfo])

    return {
        compName,
        elemName
    }
}


/** Хук возвращает булево значение нужно ли отрисовывать формы изменения тега и атрибутов */
export function useGetContentTypeVisible() {
    // Какие формы отрисовывать:
    // none — ничего, tag — форму изменения тега, attrs — форму изменения атрибутов, both — обе
    const [contentTypeVisible, setContentTypeVisible] =
        useState<'none' | 'tag' | 'attrs' | 'both'>('none')

    const flashedElemInfo = articleManager.hooks.getFlashedElemDataAndTemplate()

    useEffect(function () {
        // Шаблон выделенного элемента
        const { tElem } = flashedElemInfo

        // Если элемент не выделен, то ничего не отрисовывать
        if (!tElem) {
            setContentTypeVisible('none')
            return
        }

        // Видима ли панель тега и панель атрибутов
        let isTagPanelVisible = false
        let isAttrsPanelVisible = false

        // Есть ли в шаблоне элемента данные о тегах и атрибутах.
        // Если да, то отрисовываются соответствующие формы
        if (tElem.elemTags) isTagPanelVisible = true
        if (tElem.elemAttrs?.length) isAttrsPanelVisible = true

        if (!isTagPanelVisible && !isAttrsPanelVisible) {
            setContentTypeVisible('none')
        }
        else if (isTagPanelVisible && !isAttrsPanelVisible) {
            setContentTypeVisible('tag')
        }
        else if (!isTagPanelVisible && isAttrsPanelVisible) {
            setContentTypeVisible('attrs')
        }
        else {
            setContentTypeVisible('both')
        }
    }, [flashedElemInfo])

    return contentTypeVisible
}
