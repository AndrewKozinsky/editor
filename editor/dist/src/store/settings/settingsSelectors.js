import { useAppSelector } from '../rootReducer';
// Функция возвращает объект с выборщиками хранилища Store.settings
export default function useGetSettingsSelectors() {
    return useAppSelector(store => store.settings);
}
//# sourceMappingURL=settingsSelectors.js.map