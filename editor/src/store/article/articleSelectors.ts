import { useAppSelector } from '../rootReducer'
import { ArticleReducerType } from './articleReducer'

// Функция возвращает объект с выборщиками хранилища Store.article
export default function useGetArticleSelectors() {
    return useAppSelector<ArticleReducerType>(store => store.article)
}
