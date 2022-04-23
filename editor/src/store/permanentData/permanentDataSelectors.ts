import { useAppSelector } from '../rootReducer'
import {PermanentSettingsType} from './PermanentSettingsType'

// Функция возвращает объект с выборщиками хранилища Store.settings
export default function useGetPermanentDataSelectors() {
    return useAppSelector<PermanentSettingsType>(store => store.permanentData)
}
