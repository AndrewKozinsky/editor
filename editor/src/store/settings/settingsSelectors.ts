import { useAppSelector } from '../rootReducer'
import { SettingsReducerType } from './settingsReducer'

// Функция возвращает объект с выборщиками хранилища Store.settings
export default function useGetSettingsSelectors() {
    return useAppSelector<SettingsReducerType>(store => store.settings)
}
