import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
import articleManager from 'articleManager/articleManager';
// TODO Что делает эта функция?
export function useIsMarkupBtnDisabled() {
    const { articleId } = useGetArticleSelectors();
    const historyItem = articleManager.hooks.getCurrentHistoryItem();
    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(function () {
        var _a;
        if (!historyItem)
            return;
        const isArticleExists = articleId && ((_a = historyItem.article) === null || _a === void 0 ? void 0 : _a.dComps.length);
        setIsDisabled(!isArticleExists);
    }, [articleId, historyItem]);
    return isDisabled;
}
//# sourceMappingURL=markup.js.map