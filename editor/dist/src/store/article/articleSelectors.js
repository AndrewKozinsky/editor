import { useAppSelector } from '../rootReducer';
// Функция возвращает объект с выборщиками хранилища Store.article
export default function useGetArticleSelectors() {
    return useAppSelector(store => store.article);
}
//# sourceMappingURL=articleSelectors.js.map