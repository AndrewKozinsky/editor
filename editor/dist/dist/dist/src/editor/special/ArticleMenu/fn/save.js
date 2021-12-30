var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
import articleManager from 'articleManager/articleManager';
/** The hook returns boolean if Save article button is disabled */
export function useIsSaveBtnDisabled() {
    const { historyCurrentIdx, historyStepWhenWasSave } = useGetArticleSelectors();
    // Is button disabled
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(function () {
        if (!(history === null || history === void 0 ? void 0 : history.length))
            return;
        // Button is disabled when History step when article was saved is equal to current history step
        setIsDisabled(historyStepWhenWasSave === historyCurrentIdx);
    }, [historyCurrentIdx, historyStepWhenWasSave]);
    return isDisabled;
}
/** The hook returns on Save article button click handler */
export function useSaveArticle() {
    const { history, historyCurrentIdx, articleId } = useGetArticleSelectors();
    return useCallback(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield articleManager.saveArticle(history, historyCurrentIdx, articleId);
        });
    }, [history, historyCurrentIdx, articleId]);
}
//# sourceMappingURL=save.js.map
//# sourceMappingURL=save.js.map
//# sourceMappingURL=save.js.map