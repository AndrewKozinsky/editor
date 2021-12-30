import { useAppSelector } from '../rootReducer';
// Функция возвращает объект с выборщиками хранилища Store.user
export default function useGetUserSelectors() {
    return useAppSelector(store => store.user);
}
//# sourceMappingURL=userSelectors.js.map
//# sourceMappingURL=userSelectors.js.map