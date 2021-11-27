import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'

export function useSetArticleDataInStore() {
    const dispatch = useDispatch()

    const { articleId, siteId, siteTemplateId } = useGetArticleSelectors()

    useEffect(function () {
        // Загрузить статью и поставить в Хранилище
        dispatch( articleActions.requestArticle(articleId) )
    }, [articleId])

    useEffect(function () {
        dispatch( articleActions.requestSiteComponents(siteId) )
        dispatch( articleActions.requestTempCompsFolders(siteId) )
    }, [siteId, siteTemplateId])

    useEffect(function () {
        dispatch( articleActions.requestSiteTemplate(siteTemplateId) )
    }, [siteTemplateId])
}
