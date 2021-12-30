import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import useGetArticleSelectors from 'store/article/articleSelectors';
import articleManager from 'articleManager/articleManager';
/** Hook sets article JSX to IFrame */
export default function useSetArticleToIFrame() {
    const { $links, history, historyCurrentIdx, tempComps, tempCompsDownloadHash } = useGetArticleSelectors();
    const [lastDownloadHashVal, setLastDownloadHashVal] = useState(0);
    useEffect(function () {
        var _a;
        if (!((_a = $links.$body) === null || _a === void 0 ? void 0 : _a.firstChild))
            return;
        if (tempCompsDownloadHash && (history === null || history === void 0 ? void 0 : history.length)) {
            const article = history[historyCurrentIdx].article;
            if (lastDownloadHashVal !== tempCompsDownloadHash) {
                setLastDownloadHashVal(tempCompsDownloadHash);
                articleManager.correctArticle(article, article.dComps, tempComps);
            }
            // Создать JSX новой статьи и поставить в iFrame.
            ReactDOM.render(articleManager.turnArticleDataToJSX(article, tempComps), $links.$body.firstChild);
        }
        else {
            // Создать JSX новой статьи и поставить в iFrame.
            ReactDOM.render(null, $links.$body.firstChild);
        }
    }, [
        tempCompsDownloadHash,
        $links,
        history,
        historyCurrentIdx,
        tempComps,
    ]);
}
//# sourceMappingURL=useSetArticleToIFrame.js.map