import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'

/** Хук контролирует загрузку и установку шаблонов компонентов и папок */
export function useSetComponentsTemplates() {
    const dispatch = useDispatch()
    const { siteId, tempCompsFoldersVersionHash, tempCompsVersionHash } = useGetArticleSelectors()

    useEffect(function () {
        if (!siteId) return

        dispatch( articleActions.changeTempCompsFoldersVersionHash() )
        dispatch( articleActions.changeTempCompsVersionHash() )
    }, [siteId])

    // При изменении хешей папок и шаблонов компонентов скачать из заново
    // После скачивания изменится значение siteTemplateDownloadHash
    useEffect(function () {
        if (!tempCompsFoldersVersionHash) return
        dispatch( articleActions.requestTempCompsFolders(siteId) )
    }, [tempCompsFoldersVersionHash])

    useEffect(function () {
        if (!tempCompsVersionHash) return
        dispatch( articleActions.requestSiteComponents(siteId) )
    }, [tempCompsVersionHash])
}
