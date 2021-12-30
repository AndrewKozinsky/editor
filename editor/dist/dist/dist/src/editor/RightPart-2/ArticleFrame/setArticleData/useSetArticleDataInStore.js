import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import articleActions from 'store/article/articleActions';
import useGetArticleSelectors from 'store/article/articleSelectors';
/* Хук ставит данные статьи в Хранилище при изменении id редактируемой статьи */
export default function useSetArticleDataInStore() {
    const dispatch = useDispatch();
    const { articleId } = useGetArticleSelectors();
    useEffect(function () {
        if (!articleId)
            return;
        // Загрузить статью и поставить в Хранилище
        dispatch(articleActions.requestArticle(articleId));
    }, [articleId]);
}
//# sourceMappingURL=useSetArticleDataInStore.js.map
//# sourceMappingURL=useSetArticleDataInStore.js.map
//# sourceMappingURL=useSetArticleDataInStore.js.map