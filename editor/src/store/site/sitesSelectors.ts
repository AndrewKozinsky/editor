import { useAppSelector } from '../rootReducer'
import { SitesReducerType } from './sitesReducer'

// Функция возвращает объект с выборщиками хранилища Store.sites
export default function useGetSitesSelectors() {
    return useAppSelector<SitesReducerType>(store => store.sites)
}
