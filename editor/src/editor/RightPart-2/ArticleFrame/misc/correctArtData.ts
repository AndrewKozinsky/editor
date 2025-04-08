import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleActions from 'store/article/articleActions'
import articleManager from 'articleManager/articleManager'

/**
 * Хук отлеживает изменение свойства isArtDataCorrect у данных статьи.
 * Если оно в false, то запускает функцию исправляющую статью и заменяющую исправленную версию вместо текущей.
 */
export function useCorrectArticleData() {
    const { isArtDataCorrect, tempComps } = useGetArticleSelectors()
    const article = articleManager.hooks.getCurrentArticle()
    const dispatch = useDispatch()

    useEffect(function () {
        if (isArtDataCorrect || !article || !tempComps) return

        // Получить новую версию статью с исправленными данными и заменить текущий объект истории
        const dataToUpdateHistoryStep = articleManager.getCorrectedArticle(article, tempComps)
        dispatch( articleActions.updateCurrentHistoryItem(dataToUpdateHistoryStep, true) )

        // Поставить, что данные статьи исправлены и можно их использовать
        dispatch(articleActions.setIsArtDataCorrect(true))
    }, [isArtDataCorrect, tempComps, article])
}