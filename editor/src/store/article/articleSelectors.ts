import { useAppSelector } from '../rootReducer'
import {ArticleReducerType} from './articleReducer'

// Функция возвращает объект с выборщиками хранилища Store.sites
export default function useGetArticleSelectors() {
    return useAppSelector<ArticleReducerType>(store => store.article)
}