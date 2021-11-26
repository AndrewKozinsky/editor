import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import useGetArticleSelectors from 'store/article/articleSelectors'



/** Хук возращает булево значение редактируется ли сейчас статья показываемая в форме */
export function useIsArticleInEditor() {
    const [isArticleInEditor, setArticleInEditor] = useState(false)

    const { articleId } = useGetArticleSelectors()
    const { currentArtItemId } = useGetSitesSelectors().articleSection

    useEffect(function () {
        setArticleInEditor(
            articleId === currentArtItemId
        )
    }, [articleId, currentArtItemId])

    return isArticleInEditor
}

/** Hook returns edit Article button onClick handler */
export function useGetEditArticleFn() {
    const { currentArtItemId } = useGetSitesSelectors().articleSection
    // Похоже это не нужно!!! После удали!!!
    const { currentSiteId } = useGetSitesSelectors()
    // Похоже это не нужно!!! После удали!!!
    const { currentTemplateId } = useGetSitesSelectors().siteTemplatesSection

    return useCallback(function () {
        store.dispatch(actions.article.setArticleId(currentArtItemId))
    }, [currentSiteId, currentTemplateId, currentArtItemId])
}

export function useGetToEditorFn() {
    const dispatch = useDispatch()

    return useCallback(function () {
        store.dispatch(actions.settings.setMainTab(2))
    }, [dispatch])
}