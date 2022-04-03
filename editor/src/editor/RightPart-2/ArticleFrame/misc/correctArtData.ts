import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import articleManager from 'articleManager/articleManager'

/**
 * Хук отлеживает изменение свойства isArtDataCorrect у данных статьи.
 * Если оно в false, то запускает функцию исправляющую статью.
 */
export function useCorrectArticleData() {
    const { isArtDataCorrect, tempComps } = useGetArticleSelectors()
    const article = articleManager.hooks.getCurrentArticle()
    const dispatch = useDispatch()

    useEffect(function () {
        if (isArtDataCorrect || !article || !tempComps) return

        // Запуск сценария исправления статьи
        articleManager.correctArticle(article, article.dComps, tempComps)

        dispatch(articleActions.setIsArtDataCorrect(true))
    }, [isArtDataCorrect, tempComps, article])
}