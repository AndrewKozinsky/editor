import { useAppSelector } from '../rootReducer'
import { ModalReducerType } from './modalReducer'

// Функция возвращает объект с выборщиками хранилища Store.modal
export default function useGetModalSelectors() {
    return useAppSelector<ModalReducerType>(store => store.modal)
}
