import { useAppSelector } from '../rootReducer'
import { UserReducerType } from './userReducer'

// Функция возвращает объект с выборщиками хранилища Store.user
export default function useGetUserSelectors() {
    return useAppSelector<UserReducerType>(store => store.user)
}
