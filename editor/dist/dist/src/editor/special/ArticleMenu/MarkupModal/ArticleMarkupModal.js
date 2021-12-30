import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useGetMessages from 'messages/fn/useGetMessages';
import { articleMenuMessages } from 'messages/articleMenuMessages';
import ModalShortContent from 'common/modalEntities/ModalShortContent/ModalShortContent';
import useGetArticleSelectors from 'store/article/articleSelectors';
import articleManager from 'articleManager/articleManager';
/** Компонент окна с разметкой статьи */
export function ArticleMarkupModal() {
    const dispatch = useDispatch();
    const { tempComps } = useGetArticleSelectors();
    const historyItem = articleManager.hooks.getCurrentHistoryItem();
    const articleMenuMsg = useGetMessages(articleMenuMessages);
    const [markupStr, setMarkupStr] = useState('');
    useEffect(function () {
        if (!tempComps || !historyItem)
            return;
        const markupStr = articleManager.turnArticleDataToHTML(historyItem.article, tempComps);
        setMarkupStr(markupStr);
    }, [tempComps, historyItem]);
    return (React.createElement(ModalShortContent, { header: articleMenuMsg.markupModalHeader, text: markupStr }));
}
//# sourceMappingURL=ArticleMarkupModal.js.map
//# sourceMappingURL=ArticleMarkupModal.js.map