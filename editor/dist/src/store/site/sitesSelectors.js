import { useAppSelector } from '../rootReducer';
// Функция возвращает объект с выборщиками хранилища Store.sites
export default function useGetSitesSelectors() {
    return useAppSelector(store => store.sites);
}
//# sourceMappingURL=sitesSelectors.js.map