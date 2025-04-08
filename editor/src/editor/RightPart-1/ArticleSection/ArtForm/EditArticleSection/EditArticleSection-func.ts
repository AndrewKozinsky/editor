import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { store } from 'store/rootReducer'
import actions from 'store/rootAction'
import useGetSitesSelectors from 'store/site/sitesSelectors'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import settingsActions from 'store/settings/settingsActions'
import articleManager from 'articleManager/articleManager'
import fireEvent from '../../../../../event/fireEvent'


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
    const currentArticleId = useGetArticleSelectors().articleId

    return useCallback(function () {
        // Если другая статья редактируется, то закрыть её
        if (currentArticleId) {
            // Закрыть статью
            fireEvent({event: 'closeArticle'})
        }

        // Поставить id редактируемой статьи чтобы редактор начал загружать ресурсы и отрисовал статью.
        store.dispatch(articleActions.setArticleIdOuter(currentArtItemId as number))
        // Перейти на вкладку с редактором
        store.dispatch(settingsActions.setMainTabOuter(1))
    }, [currentArtItemId])
}

/** Хук возвращает функцию нажатия на кнопку перехода в редактор */
export function useGetToEditorFn() {
    const dispatch = useDispatch()

    return useCallback(function () {
        store.dispatch(actions.settings.setMainTab(1))
    }, [dispatch])
}
