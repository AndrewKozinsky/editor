import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import articleActions from 'store/article/articleActions'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleManager from '../../../../articleManager/articleManager'
import fireEvent from '../../../../event/fireEvent'

/* Хук запускает загрузка данных статьи и установку в Хранилище при изменении id редактируемой статьи */
export default function useSetArticleDataInStore() {
    const dispatch = useDispatch()
    const { articleId } = useGetArticleSelectors()

    useEffect(function () {
        // Если id не передан (или передан null), то очистить статью
        if (!articleId) {
            // Закрыть статью
            fireEvent({event: 'closeArticle'})
            return
        }

        // Загрузить статью и поставить в Хранилище
        dispatch( articleActions.requestArticle(articleId) )
    }, [articleId])
}
