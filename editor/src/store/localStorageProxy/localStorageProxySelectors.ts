import { useAppSelector } from '../rootReducer'
import {LocalStorageProxyType} from './LocalStorageProxyType'

// Функция возвращает объект с выборщиками хранилища Store.settings
export default function useGetLocalStorageProxySelectors() {
    return useAppSelector<LocalStorageProxyType>(store => store.localStorageProxy)
}
