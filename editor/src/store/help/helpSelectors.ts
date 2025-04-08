import { useAppSelector } from '../rootReducer'
import { HelpReducerType } from './helpReducer'

// Функция возвращает объект с выборщиками хранилища Store.settings
export default function useGetHelpSelectors() {
    return useAppSelector<HelpReducerType>(store => store.help)
}
