import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from 'src/store/rootReducer'
import actions from 'src/store/rootAction'
import useGetSitesSelectors from 'src/store/site/sitesSelectors'
import useGetArticleSelectors from 'src/store/article/articleSelectors'
import articleActions from 'src/store/article/articleActions'
import settingsActions from 'src/store/settings/settingsActions'


/** Хук возвращает булево значение редактируется ли сейчас статья показываемая в форме */
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

    return useCallback(function () {
        // Поставить id редактируемой статьи чтобы редактор начал загружать ресурсы и отрисовал статью.
        store.dispatch(articleActions.setArticleId(currentArtItemId as number))
        // Перейти на вкладку с редактором
        store.dispatch(settingsActions.setMainTab(1))
    }, [currentArtItemId])
}

/** Хук возвращает функцию нажатия на кнопку перехода в редактор */
export function useGetToEditorFn() {
    const dispatch = useDispatch()

    return useCallback(function () {
        store.dispatch(actions.settings.setMainTab(1))
    }, [dispatch])
}