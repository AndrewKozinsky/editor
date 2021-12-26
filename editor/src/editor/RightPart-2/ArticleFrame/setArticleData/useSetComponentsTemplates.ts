/** Хук контролирует загрузку и установку шаблонов компонентов и папок */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'

export function useSetComponentsTemplates() {
    const dispatch = useDispatch()
    const { siteId } = useGetArticleSelectors()

    useEffect(function () {
        if (!siteId) return

        dispatch( articleActions.requestTempCompsFolders(siteId) )
        // dispatch( articleActions.requestSiteComponents(siteId) )
    }, [siteId])
}
